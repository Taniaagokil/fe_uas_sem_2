import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoLocationSharp, IoCalendarClear } from 'react-icons/io5';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaCheck, FaTimes, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import useFetch from '../hooks/useFetch';
import axiosClient from '../api/axiosClient';
import { useToast } from '../contexts/ToastContext';
import './RiwayatClaimPage.css';

const RiwayatClaimPage = () => {
  const navigate = useNavigate();
  const { showToast, showConfirm } = useToast();
  const [activeTab, setActiveTab] = useState('klaim');
  const [cancellingId, setCancellingId] = useState(null);

  const { data: claimHistory, loading: claimLoading, error: claimError } = useFetch('/user/klaim');
  const { data: laporanHistory, loading: laporanLoading, error: laporanError, reFetch: refetchLaporan } = useFetch('/user/laporan');

  // ── Status Helpers ──────────────────────────────────────────────
  const getClaimStatusConfig = (status) => {
    switch (status) {
      case 'menunggu':
        return { label: 'Menunggu Verifikasi', color: '#E2B053', icon: <AiOutlineLoading3Quarters className="animate-spin" style={{ fontSize: '12px' }} /> };
      case 'disetujui':
        return { label: 'Klaim Diterima', color: '#5CB85C', icon: <FaCheck style={{ fontSize: '12px' }} /> };
      case 'ditolak':
        return { label: 'Klaim Ditolak', color: '#D9534F', icon: <FaTimes style={{ fontSize: '12px' }} /> };
      default:
        return { label: status, color: '#777', icon: null };
    }
  };

  const getLaporanStatusConfig = (status) => {
    switch (status) {
      case 'menunggu':
        return { label: 'Sedang Dicari', color: '#E2B053', dot: 'bg-amber-400' };
      case 'ditemukan':
        return { label: 'Sudah Ditemukan', color: '#5CB85C', dot: 'bg-green-500' };
      case 'diklaim':
        return { label: 'Sedang Diklaim', color: '#3B82F6', dot: 'bg-blue-500' };
      case 'selesai':
        return { label: 'Selesai / Dikembalikan', color: '#5CB85C', dot: 'bg-green-500' };
      case 'dibatalkan':
        return { label: 'Dibatalkan', color: '#9CA3AF', dot: 'bg-slate-400' };
      case 'diarsipkan':
        return { label: 'Diarsipkan', color: '#9CA3AF', dot: 'bg-slate-400' };
      default:
        return { label: status || 'Tidak Diketahui', color: '#777', dot: 'bg-slate-300' };
    }
  };

  // ── Batalkan Handler ─────────────────────────────────────────────
  const handleBatalkan = (laporanId, namaBarang) => {
    showConfirm({
      title: 'Batalkan Laporan?',
      message: `Apakah kamu yakin ingin membatalkan laporan untuk "${namaBarang}"? Ini berarti barang sudah ketemu atau tidak perlu dicari lagi.`,
      onConfirm: async () => {
        setCancellingId(laporanId);
        try {
          await axiosClient.put(`/laporan-kehilangan/${laporanId}/batalkan`);
          showToast('Laporan berhasil dibatalkan! Senang barangmu sudah ketemu 🎉', 'success');
          refetchLaporan();
        } catch (err) {
          const msg = err.response?.data?.message || 'Gagal membatalkan laporan.';
          showToast(msg, 'error');
        } finally {
          setCancellingId(null);
        }
      }
    });
  };

  // ── Animation Variants ───────────────────────────────────────────
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen font-['Montserrat'] text-[#273A5A] pb-24 pt-8 bg-slate-50/50">
      <div className="max-w-[900px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#273A5A] transition-colors border-none bg-transparent cursor-pointer"
          >
            ← Kembali ke Beranda
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#273A5A]">
            Riwayat <span className="text-[#EBB134] text-glow">Saya</span>
          </h1>
          <p className="text-slate-400 font-semibold text-xs sm:text-sm mt-2">
            Pantau status klaim dan laporan kehilanganmu di sini.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex bg-white rounded-2xl p-1.5 shadow-sm border border-slate-100 mb-8 w-fit gap-1">
          <button
            onClick={() => setActiveTab('klaim')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border-none cursor-pointer ${
              activeTab === 'klaim'
                ? 'bg-[#273A5A] text-white shadow-md'
                : 'text-slate-500 hover:text-[#273A5A] bg-transparent'
            }`}
          >
            🏷️ Klaim Barang
          </button>
          <button
            onClick={() => setActiveTab('laporan')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border-none cursor-pointer ${
              activeTab === 'laporan'
                ? 'bg-[#273A5A] text-white shadow-md'
                : 'text-slate-500 hover:text-[#273A5A] bg-transparent'
            }`}
          >
            📋 Laporan Hilang
          </button>
        </div>

        {/* ── TAB: KLAIM ────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {activeTab === 'klaim' && (
            <motion.div
              key="klaim"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {claimLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="w-12 h-12 border-4 border-[#EBB134] border-t-transparent rounded-full animate-spin mb-2"></div>
                  <p className="font-bold opacity-75 text-sm">Memuat riwayat klaim...</p>
                </div>
              ) : claimError ? (
                <div className="bg-red-50 text-red-500 p-6 rounded-2xl border border-red-100 text-center font-bold text-sm">{claimError}</div>
              ) : claimHistory && claimHistory.length > 0 ? (
                claimHistory.map((item) => {
                  const config = getClaimStatusConfig(item.status);
                  return (
                    <motion.div
                      key={item.klaim_id}
                      variants={itemVariants}
                      className="bg-white rounded-[32px] shadow-xl shadow-[#273A5A]/5 border border-slate-100 overflow-hidden flex flex-col md:flex-row relative group hover:shadow-2xl hover:shadow-[#273A5A]/8 transition-all duration-300"
                    >
                      {/* Badge Status – Mobile Top */}
                      <div className="md:hidden px-4 py-2.5 text-[10px] font-bold text-white uppercase tracking-wider flex items-center justify-center gap-2" style={{ backgroundColor: config.color }}>
                        {config.icon}{config.label}
                      </div>

                      {/* Foto */}
                      <div className="md:w-1/3 h-[200px] md:h-auto overflow-hidden bg-slate-100 relative shrink-0">
                        <img
                          src={item.temuan?.barang?.foto_barang
                            ? `http://localhost:8000/storage/barang/${item.temuan.barang.foto_barang}`
                            : `https://via.placeholder.com/300x200?text=${item.temuan?.barang?.nama_barang}`}
                          alt={item.temuan?.barang?.nama_barang}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      {/* Info */}
                      <div className="md:w-2/3 p-6 sm:p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-3">
                            <span className="bg-slate-100 text-[#273A5A] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-slate-200/50">
                              {item.temuan?.barang?.kategori?.nama_kategori || 'Kategori Umum'}
                            </span>
                            {/* Badge Status – Desktop */}
                            <div className="hidden md:flex px-4 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider items-center gap-2" style={{ backgroundColor: config.color }}>
                              {config.icon}{config.label}
                            </div>
                          </div>

                          <h3 className="text-xl sm:text-2xl font-extrabold text-[#273A5A] mb-4 group-hover:text-[#EBB134] transition-colors leading-tight">
                            {item.temuan?.barang?.nama_barang}
                          </h3>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-600">
                              <HiOutlineOfficeBuilding className="text-[#EBB134] shrink-0" size={18} />
                              <span>{item.temuan?.gedung?.nama_gedung || 'Vokasi Veteran'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-600">
                              <IoLocationSharp className="text-[#EBB134] shrink-0" size={18} />
                              <span>{item.temuan?.lokasi_ditemukan || item.temuan?.lokasi_detail || 'Detail tidak tersedia'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-600 col-span-1 sm:col-span-2">
                              <IoCalendarClear className="text-[#EBB134] shrink-0" size={18} />
                              <span>Diajukan: {item.tanggal_klaim}</span>
                            </div>
                          </div>
                        </div>

                        {item.status === 'disetujui' && (
                          <button
                            onClick={() => navigate(`/pengambilan/${item.klaim_id}`)}
                            className="w-full bg-[#EBB134] hover:bg-[#d19a28] text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-[#EBB134]/15 hover:shadow-xl hover:shadow-[#EBB134]/25 transition-all duration-300 text-xs cursor-pointer border-none"
                          >
                            Lanjut ke Pengambilan
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <EmptyState emoji="🏷️" title="Belum ada riwayat klaim" desc="Semua riwayat klaim barang temuanmu akan muncul di sini." />
              )}
            </motion.div>
          )}

          {/* ── TAB: LAPORAN HILANG ────────────────────────────── */}
          {activeTab === 'laporan' && (
            <motion.div
              key="laporan"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {laporanLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="w-12 h-12 border-4 border-[#273A5A] border-t-transparent rounded-full animate-spin mb-2"></div>
                  <p className="font-bold opacity-75 text-sm">Memuat laporan kehilangan...</p>
                </div>
              ) : laporanError ? (
                <div className="bg-red-50 text-red-500 p-6 rounded-2xl border border-red-100 text-center font-bold text-sm">{laporanError}</div>
              ) : laporanHistory && laporanHistory.length > 0 ? (
                laporanHistory.map((item) => {
                  const config = getLaporanStatusConfig(item.status_laporan);
                  const isCancellable = item.status_laporan === 'menunggu';
                  const isCancelling = cancellingId === item.laporan_id;

                  return (
                    <motion.div
                      key={item.laporan_id}
                      variants={itemVariants}
                      className="bg-white rounded-[32px] shadow-xl shadow-[#273A5A]/5 border border-slate-100 overflow-hidden flex flex-col md:flex-row relative group hover:shadow-2xl transition-all duration-300"
                    >
                      {/* Foto */}
                      <div className="md:w-1/3 h-[200px] md:h-auto overflow-hidden bg-slate-100 relative shrink-0">
                        <img
                          src={item.barang?.foto_barang
                            ? `http://localhost:8000/storage/barang/${item.barang.foto_barang}`
                            : `https://via.placeholder.com/300x200?text=${item.barang?.nama_barang || 'Barang'}`}
                          alt={item.barang?.nama_barang}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Status Badge on image */}
                        <div
                          className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-[10px] font-bold text-white flex items-center gap-1.5 shadow-md"
                          style={{ backgroundColor: config.color }}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${config.dot} bg-white/70`}></span>
                          {config.label}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="md:w-2/3 p-6 sm:p-8 flex flex-col justify-between">
                        <div>
                          <span className="bg-slate-100 text-[#273A5A] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-slate-200/50 inline-block mb-3">
                            {item.barang?.kategori?.nama_kategori || 'Kategori Umum'}
                          </span>

                          <h3 className="text-xl sm:text-2xl font-extrabold text-[#273A5A] mb-4 group-hover:text-[#EBB134] transition-colors leading-tight">
                            {item.barang?.nama_barang}
                          </h3>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-600">
                              <HiOutlineOfficeBuilding className="text-[#273A5A] shrink-0" size={18} />
                              <span>{item.gedung?.nama_gedung || 'Lokasi tidak diketahui'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-600">
                              <IoLocationSharp className="text-[#273A5A] shrink-0" size={18} />
                              <span>{item.lokasi_detail || 'Detail tidak tersedia'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-600 col-span-1 sm:col-span-2">
                              <IoCalendarClear className="text-[#273A5A] shrink-0" size={18} />
                              <span>Hilang: {item.tanggal_hilang} · Dilaporkan: {item.tanggal_lapor}</span>
                            </div>
                          </div>
                        </div>

                        {/* Batalkan Button — only for active/pending reports */}
                        {isCancellable && (
                          <button
                            onClick={() => handleBatalkan(item.laporan_id, item.barang?.nama_barang)}
                            disabled={isCancelling}
                            className="w-full flex items-center justify-center gap-2 bg-white text-[#D9534F] border-2 border-dashed border-[#D9534F]/30 hover:border-[#D9534F] hover:bg-red-50/30 font-extrabold py-3.5 px-6 rounded-2xl transition-all duration-200 text-xs cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {isCancelling ? (
                              <AiOutlineLoading3Quarters className="animate-spin" size={14} />
                            ) : (
                              <FaSearch size={12} />
                            )}
                            {isCancelling ? 'Memproses...' : 'Ketemu Sendiri / Batalkan'}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <EmptyState emoji="📋" title="Belum ada laporan kehilangan" desc="Laporan barang hilang yang kamu buat akan muncul di sini." />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ── Shared Empty State Component ─────────────────────────────────
function EmptyState({ emoji, title, desc }) {
  return (
    <div className="text-center py-16 bg-white rounded-[32px] border border-dashed border-slate-200 shadow-xl shadow-[#273A5A]/3 max-w-md mx-auto px-6">
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="text-lg font-bold text-[#273A5A] mb-1">{title}</h3>
      <p className="text-slate-400 text-xs font-semibold">{desc}</p>
    </div>
  );
}

export default RiwayatClaimPage;