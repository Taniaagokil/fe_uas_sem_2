import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReusableTable from '../../components/staff/Table';
import Footerstaff from '../../components/staff/Footerstaff';
import useFetch from '../../hooks/useFetch';
import axiosClient from '../../api/axiosClient';
import { FiEye, FiTrash2, FiX, FiSearch, FiRepeat } from 'react-icons/fi';

const BarangHilangPage = () => {
  const { data, loading, error, reFetch } = useFetch('/admin/barang-hilang');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBarang, setSelectedBarang] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTarikModalOpen, setIsTarikModalOpen] = useState(false);
  const [tarikFormData, setTarikFormData] = useState({
    lokasi_ditemukan: '',
    tanggal_ditemukan: new Date().toISOString().split('T')[0],
    ditemukan_oleh: ''
  });

  const filteredData = Array.isArray(data)
    ? data.filter(b =>
        b.nama_barang?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.kategori?.nama_kategori?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosClient.put(`/admin/barang/${id}/status`, { status: newStatus });
      alert('Status Berhasil Diperbarui');
      reFetch();
    } catch (err) {
      alert('Gagal memperbarui status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin? Data barang hilang akan dihapus permanen!")) return;

    try {
      await axiosClient.delete(`/admin/barang/${id}`);
      alert('Data telah berhasil dihapus.');
      reFetch();
    } catch (err) {
      alert('Gagal menghapus data');
    }
  };

  const openDetail = (barang) => {
    setSelectedBarang(barang);
    setIsModalOpen(true);
  };

  const openTarikModal = (barang) => {
    setSelectedBarang(barang);
    setTarikFormData({
      ...tarikFormData,
      lokasi_ditemukan: barang.laporan?.gedung?.nama_gedung || ''
    });
    setIsTarikModalOpen(true);
  };

  const handleTarikData = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post(`/admin/barang/${selectedBarang.barang_id}/tarik-data`, tarikFormData);
      alert('Data telah ditarik ke daftar Barang Temuan.');
      setIsTarikModalOpen(false);
      reFetch();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menarik data');
    }
  };

  const columns = [
    { 
      header: 'Kode', 
      width: '50px',
      render: (_, index) => <span className="text-[#2D3E50] font-bold">{String(index + 1).padStart(3, '0')}</span>
    },
    { 
      header: 'Gambar', 
      width: '80px',
      render: (row) => (
        <div className="w-10 h-10 rounded-xl bg-gray-100 overflow-hidden border border-gray-100 flex items-center justify-center mx-auto">
          {row.foto_barang ? (
            <img src={`http://localhost:8000/storage/barang/${row.foto_barang}`} className="w-full h-full object-cover" alt="" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300 text-[8px] font-bold">NO IMG</div>
          )}
        </div>
      )
    },
    { 
      header: 'Nama Barang', 
      align: 'left',
      width: '200px',
      render: (row) => <span className="font-bold text-[#2D3E50] text-sm truncate">{row.nama_barang}</span>
    },
    { 
      header: 'Kategori', 
      width: '120px',
      render: (row) => (
        <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-md font-bold uppercase tracking-tight">
          {row.kategori?.nama_kategori || '-'}
        </span>
      )
    },
    { 
      header: 'Tanggal', 
      width: '120px',
      render: (row) => <span className="text-[11px] text-gray-400 font-medium">{row.laporan?.tanggal_hilang || '-'}</span>
    },
    { 
      header: 'Status Laporan', 
      width: '180px',
      render: (row) => {
        const getStatusStyles = (status) => {
          switch (status) {
            case 'belum_ditemukan': return 'bg-[#FFF0F0] text-[#CC7171] border-[#FFDEDE]';
            case 'ditemukan': return 'bg-[#F0F7FF] text-[#4A90E2] border-[#D0E5FF]';
            case 'dikembalikan': return 'bg-[#F0FFF4] text-[#38A169] border-[#C6F6D5]';
            case 'arsip': return 'bg-[#F7FAFC] text-[#718096] border-[#E2E8F0]';
            default: return 'bg-gray-100 text-gray-600 border-gray-200';
          }
        };

        return (
          <div className="w-full px-2">
            <select 
              value={row.status}
              onChange={(e) => handleStatusChange(row.barang_id, e.target.value)}
              className={`w-full appearance-none px-2 py-1.5 rounded-xl text-[10px] font-extrabold border transition-all cursor-pointer text-center outline-none ${getStatusStyles(row.status)} hover:shadow-md focus:ring-2 focus:ring-opacity-50`}
            >
              <option value="belum_ditemukan">BELUM DITEMUKAN</option>
              <option value="ditemukan">DITEMUKAN</option>
              <option value="dikembalikan">DIKEMBALIKAN</option>
              <option value="arsip">ARSIP</option>
            </select>
          </div>
        )
      }
    },
    { 
      header: 'Tindakan', 
      width: '120px',
      render: (row) => (
        <div className="flex gap-1.5 justify-center w-full">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => openDetail(row)}
            className="w-8 h-8 bg-white border border-gray-100 text-[#2D3E50] rounded-lg shadow-sm flex items-center justify-center hover:bg-[#2D3E50] hover:text-white transition-all group flex-shrink-0"
            title="Detail"
          >
            <FiEye size={14} />
          </motion.button>
          
          {row.status === 'ditemukan' && (
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => openTarikModal(row)}
              className="px-2 h-8 bg-[#D4B04C] text-white rounded-lg shadow-lg shadow-[#D4B04C]/20 flex items-center gap-1 text-[9px] font-bold hover:bg-[#c4a142] transition-all flex-shrink-0"
              title="Tarik ke Temuan"
            >
              <FiRepeat size={10} />
              <span>Tarik</span>
            </motion.button>
          )}

          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDelete(row.barang_id)}
            className="w-8 h-8 bg-white border border-red-100 text-[#FF4D4D] rounded-lg shadow-sm flex items-center justify-center hover:bg-[#FF4D4D] hover:text-white transition-all group flex-shrink-0"
            title="Hapus"
          >
            <FiTrash2 size={14} />
          </motion.button>
        </div>
      )
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-screen font-['Montserrat'] bg-white"
    >
      <div className="p-4 sm:p-6 md:p-10 flex-1">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10 gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#2D3E50] tracking-tight">
              Laporan Barang <span className="text-[#D4B04C]">Hilang</span>
            </h1>
            <p className="text-gray-400 text-xs md:text-sm font-medium">Kelola dan pantau semua laporan barang hilang dari mahasiswa</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-6 md:mb-8 gap-4">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="relative flex-1 max-w-full sm:max-w-md group"
          >
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D4B04C] transition-colors" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-2.5 md:py-3 bg-[#EDEDED] border-none rounded-xl focus:ring-1 focus:ring-[#D4B04C] outline-none text-sm"
              placeholder="Cari..."
            />
          </motion.div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-[0_0_20px_rgba(0,0,0,0.03)] border border-gray-50 overflow-hidden max-w-full">
          <div className="overflow-x-auto">
            <ReusableTable columns={columns} data={filteredData} />
          </div>
        </div>

        <motion.button 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          whileHover={{ scale: 1.2 }}
          className="fixed bottom-12 right-12 bg-[#D4B04C] p-4 rounded-full text-white shadow-xl z-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        </motion.button>
      </div>

      <Footerstaff />

      {/* Popup Detail Modal */}
      <AnimatePresence>
        {isModalOpen && selectedBarang && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row"
            >
              {/* Image Section */}
              <div className="md:w-1/2 h-64 md:h-auto bg-gray-100 relative">
                {selectedBarang.foto_barang ? (
                  <img 
                    src={`http://localhost:8000/storage/barang/${selectedBarang.foto_barang}`} 
                    alt={selectedBarang.nama_barang}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">
                    TIDAK ADA FOTO
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-[#2D3E50] text-white px-3 py-1 rounded-full text-[10px] font-bold">
                  {selectedBarang.kategori?.nama_kategori}
                </div>
              </div>

              {/* Info Section */}
              <div className="md:w-1/2 p-8 relative">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiX size={24} />
                </button>

                <h2 className="text-2xl font-bold text-[#2D3E50] mb-2">{selectedBarang.nama_barang}</h2>
                <div className="flex items-center gap-2 mb-6">
                  <span className={`px-3 py-1 rounded-full text-white text-[10px] font-bold ${
                    selectedBarang.status === 'belum_ditemukan' ? 'bg-[#CC7171]' : 'bg-[#82B1E1]'
                  }`}>
                    {selectedBarang.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className="text-gray-400 text-[11px]">ID Barang: #{selectedBarang.barang_id}</span>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Lokasi Hilang</label>
                    <p className="text-[#2D3E50] font-semibold">{selectedBarang.laporan?.gedung?.nama_gedung || '-'}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tanggal Hilang</label>
                    <p className="text-[#2D3E50] font-semibold">{selectedBarang.laporan?.tanggal_hilang || '-'}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Deskripsi</label>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {selectedBarang.deskripsi || 'Tidak ada deskripsi tambahan.'}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex gap-3">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-[#EDEDED] text-[#2D3E50] font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors text-sm"
                  >
                    Tutup
                  </button>
                  {selectedBarang.status === 'ditemukan' && (
                    <button 
                      onClick={() => {
                        setIsModalOpen(false);
                        openTarikModal(selectedBarang);
                      }}
                      className="flex-1 bg-[#D4B04C] text-white font-bold py-3 rounded-xl hover:bg-[#c4a142] transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      <FiRepeat /> Tarik Data
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tarik Data Form Modal */}
      <AnimatePresence>
        {isTarikModalOpen && selectedBarang && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTarikModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative z-10 p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#2D3E50]">Tarik Data Temuan</h2>
                <button onClick={() => setIsTarikModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <FiX size={24} />
                </button>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-white shadow-sm">
                  <img src={`http://localhost:8000/storage/barang/${selectedBarang.foto_barang}`} className="w-full h-full object-cover" alt="" />
                </div>
                <div>
                  <p className="font-bold text-[#2D3E50] text-sm">{selectedBarang.nama_barang}</p>
                  <p className="text-[11px] text-gray-400">Kode: {selectedBarang.kode_barang}</p>
                </div>
              </div>

              <form onSubmit={handleTarikData} className="space-y-5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Lokasi Ditemukan</label>
                  <input
                    type="text"
                    required
                    placeholder="Misalnya: Lobi Gedung A Lantai 2"
                    value={tarikFormData.lokasi_ditemukan}
                    onChange={(e) => setTarikFormData({ ...tarikFormData, lokasi_ditemukan: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F8F9FA] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#D4B04C] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Tanggal Ditemukan</label>
                  <input 
                    type="date"
                    required
                    value={tarikFormData.tanggal_ditemukan}
                    onChange={(e) => setTarikFormData({...tarikFormData, tanggal_ditemukan: e.target.value})}
                    className="w-full px-4 py-3 bg-[#F8F9FA] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#D4B04C] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Ditemukan Oleh (Opsional)</label>
                  <input 
                    type="text"
                    placeholder="Nama penemu..."
                    value={tarikFormData.ditemukan_oleh}
                    onChange={(e) => setTarikFormData({...tarikFormData, ditemukan_oleh: e.target.value})}
                    className="w-full px-4 py-3 bg-[#F8F9FA] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#D4B04C] outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsTarikModalOpen(false)}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-100 font-bold text-gray-500 hover:bg-gray-50 transition-all text-sm"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-3 rounded-xl bg-[#D4B04C] text-white font-bold hover:bg-[#c4a142] shadow-lg shadow-[#D4B04C]/30 transition-all text-sm"
                  >
                    Konfirmasi Tarik
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BarangHilangPage;