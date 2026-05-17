import React, { useState } from 'react';
import ReusableTable from '../../../components/staff/table';
import { FiSearch, FiPlus, FiEdit, FiTrash2, FiX } from 'react-icons/fi';
import useFetch from '../../../hooks/useFetch';
import axiosClient from '../../../api/axiosClient';

const GedungPage = () => {
  const { data: dataGedung, loading, error, reFetch } = useFetch('/gedung');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [namaGedung, setNamaGedung] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDataGedung = Array.isArray(dataGedung)
    ? dataGedung.filter(g => g.nama_gedung?.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditId(item.gedung_id);
      setNamaGedung(item.nama_gedung);
    } else {
      setEditId(null);
      setNamaGedung('');
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editId) {
        await axiosClient.put(`/admin/gedung/${editId}`, { nama_gedung: namaGedung });
        alert('Gedung berhasil diperbarui');
      } else {
        await axiosClient.post('/admin/gedung', { nama_gedung: namaGedung });
        alert('Gedung berhasil ditambahkan');
      }
      setIsModalOpen(false);
      reFetch();
    } catch (err) {
      alert(err.response?.data?.message || 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus gedung ini?')) return;
    try {
      await axiosClient.delete(`/admin/gedung/${id}`);
      alert('Gedung berhasil dihapus');
      reFetch();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus gedung');
    }
  };

  const columns = [
    { header: 'ID', key: 'gedung_id', width: '10%' },
    { header: 'Nama Gedung', key: 'nama_gedung', width: '70%' },
    { 
      header: 'Aksi', 
      key: 'aksi', 
      width: '20%',
      render: (row) => (
        <div className="flex gap-3 justify-center">
          <button 
            onClick={() => handleOpenModal(row)}
            className="p-2 bg-[#2D3E5E] text-white rounded-md hover:scale-110 transition-transform shadow-sm"
          >
            <FiEdit size={18} />
          </button>
          <button 
            onClick={() => handleDelete(row.gedung_id)}
            className="p-2 bg-[#C64747] text-white rounded-md hover:scale-110 transition-transform shadow-sm"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      )
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 w-full min-h-screen bg-white font-['Montserrat']">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-[#2D3E5E] mb-6 md:mb-8 text-center md:text-left">Kelola Gedung</h1>

      {/* Toolbar Area */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center mb-6 gap-4">
        {/* Search Bar */}
        <div className="relative w-full max-w-full md:max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
            <FiSearch size={18} />
          </span>
          <input
            type="text"
            placeholder="Cari..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 md:py-3 bg-[#EDEDED] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4B04C] transition-all text-sm"
          />
        </div>

        {/* Add Button */}
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 bg-[#2D3E5E] text-white px-5 py-3 rounded-xl font-bold hover:bg-[#1a2538] transition-colors shadow-md text-sm"
        >
          <FiPlus size={18} strokeWidth={3} />
          <span>Tambah Gedung</span>
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <ReusableTable columns={columns} data={filteredDataGedung} />
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600"
            >
              <FiX size={24} />
            </button>

            <h2 className="text-2xl font-bold text-[#2D3E5E] mb-6">
              {editId ? 'Edit Gedung' : 'Tambah Gedung'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Nama Gedung</label>
                <input 
                  type="text"
                  required
                  value={namaGedung}
                  onChange={(e) => setNamaGedung(e.target.value)}
                  className="w-full px-4 py-3 bg-[#EDEDED] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4B04C]"
                  placeholder="Contoh: Gedung BNI"
                />
              </div>
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#D4B04C] text-white font-bold py-3 rounded-xl hover:bg-[#c4a142] transition-colors disabled:opacity-50 mt-4"
              >
                {isLoading ? 'Menyimpan...' : (editId ? 'Simpan Perubahan' : 'Tambah Gedung')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GedungPage;