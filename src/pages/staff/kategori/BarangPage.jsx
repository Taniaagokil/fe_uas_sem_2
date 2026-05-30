import React, { useState } from 'react';
import ReusableTable from '../../../components/staff/Table';
import Footerstaff from '../../../components/staff/Footerstaff';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiPlus, FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import useFetch from '../../../hooks/useFetch';
import axiosClient from '../../../api/axiosClient';
import { useToast } from '../../../contexts/ToastContext';

const BarangPage = () => {
  const { data, loading, error, reFetch } = useFetch('/kategori');
  const { showToast, showConfirm } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [namaKategori, setNamaKategori] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = Array.isArray(data)
    ? data.filter(b => b.nama_kategori?.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditId(item.kategori_barang_id);
      setNamaKategori(item.nama_kategori);
    } else {
      setEditId(null);
      setNamaKategori('');
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editId) {
        await axiosClient.put(`/admin/kategori/${editId}`, { nama_kategori: namaKategori });
        showToast('Kategori berhasil diperbarui', 'success');
      } else {
        await axiosClient.post('/admin/kategori', { nama_kategori: namaKategori });
        showToast('Kategori berhasil ditambahkan', 'success');
      }
      setIsModalOpen(false);
      reFetch();
    } catch (err) {
      showToast(err.response?.data?.message || 'Terjadi kesalahan', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id) => {
    showConfirm({
      title: 'Hapus Kategori',
      message: 'Apakah Anda yakin ingin menghapus kategori ini?',
      onConfirm: async () => {
        try {
          await axiosClient.delete(`/admin/kategori/${id}`);
          showToast('Kategori berhasil dihapus', 'success');
          reFetch();
        } catch (err) {
          showToast(err.response?.data?.message || 'Gagal menghapus kategori', 'error');
        }
      }
    });
  };

  const columns = [
    { 
      header: 'ID', 
      width: '15%',
      render: (row) => <span className="text-[#273A5A] font-bold">#{row.kategori_barang_id}</span>
    },
    { 
      header: 'Kategori Barang', 
      align: 'left',
      width: '60%',
      render: (row) => <span className="font-extrabold text-[#273A5A] text-xs md:text-sm uppercase tracking-wider bg-[#273A5A]/5 px-3.5 py-2 rounded-full">{row.nama_kategori}</span>
    },
    { 
      header: 'Aksi', 
      align: 'center',
      width: '25%',
      render: (row) => (
        <div className="flex gap-2 justify-center items-center w-max mx-auto whitespace-nowrap">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOpenModal(row)}
            className="px-3.5 py-2 bg-[#263959] text-white rounded-xl hover:opacity-85 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer font-bold text-xs md:text-sm"
            title="Edit"
          >
            <FiEdit size={14} />
            <span>Edit</span>
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDelete(row.kategori_barang_id)}
            className="px-3.5 py-2 bg-[#263959] text-white rounded-xl hover:opacity-85 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer font-bold text-xs md:text-sm"
            title="Hapus"
          >
            <FiTrash2 size={14} />
            <span>Hapus</span>
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
              Kelola <span className="text-[#E2B053]">Kategori</span>
            </h1>
            <p className="text-slate-400 text-xs md:text-sm font-medium">Tambah, edit, dan hapus kategori barang temuan & hilang</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-6 gap-4 w-full">
          <div className="relative flex-1 max-w-full sm:max-w-md group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#E2B053] transition-colors" size={18} />
            <input
              type="text"
              placeholder="Cari..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-3 bg-white border border-slate-200/60 rounded-2xl focus:ring-2 focus:ring-[#E2B053] focus:border-transparent outline-none text-sm text-[#273A5A] font-semibold transition-all"
            />
          </div>

          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => handleOpenModal()}
            className="flex items-center justify-center gap-2 bg-[#273A5A] text-white px-6 py-3 rounded-2xl font-extrabold hover:bg-[#1a2538] transition-colors shadow-md text-xs md:text-sm cursor-pointer"
          >
            <FiPlus size={18} strokeWidth={3} />
            <span>Tambah Kategori</span>
          </motion.button>
        </div>

        <div className="w-full md:overflow-visible">
          <ReusableTable columns={columns} data={filteredData} />
        </div>
      </div>

      <Footerstaff />

      {/* Modal Form */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
              className="bg-white w-full max-w-md p-8 rounded-3xl md:rounded-[32px] shadow-xl border border-slate-100 relative z-10"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <FiX size={24} />
              </button>

              <h2 className="text-xl md:text-2xl font-extrabold text-[#273A5A] tracking-tight mb-6">
                {editId ? 'Edit Kategori' : 'Tambah Kategori'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Nama Kategori</label>
                  <input 
                    type="text"
                    required
                    value={namaKategori}
                    onChange={(e) => setNamaKategori(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-sm text-[#273A5A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E2B053] focus:border-transparent transition-all placeholder-slate-400"
                    placeholder="Contoh: Elektronik"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-3.5 rounded-xl border border-slate-200 text-slate-500 font-extrabold hover:bg-slate-50 transition-all text-xs md:text-sm cursor-pointer font-['Montserrat']"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 px-4 py-3.5 rounded-xl bg-[#E2B053] hover:bg-[#d49f3e] text-white font-extrabold transition-all text-xs md:text-sm cursor-pointer shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 font-['Montserrat']"
                  >
                    {isLoading ? 'Menyimpan...' : (editId ? 'Simpan' : 'Tambah')}
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

export default BarangPage;