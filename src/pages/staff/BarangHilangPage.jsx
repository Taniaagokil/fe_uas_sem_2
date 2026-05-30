import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReusableTable from '../../components/staff/Table';
import StatusDropdown from '../../components/staff/StatusDropdown';
import Footerstaff from '../../components/staff/Footerstaff';
import useFetch from '../../hooks/useFetch';
import axiosClient from '../../api/axiosClient';
import { FiEye, FiTrash2, FiX, FiSearch, FiRepeat, FiMapPin, FiCalendar, FiFileText } from 'react-icons/fi';
import { useToast } from '../../contexts/ToastContext';

const BarangHilangPage = () => {
  const { data, loading, error, reFetch } = useFetch('/admin/barang-hilang');
  const { showToast, showConfirm } = useToast();
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
      showToast('Status Berhasil Diperbarui', 'success');
      reFetch();
    } catch (err) {
      showToast('Gagal memperbarui status', 'error');
    }
  };

  const handleDelete = (id) => {
    showConfirm({
      title: 'Hapus Laporan',
      message: 'Apakah Anda yakin? Data barang hilang akan dihapus permanen!',
      onConfirm: async () => {
        try {
          await axiosClient.delete(`/admin/barang/${id}`);
          showToast('Data telah berhasil dihapus.', 'success');
          reFetch();
        } catch (err) {
          showToast('Gagal menghapus data', 'error');
        }
      }
    });
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
      showToast('Data telah ditarik ke daftar Barang Temuan.', 'success');
      setIsTarikModalOpen(false);
      reFetch();
    } catch (err) {
      showToast(err.response?.data?.message || 'Gagal menarik data', 'error');
    }
  };

  const columns = [
    { 
      header: 'ID', 
      width: '8%',
      render: (row) => <span className="text-[#273A5A] font-bold text-sm md:text-base">{row.barang_id}</span>
    },

    { 
      header: 'Nama Barang', 
      align: 'left',
      width: '30%',
      render: (row) => <span className="font-bold text-[#273A5A] text-sm md:text-base truncate">{row.nama_barang}</span>
    },
    { 
      header: 'Kategori', 
      width: '15%',
      render: (row) => (
        <span className="text-xs md:text-sm bg-[#273A5A]/10 text-[#273A5A] px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
          {row.kategori?.nama_kategori || '-'}
        </span>
      )
    },
    { 
      header: 'Tanggal', 
      width: '15%',
      render: (row) => <span className="text-sm md:text-base text-slate-400 font-semibold">{row.laporan?.tanggal_hilang || '-'}</span>
    },
    { 
      header: 'Status Laporan', 
      align: 'center',
      width: '22%',
      render: (row) => {
        const getStatusStyles = (status) => {
          switch (status) {
            case 'belum_ditemukan': return 'bg-rose-500 hover:bg-rose-600 text-white';
            case 'ditemukan': return 'bg-emerald-500 hover:bg-emerald-600 text-white';
            case 'dikembalikan': return 'bg-indigo-550 hover:bg-indigo-600 text-white';
            case 'arsip': return 'bg-slate-500 hover:bg-slate-600 text-white';
            default: return 'bg-blue-500 hover:bg-blue-600 text-white';
          }
        };

        const options = [
          { value: 'belum_ditemukan', label: 'Belum Ditemukan' },
          { value: 'ditemukan', label: 'Ditemukan' },
          { value: 'dikembalikan', label: 'Dikembalikan' },
          { value: 'arsip', label: 'Arsip' }
        ];

        return (
          <div className="w-full px-2 flex justify-center">
            <StatusDropdown
              value={row.status}
              onChange={(newStatus) => handleStatusChange(row.barang_id, newStatus)}
              options={options}
              statusStyles={getStatusStyles}
            />
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
            title="Detail"
          >
            <FiEye size={15} />
            <span>Detail</span>
          </motion.button>
        </div>
      )
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
              Laporan Barang <span className="text-[#E2B053]">Hilang</span>
            </h1>
            <p className="text-slate-400 text-xs md:text-sm font-medium">Kelola dan pantau semua laporan barang hilang dari mahasiswa</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-6 gap-4 w-full">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="relative flex-1 max-w-full sm:max-w-md group"
          >
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#E2B053] transition-colors" size={18} />
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
          <ReusableTable columns={columns} data={filteredData} />
        </div>

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
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 relative z-10 flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
            >
              {/* Image Section */}
              <div className="md:w-1/2 h-64 md:h-auto bg-slate-50 relative min-h-[300px] flex-shrink-0">
                {selectedBarang.foto_barang ? (
                  <img 
                    src={`http://localhost:8000/storage/barang/${selectedBarang.foto_barang}`} 
                    alt={selectedBarang.nama_barang}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-50/50 gap-2">
                    <FiFileText size={48} className="text-slate-350" />
                    <span className="font-bold text-[11px] uppercase tracking-wider text-slate-400">Tidak Ada Foto</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-[#273A5A]/90 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {selectedBarang.kategori?.nama_kategori || 'Kategori'}
                </div>
              </div>

              {/* Info Section */}
              <div className="md:w-1/2 p-6 md:p-8 relative flex flex-col justify-between overflow-y-auto">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-5 right-5 text-slate-400 hover:text-slate-650 hover:bg-slate-50 p-1.5 rounded-full transition-all cursor-pointer"
                >
                  <FiX size={20} />
                </button>

                <div className="space-y-6">
                  {/* Header info */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">ID LAPORAN: {selectedBarang.barang_id}</span>
                    <h2 className="text-xl md:text-2xl font-extrabold text-[#273A5A] tracking-tight leading-tight pr-8">{selectedBarang.nama_barang}</h2>
                    <div className="pt-1">
                      <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm ${
                        selectedBarang.status === 'belum_ditemukan' 
                          ? 'bg-rose-500 text-white' 
                          : selectedBarang.status === 'ditemukan' 
                          ? 'bg-emerald-500 text-white' 
                          : selectedBarang.status === 'dikembalikan' 
                          ? 'bg-indigo-500 text-white' 
                          : 'bg-slate-500 text-white'
                      }`}>
                        {selectedBarang.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Details list */}
                  <div className="space-y-4 border-t border-slate-100 pt-5">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-slate-50 rounded-xl text-[#E2B053] flex-shrink-0 border border-slate-100">
                        <FiMapPin size={16} />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Lokasi Hilang</label>
                        <p className="text-[#273A5A] font-bold text-sm leading-snug">{selectedBarang.laporan?.gedung?.nama_gedung || '-'}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-slate-50 rounded-xl text-[#E2B053] flex-shrink-0 border border-slate-100">
                        <FiCalendar size={16} />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Tanggal Hilang</label>
                        <p className="text-[#273A5A] font-bold text-sm leading-snug">{selectedBarang.laporan?.tanggal_hilang || '-'}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-slate-50 rounded-xl text-[#E2B053] flex-shrink-0 border border-slate-100">
                        <FiFileText size={16} />
                      </div>
                      <div className="flex-1">
                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Deskripsi</label>
                        <p className="text-slate-600 text-xs md:text-sm font-semibold leading-relaxed bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100 max-h-[110px] overflow-y-auto">
                          {selectedBarang.deskripsi || 'Tidak ada deskripsi tambahan.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-6 border-t border-slate-100 flex flex-col gap-2.5 mt-6">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setIsModalOpen(false);
                        handleDelete(selectedBarang.barang_id);
                      }}
                      className="flex-1 bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold py-3.5 rounded-2xl transition-all text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer border border-rose-150 shadow-sm active:scale-[0.98] font-['Montserrat']"
                    >
                      Hapus
                    </button>
                    {selectedBarang.status === 'ditemukan' && (
                      <button 
                        onClick={() => {
                          setIsModalOpen(false);
                          openTarikModal(selectedBarang);
                        }}
                        className="flex-1 bg-[#E2B053] hover:bg-[#d49f3e] text-white font-extrabold py-3.5 rounded-2xl transition-all text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.98] font-['Montserrat']"
                      >
                        Tarik Data
                      </button>
                    )}
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-[#273A5A] font-extrabold py-3.5 rounded-2xl transition-all text-xs md:text-sm cursor-pointer active:scale-[0.98] font-['Montserrat']"
                  >
                    Tutup
                  </button>
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
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-lg rounded-3xl md:rounded-[32px] overflow-hidden shadow-xl border border-slate-100 relative z-10 p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#273A5A] tracking-tight">Tarik Data Temuan</h2>
                <button onClick={() => setIsTarikModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <FiX size={24} />
                </button>
              </div>

              <div className="mb-6 p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 shadow-inner bg-slate-100 flex items-center justify-center flex-shrink-0">
                  {selectedBarang.foto_barang ? (
                    <img src={`http://localhost:8000/storage/barang/${selectedBarang.foto_barang}`} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <span className="text-[8px] font-bold text-slate-300">NO IMG</span>
                  )}
                </div>
                <div>
                  <p className="font-bold text-[#273A5A] text-sm truncate max-w-[200px]">{selectedBarang.nama_barang}</p>
                  <p className="text-[11px] text-slate-400 font-semibold">Kode: {selectedBarang.kode_barang}</p>
                </div>
              </div>

              <form onSubmit={handleTarikData} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Lokasi Ditemukan</label>
                  <input
                    type="text"
                    required
                    placeholder="Misalnya: Lobi Gedung A Lantai 2"
                    value={tarikFormData.lokasi_ditemukan}
                    onChange={(e) => setTarikFormData({ ...tarikFormData, lokasi_ditemukan: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-sm text-[#273A5A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E2B053] focus:border-transparent transition-all placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Tanggal Ditemukan</label>
                  <input 
                    type="date"
                    required
                    value={tarikFormData.tanggal_ditemukan}
                    onChange={(e) => setTarikFormData({...tarikFormData, tanggal_ditemukan: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-sm text-[#273A5A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E2B053] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Ditemukan Oleh (Opsional)</label>
                  <input 
                    type="text"
                    placeholder="Nama penemu..."
                    value={tarikFormData.ditemukan_oleh}
                    onChange={(e) => setTarikFormData({...tarikFormData, ditemukan_oleh: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-sm text-[#273A5A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E2B053] focus:border-transparent transition-all placeholder-slate-400"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsTarikModalOpen(false)}
                    className="flex-1 px-4 py-3.5 rounded-xl border border-slate-200 text-slate-500 font-extrabold hover:bg-slate-50 transition-all text-xs md:text-sm cursor-pointer"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-3.5 rounded-xl bg-[#E2B053] hover:bg-[#d49f3e] text-white font-extrabold transition-all text-xs md:text-sm cursor-pointer shadow-md hover:shadow-lg active:scale-95"
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