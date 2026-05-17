import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReusableTable from '../../components/staff/Table';
import Footerstaff from '../../components/staff/Footerstaff';
import useFetch from '../../hooks/useFetch';
import axiosClient from '../../api/axiosClient';
import { FiEye, FiSearch, FiX, FiPlus, FiUploadCloud } from 'react-icons/fi';

const BarangTemuanPage = () => {
  const { data, loading, error, reFetch } = useFetch('/admin/barang-temuan');
  const { data: categories } = useFetch('/kategori');
  const { data: buildings } = useFetch('/gedung');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBarang, setSelectedBarang] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    nama_barang: '', kategori_id: '', gedung_id: '',
    tanggal_ditemukan: new Date().toISOString().split('T')[0],
    lokasi_ditemukan: '', ditemukan_oleh: '', deskripsi: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const fileRef = useRef(null);

  const filteredData = Array.isArray(data)
    ? data.filter(b =>
        b.nama_barang?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.kategori?.nama_kategori?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const fd = new FormData();
    Object.entries(uploadForm).forEach(([k, v]) => { if (v) fd.append(k, v); });
    if (selectedFile) fd.append('foto', selectedFile);
    try {
      await axiosClient.post('/admin/barang-temuan', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Barang temuan berhasil ditambahkan!');
      setIsUploadOpen(false);
      setUploadForm({ nama_barang: '', kategori_id: '', gedung_id: '', tanggal_ditemukan: new Date().toISOString().split('T')[0], lokasi_ditemukan: '', ditemukan_oleh: '', deskripsi: '' });
      setSelectedFile(null);
      reFetch();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menambahkan barang');
    } finally {
      setIsUploading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosClient.put(`/admin/barang/${id}/status`, { status: newStatus });
      alert('Status Berhasil Diperbarui');
      reFetch();
    } catch (err) {
      alert('Gagal memperbarui status');
    }
  };

  const openDetail = (barang) => {
    setSelectedBarang(barang);
    setIsModalOpen(true);
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
      render: (row) => <span className="font-bold text-[#2D3E50] text-xs truncate">{row.nama_barang}</span>
    },
    { 
      header: 'Kategori', 
      width: '120px',
      render: (row) => (
        <span className="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-bold uppercase">
          {row.kategori?.nama_kategori || '-'}
        </span>
      )
    },
    { 
      header: 'Tanggal', 
      width: '120px',
      render: (row) => <span className="text-[11px] text-gray-400 font-medium">{row.temuan?.tanggal_ditemukan || '-'}</span>
    },
    { 
      header: 'Penemu', 
      width: '120px',
      render: (row) => <p className="text-[11px] text-[#D4B04C] font-bold truncate">{row.temuan?.ditemukan_oleh || '-'}</p>
    },
    { 
      header: 'Status Barang', 
      width: '15%',
      render: (row) => {
        const getStatusStyles = (status) => {
          switch (status) {
            case 'diunggah': return 'bg-[#F0F7FF] text-[#4A90E2] border-[#D0E5FF]';
            case 'diklaim': return 'bg-[#FFF0F0] text-[#CC7171] border-[#FFDEDE]';
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
              className={`w-full appearance-none px-2 py-2 rounded-xl text-[10px] font-extrabold border transition-all cursor-pointer text-center outline-none ${getStatusStyles(row.status)} hover:shadow-md focus:ring-2 focus:ring-opacity-50`}
            >
              <option value="diunggah">DIUNGGAH</option>
              <option value="diklaim">DIKLAIM</option>
              <option value="dikembalikan">DIKEMBALIKAN</option>
              <option value="arsip">ARSIP</option>
            </select>
          </div>
        )
      }
    },
    { 
      header: 'Tindakan', 
      width: '15%',
      render: (row) => (
        <button 
          onClick={() => openDetail(row)}
          className="w-9 h-9 bg-white border border-gray-100 text-[#2D3E50] rounded-xl shadow-sm flex items-center justify-center hover:bg-[#2D3E50] hover:text-white transition-all mx-auto"
        >
          <FiEye size={16} />
        </button>
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
              Laporan Barang <span className="text-[#D4B04C]">Temuan</span>
            </h1>
            <p className="text-gray-400 text-xs md:text-sm font-medium">Kelola semua barang yang telah ditemukan di area kampus</p>
          </div>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-2 bg-[#D4B04C] text-white font-bold px-5 py-3 rounded-xl shadow-lg shadow-[#D4B04C]/20 hover:bg-[#c4a142] transition-all text-sm flex-shrink-0"
          >
            <FiPlus size={18} strokeWidth={3} />
            <span>Tambah Barang</span>
          </button>
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
                    selectedBarang.status === 'diunggah' ? 'bg-[#82B1E1]' : 'bg-[#CC7171]'
                  }`}>
                    {selectedBarang.status.toUpperCase()}
                  </span>
                  <span className="text-gray-400 text-[11px]">ID Barang: #{selectedBarang.barang_id}</span>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Lokasi Temuan</label>
                    <p className="text-[#2D3E50] font-semibold">{selectedBarang.temuan?.lokasi_ditemukan || selectedBarang.temuan?.gedung?.nama_gedung || '-'}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tanggal Temuan</label>
                    <p className="text-[#2D3E50] font-semibold">{selectedBarang.temuan?.tanggal_ditemukan || '-'}</p>
                  </div>
                  {selectedBarang.temuan?.ditemukan_oleh && (
                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Ditemukan Oleh</label>
                      <p className="text-[#2D3E50] font-semibold">{selectedBarang.temuan.ditemukan_oleh}</p>
                    </div>
                  )}
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
                  <button 
                    onClick={() => window.print()}
                    className="flex-1 bg-[#2D3E50] text-white font-bold py-3 rounded-xl hover:bg-[#1a2538] transition-colors text-sm"
                  >
                    Cetak Label
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Upload Barang Temuan */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsUploadOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl relative z-10 p-6 md:p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#2D3E50]">Tambah Barang Temuan</h2>
                <button onClick={() => setIsUploadOpen(false)} className="text-gray-400 hover:text-gray-600"><FiX size={24} /></button>
              </div>

              <form onSubmit={handleUpload} className="space-y-4">
                {/* Upload Foto */}
                <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center cursor-pointer hover:border-[#D4B04C] hover:bg-yellow-50/20 transition-all">
                  <FiUploadCloud size={32} className="text-gray-300 mb-2" />
                  <span className="text-sm font-bold text-gray-400">{selectedFile ? selectedFile.name : 'Klik untuk upload foto'}</span>
                  <input type="file" ref={fileRef} className="hidden" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Nama Barang *</label>
                    <input type="text" required value={uploadForm.nama_barang} onChange={e => setUploadForm({...uploadForm, nama_barang: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4B04C]" placeholder="Contoh: Dompet Hitam" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Kategori *</label>
                    <select required value={uploadForm.kategori_id} onChange={e => setUploadForm({...uploadForm, kategori_id: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4B04C] appearance-none">
                      <option value="">Pilih Kategori</option>
                      {Array.isArray(categories) && categories.map(c => <option key={c.kategori_barang_id} value={c.kategori_barang_id}>{c.nama_kategori}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Gedung Temuan *</label>
                    <select required value={uploadForm.gedung_id} onChange={e => setUploadForm({...uploadForm, gedung_id: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4B04C] appearance-none">
                      <option value="">Pilih Gedung</option>
                      {Array.isArray(buildings) && buildings.map(b => <option key={b.gedung_id} value={b.gedung_id}>{b.nama_gedung}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Tanggal Ditemukan *</label>
                    <input type="date" required value={uploadForm.tanggal_ditemukan} onChange={e => setUploadForm({...uploadForm, tanggal_ditemukan: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4B04C]" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Lokasi Ditemukan</label>
                    <input type="text" value={uploadForm.lokasi_ditemukan} onChange={e => setUploadForm({...uploadForm, lokasi_ditemukan: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4B04C]" placeholder="Lt.2 Ruang 205" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Ditemukan Oleh</label>
                    <input type="text" value={uploadForm.ditemukan_oleh} onChange={e => setUploadForm({...uploadForm, ditemukan_oleh: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4B04C]" placeholder="Nama penemu (opsional)" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Deskripsi / Ciri-ciri</label>
                  <textarea rows="3" value={uploadForm.deskripsi} onChange={e => setUploadForm({...uploadForm, deskripsi: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#D4B04C] resize-none" placeholder="Deskripsikan barang..." />
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setIsUploadOpen(false)} className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-500 font-bold text-sm hover:bg-gray-50 transition-all">Batal</button>
                  <button type="submit" disabled={isUploading} className="flex-1 py-3 rounded-xl bg-[#D4B04C] text-white font-bold text-sm hover:bg-[#c4a142] transition-all shadow-lg shadow-[#D4B04C]/20 disabled:opacity-50">
                    {isUploading ? 'Menyimpan...' : 'Simpan Barang'}
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

export default BarangTemuanPage;