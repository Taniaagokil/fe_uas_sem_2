import React, { useState } from 'react';
import ReusableTable from '../../components/staff/Table';
import Footerstaff from '../../components/staff/Footerstaff';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Check, X, User, MapPin, FileText, Calendar, Image as ImageIcon } from 'lucide-react';
import { FiEye, FiX } from 'react-icons/fi';
import useFetch from '../../hooks/useFetch';
import axiosClient from '../../api/axiosClient';
import { useToast } from '../../contexts/ToastContext';

const LaporanKlaimBarangPage = () => {
  const { data: dataKlaim, loading, error, reFetch } = useFetch('/admin/klaim');
  const { showToast, showConfirm } = useToast();
  const [selectedKlaim, setSelectedKlaim] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredKlaim = Array.isArray(dataKlaim)
    ? dataKlaim.filter(k =>
        k.user?.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        k.temuan?.barang?.nama_barang?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const openDetail = (klaim) => {
    setSelectedKlaim(klaim);
    setIsModalOpen(true);
  };

  const handleVerify = (id, status) => {
    showConfirm({
      title: 'Verifikasi Klaim',
      message: `Apakah Anda yakin ingin ${status === 'disetujui' ? 'menyetujui' : 'menolak'} klaim ini?`,
      onConfirm: async () => {
        try {
          await axiosClient.put(`/admin/klaim/${id}/verify`, { status });
          showToast('Status klaim berhasil diperbarui', 'success');
          reFetch();
        } catch (err) {
          showToast(err.response?.data?.message || 'Gagal memperbarui status', 'error');
        }
      }
    });
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'menunggu': return 'Menunggu Verifikasi';
      case 'ditolak': return 'Ditolak';
      case 'disetujui': return 'Disetujui';
      default: return status;
    }
  };

  const columns = [
    { 
      header: 'ID', 
      width: '8%',
      render: (row) => <span className="text-[#273A5A] font-bold text-sm md:text-base">{row.klaim_id}</span>
    },
    { 
      header: 'Informasi User', 
      align: 'left',
      width: '25%',
      render: (row) => (
        <div className="flex flex-col items-start">
          <p className="font-bold text-[#273A5A] text-sm md:text-base">{row.user?.nama || '-'}</p>
          <p className="text-xs text-slate-400 font-semibold">{row.user?.email || '-'}</p>
        </div>
      )
    },
    { 
      header: 'Barang Yang Diklaim', 
      align: 'left',
      width: '24%',
      render: (row) => (
        <div className="flex flex-col items-start">
          <p className="font-bold text-[#273A5A] text-sm md:text-base">{row.temuan?.barang?.nama_barang || '-'}</p>
          <p className="text-xs text-[#E2B053] font-extrabold tracking-wider mt-0.5">KODE: {row.temuan?.barang?.kode_barang || '-'}</p>
        </div>
      )
    },
    { 
      header: 'Tanggal Klaim', 
      width: '15%',
      render: (row) => (
        <p className="text-sm md:text-base text-slate-400 font-semibold">{row.tanggal_klaim}</p>
      )
    },
    { 
      header: 'Status Verifikasi', 
      align: 'center',
      width: '18%',
      render: (row) => {
        const getStatusStyles = (status) => {
          switch (status) {
            case 'menunggu': return 'bg-amber-500 text-white';
            case 'disetujui': return 'bg-emerald-500 text-white';
            case 'ditolak': return 'bg-rose-500 text-white';
            default: return 'bg-blue-500 text-white';
          }
        };

        return (
          <div className="px-2 flex justify-center">
            <span className={`px-4 py-2 text-xs font-bold rounded-full min-w-[170px] inline-flex items-center justify-center uppercase tracking-wider shadow-sm ${getStatusStyles(row.status)}`}>
              {getStatusLabel(row.status)}
            </span>
          </div>
        )
      }
    },
    {
      header: 'Tindakan',
      align: 'center',
      width: '10%',
      render: (row) => (
        <div className="flex items-center justify-center w-max mx-auto whitespace-nowrap">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => openDetail(row)}
            className="px-4 py-2 bg-[#263959] text-white rounded-xl hover:opacity-85 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer font-bold text-xs md:text-sm"
            title="Lihat Detail Bukti"
          >
            <FiEye size={15} />
            <span>Detail</span>
          </motion.button>
        </div>
      ),
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-grow min-h-screen font-['Montserrat'] bg-slate-50/30 flex flex-col"
    >
      <div className="p-6 md:p-10 flex-1 flex flex-col w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 w-full">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#273A5A] tracking-tight">
              Laporan Klaim <span className="text-[#E2B053]">Barang</span>
            </h1>
            <p className="text-slate-400 text-xs md:text-sm font-medium">Verifikasi dan kelola pengajuan klaim barang temuan dari mahasiswa</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-6 gap-4 w-full">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="relative flex-1 max-w-full sm:max-w-md group"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#E2B053] transition-colors" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-3 bg-white border border-slate-200/60 rounded-2xl focus:ring-2 focus:ring-[#E2B053] focus:border-transparent outline-none text-sm text-[#273A5A] font-semibold transition-all"
              placeholder="Cari..."
            />
          </motion.div>
        </div>

        <div className="w-full md:overflow-visible">
          <ReusableTable columns={columns} data={filteredKlaim} />
        </div>
      </div>

      <Footerstaff />

      {/* Popup Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedKlaim && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-4xl rounded-3xl md:rounded-[32px] overflow-hidden shadow-xl border border-slate-100 relative z-10 flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
            >
              {/* Image Section */}
              <div className="md:w-1/2 h-80 md:h-auto bg-slate-50 relative min-h-[300px]">
                {selectedKlaim.bukti_foto ? (
                  <img 
                    src={`http://localhost:8000/storage/bukti_klaim/${selectedKlaim.bukti_foto}`} 
                    alt="Bukti Kepemilikan"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2 bg-slate-50">
                    <ImageIcon size={48} />
                    <span className="font-bold">TIDAK ADA FOTO BUKTI</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-[#273A5A]/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-sm">
                  BUKTI KEPEMILIKAN
                </div>
              </div>

              {/* Info Section */}
              <div className="md:w-1/2 p-8 relative flex flex-col justify-between">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <FiX size={24} />
                </button>

                <div className="space-y-4 md:space-y-5">
                  <div>
                    <h2 className="text-xl md:text-2xl font-extrabold text-[#273A5A] tracking-tight pr-6">Detail Pengajuan Klaim</h2>
                    <span className="text-xs font-semibold text-slate-400 block mt-1">ID Klaim: {selectedKlaim.klaim_id}</span>
                  </div>

                  <div className="space-y-4.5 border-t border-slate-100 pt-4">
                    <div className="bg-slate-50/50 border border-slate-200/50 p-4.5 rounded-2xl space-y-3.5">
                      <div className="flex items-center gap-2.5 text-[#273A5A]">
                        <User size={18} className="text-[#E2B053]" />
                        <h3 className="font-extrabold text-sm text-[#273A5A] uppercase tracking-wider">Informasi Pemohon</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nama Lengkap</label>
                          <p className="text-sm md:text-base font-bold text-[#273A5A] mt-0.5">{selectedKlaim.user?.nama || '-'}</p>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">NIM / Email</label>
                          <p className="text-sm md:text-base font-bold text-[#273A5A] truncate mt-0.5">{selectedKlaim.user?.nim || selectedKlaim.user?.email || '-'}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50/50 border border-slate-200/50 p-4.5 rounded-2xl space-y-3.5">
                      <div className="flex items-center gap-2.5 text-[#273A5A]">
                        <ImageIcon size={18} className="text-[#E2B053]" />
                        <h3 className="font-extrabold text-sm text-[#273A5A] uppercase tracking-wider">Barang yang Diklaim</h3>
                      </div>
                      <div>
                        <p className="text-sm md:text-base font-bold text-[#273A5A]">{selectedKlaim.temuan?.barang?.nama_barang}</p>
                        <p className="text-xs text-[#E2B053] font-extrabold tracking-wider mt-1 block">KODE: {selectedKlaim.temuan?.barang?.kode_barang}</p>
                        <p className="text-xs md:text-sm text-slate-650 font-semibold mt-2.5 leading-relaxed bg-white border border-slate-100 p-3 rounded-xl">{selectedKlaim.temuan?.barang?.deskripsi}</p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5 text-[#273A5A]">
                          <MapPin size={16} className="text-[#E2B053]" />
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tempat Kehilangan</label>
                        </div>
                        <p className="text-[#273A5A] text-sm bg-slate-50/30 border border-slate-100 p-3.5 rounded-xl font-bold leading-relaxed">
                          {selectedKlaim.tempat_kehilangan || 'Tidak diisi.'}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1.5 text-[#273A5A]">
                          <FileText size={16} className="text-[#E2B053]" />
                          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Verifikasi Kepemilikan (Bukti)</label>
                        </div>
                        <p className="text-[#273A5A] text-sm bg-slate-50/50 border border-slate-200/50 p-4 rounded-xl font-bold leading-relaxed shadow-sm">
                          "{selectedKlaim.verifikasi_kepemilikan || 'Tidak ada deskripsi bukti.'}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-col gap-2.5 mt-6">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-[#273A5A] font-extrabold py-3.5 rounded-2xl transition-all text-xs md:text-sm cursor-pointer active:scale-[0.98] font-['Montserrat']"
                  >
                    Tutup
                  </button>
                  {selectedKlaim.status === 'menunggu' ? (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          handleVerify(selectedKlaim.klaim_id, 'ditolak');
                          setIsModalOpen(false);
                        }}
                        className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold py-3.5 rounded-2xl transition-all text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer border border-rose-150 shadow-sm active:scale-[0.98] font-['Montserrat']"
                      >
                        Tolak Klaim
                      </button>
                      <button 
                        onClick={() => {
                          handleVerify(selectedKlaim.klaim_id, 'disetujui');
                          setIsModalOpen(false);
                        }}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold py-3.5 rounded-2xl transition-all text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.98] font-['Montserrat']"
                      >
                        Setujui Klaim
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LaporanKlaimBarangPage;