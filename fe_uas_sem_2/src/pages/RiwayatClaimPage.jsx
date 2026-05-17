import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoLocationSharp, IoCalendarClear } from 'react-icons/io5';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; 
import { FaCheck, FaTimes } from 'react-icons/fa'; 
import { motion } from 'framer-motion'; 
import useFetch from '../hooks/useFetch';
import './RiwayatClaimPage.css';

const RiwayatClaimPage = () => {
  const navigate = useNavigate();
  const { data: claimHistory, loading, error } = useFetch('/user/klaim');

  const getStatusConfig = (status) => {
    switch (status) {
      case 'menunggu':
        return {
          label: "Menunggu Verifikasi",
          color: "#E2B053",
          icon: <AiOutlineLoading3Quarters className="animate-spin" style={{ fontSize: '12px' }} />
        };
      case 'disetujui':
        return {
          label: "Klaim Diterima",
          color: "#5CB85C",
          icon: <FaCheck style={{ fontSize: '12px' }} />
        };
      case 'ditolak':
        return {
          label: "Klaim Ditolak",
          color: "#D9534F",
          icon: <FaTimes style={{ fontSize: '12px' }} />
        };
      default:
        return {
          label: status,
          color: "#777",
          icon: null
        };
    }
  };

  const yellowTheme = '#E2B053';

  // Varians Animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen font-['Montserrat'] text-[#273A5A] pb-20 pt-10 bg-gray-50">
      <div className="max-w-[900px] mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10 text-center md:text-left"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Pengajuan Klaim <span className="text-[#EBB134]">Barang</span>
          </h1>
          <p className="text-gray-500 font-medium mt-2">Pantau status verifikasi barang milikmu di sini.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-[#EBB134] border-t-transparent rounded-full animate-spin"></div>
              <p className="font-bold opacity-60">Memuat riwayat klaim...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-500 p-6 rounded-2xl border border-red-100 text-center font-bold">
              {error}
            </div>
          ) : claimHistory && claimHistory.length > 0 ? (
            claimHistory.map((item) => {
              const config = getStatusConfig(item.status);
              return (
                <motion.div 
                  key={item.klaim_id} 
                  variants={itemVariants}
                  className="bg-white rounded-[30px] shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row relative group hover:shadow-xl transition-shadow"
                >
                  {/* Badge Status - Mobile Top */}
                  <div 
                    className="md:hidden px-4 py-2 text-[10px] font-bold text-white uppercase tracking-wider flex items-center gap-2"
                    style={{ backgroundColor: config.color }}
                  >
                    {config.icon}
                    {config.label}
                  </div>

                  {/* Foto Barang */}
                  <div className="md:w-1/3 h-[200px] md:h-auto overflow-hidden">
                    <img 
                      src={item.temuan?.barang?.foto_barang 
                        ? `http://localhost:8000/storage/barang/${item.temuan.barang.foto_barang}` 
                        : `https://via.placeholder.com/300x200?text=${item.temuan?.barang?.nama_barang}`} 
                      alt={item.temuan?.barang?.nama_barang}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Info Konten */}
                  <div className="md:w-2/3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-gray-100 text-[#273A5A] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">
                          {item.temuan?.barang?.kategori?.nama_kategori}
                        </span>
                        {/* Badge Status - Desktop Right */}
                        <div 
                          className="hidden md:flex px-4 py-1.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider items-center gap-2"
                          style={{ backgroundColor: config.color }}
                        >
                          {config.icon}
                          {config.label}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-extrabold mb-4 group-hover:text-[#EBB134] transition-colors">
                        {item.temuan?.barang?.nama_barang}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-500">
                          <HiOutlineOfficeBuilding className="text-[#EBB134]" size={16} />
                          <span>{item.temuan?.gedung?.nama_gedung || 'Vokasi Veteran'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-500">
                          <IoLocationSharp className="text-[#EBB134]" size={16} />
                          <span>{item.temuan?.lokasi_detail || 'Detail lokasi tidak tersedia'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[12px] font-semibold text-gray-500">
                          <IoCalendarClear className="text-[#EBB134]" size={16} />
                          <span>Diajukan: {item.tanggal_klaim}</span>
                        </div>
                      </div>
                    </div>

                    {item.status === 'disetujui' && (
                      <button 
                        onClick={() => navigate(`/pengambilan/${item.klaim_id}`)}
                        className="w-full bg-[#EBB134] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#EBB134]/20 hover:bg-[#d19a28] transition-all text-sm"
                      >
                        Lanjut ke Pengambilan
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white rounded-[30px] border border-dashed border-gray-200">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-lg font-bold">Belum ada riwayat</h3>
              <p className="text-gray-400 text-sm">Semua riwayat klaim barangmu akan muncul di sini.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RiwayatClaimPage;