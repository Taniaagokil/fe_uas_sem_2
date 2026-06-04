import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReusableTable from '../../components/staff/Table';
import StatusDropdown from '../../components/staff/StatusDropdown';
import Footerstaff from '../../components/staff/Footerstaff';
import useFetch from '../../hooks/useFetch';
import axiosClient from '../../api/axiosClient';
import { FiEye, FiSearch, FiX, FiPlus, FiUploadCloud, FiUser, FiMapPin, FiCalendar, FiFileText, FiPrinter } from 'react-icons/fi';
import { useToast } from '../../contexts/ToastContext';

const BarangTemuanPage = () => {
  const { data, loading, error, reFetch } = useFetch('/admin/barang-temuan');
  const { data: categories } = useFetch('/kategori');
  const { data: buildings } = useFetch('/gedung');
  const { showToast } = useToast();
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
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileRef.current) fileRef.current.value = '';
  };

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
      showToast('Barang temuan berhasil ditambahkan!', 'success');
      setIsUploadOpen(false);
      setUploadForm({ nama_barang: '', kategori_id: '', gedung_id: '', tanggal_ditemukan: new Date().toISOString().split('T')[0], lokasi_ditemukan: '', ditemukan_oleh: '', deskripsi: '' });
      setSelectedFile(null);
      reFetch();
    } catch (err) {
      showToast(err.response?.data?.message || 'Gagal menambahkan barang', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosClient.put(`/admin/barang/${id}/status`, { status: newStatus });
      showToast('Status Berhasil Diperbarui', 'success');
      reFetch();
    } catch (err) {
      showToast('Gagal memperbarui status', 'error');
    }
  };

  const openDetail = (barang) => {
    setSelectedBarang(barang);
    setIsModalOpen(true);
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
      width: '22%',
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
      render: (row) => <span className="text-sm md:text-base text-slate-400 font-semibold">{row.temuan?.tanggal_ditemukan || '-'}</span>
    },
    { 
      header: 'Penemu', 
      width: '10%',
      render: (row) => <p className="text-sm md:text-base text-[#E2B053] font-bold truncate">{row.temuan?.ditemukan_oleh || '-'}</p>
    },
    { 
      header: 'Status Barang', 
      align: 'center',
      width: '20%',
      render: (row) => {
        const getStatusStyles = (status) => {
          switch (status) {
            case 'diunggah': return 'bg-amber-500 hover:bg-amber-600 text-white';
            case 'diklaim': return 'bg-blue-500 hover:bg-blue-600 text-white';
            case 'dikembalikan': return 'bg-emerald-500 hover:bg-emerald-600 text-white';
            case 'diarsipkan': return 'bg-slate-500 hover:bg-slate-600 text-white';
            default: return 'bg-[#4DA9F1] hover:bg-blue-600 text-white';
          }
        };

        const options = [
          { value: 'diunggah', label: 'Diunggah' },
          { value: 'diklaim', label: 'Diklaim' },
          { value: 'dikembalikan', label: 'Dikembalikan' },
          { value: 'diarsipkan', label: 'Arsip' }
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
          <button 
            onClick={() => openDetail(row)}
            className="px-4 py-2 bg-[#263959] text-white rounded-xl hover:opacity-85 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer font-bold text-xs md:text-sm"
          >
            <FiEye size={15} />
            <span>Detail</span>
          </button>
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
              Laporan Barang <span className="text-[#E2B053]">Temuan</span>
            </h1>
            <p className="text-slate-400 text-xs md:text-sm font-medium">Kelola semua barang yang telah ditemukan di area kampus</p>
          </div>
          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-2 bg-[#E2B053] hover:bg-[#d49f3e] text-white font-extrabold px-5 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm flex-shrink-0 cursor-pointer active:scale-95"
          >
            <FiPlus size={18} strokeWidth={3} />
            <span>Tambah Barang</span>
          </button>
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
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-350 bg-slate-50/50 gap-2">
                    <FiFileText size={48} className="text-slate-300" />
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
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">ID BARANG: {selectedBarang.barang_id}</span>
                    <h2 className="text-xl md:text-2xl font-extrabold text-[#273A5A] tracking-tight leading-tight pr-8">{selectedBarang.nama_barang}</h2>
                    <div className="pt-1">
                      <span className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-sm ${
                        selectedBarang.status === 'diunggah' 
                          ? 'bg-amber-500 text-white' 
                          : selectedBarang.status === 'diklaim' 
                          ? 'bg-blue-500 text-white' 
                          : selectedBarang.status === 'dikembalikan' 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-slate-500 text-white'
                      }`}>
                        {selectedBarang.status}
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
                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Lokasi Temuan</label>
                        <p className="text-[#273A5A] font-bold text-sm leading-snug">{selectedBarang.temuan?.lokasi_ditemukan || selectedBarang.temuan?.gedung?.nama_gedung || '-'}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-slate-50 rounded-xl text-[#E2B053] flex-shrink-0 border border-slate-100">
                        <FiCalendar size={16} />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Tanggal Temuan</label>
                        <p className="text-[#273A5A] font-bold text-sm leading-snug">{selectedBarang.temuan?.tanggal_ditemukan || '-'}</p>
                      </div>
                    </div>

                    {selectedBarang.temuan?.ditemukan_oleh && (
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-slate-50 rounded-xl text-[#E2B053] flex-shrink-0 border border-slate-100">
                          <FiUser size={16} />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Ditemukan Oleh</label>
                          <p className="text-[#273A5A] font-bold text-sm leading-snug">{selectedBarang.temuan.ditemukan_oleh}</p>
                        </div>
                      </div>
                    )}

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
                  <button 
                    onClick={() => window.print()}
                    className="w-full bg-[#273A5A] hover:bg-[#1a2538] text-white font-extrabold py-3.5 rounded-2xl transition-all text-xs md:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.98] font-['Montserrat']"
                  >
                    Cetak Label
                  </button>
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

      {/* Modal Upload Barang Temuan */}
      <AnimatePresence>
        {isUploadOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsUploadOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="bg-white w-full max-w-xl rounded-3xl md:rounded-[32px] overflow-hidden shadow-xl border border-slate-100 relative z-10 p-6 md:p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#273A5A] tracking-tight">Tambah Barang Temuan</h2>
                <button onClick={() => setIsUploadOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><FiX size={24} /></button>
              </div>

              <form onSubmit={handleUpload} className="space-y-4">
                {/* Upload Foto */}
                 <div 
                  onClick={() => fileRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative min-h-[180px] ${
                    previewUrl ? 'p-0 overflow-hidden border-[#E2B053]' : 'p-8 border-slate-200 hover:border-[#E2B053] hover:bg-amber-50/20 bg-slate-50/50'
                  } ${
                    isDragging 
                      ? 'border-[#E2B053] bg-amber-50/40 scale-[1.01]' 
                      : ''
                  }`}
                >
                  {previewUrl ? (
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center p-4">
                        <span className="text-xs font-bold text-white truncate max-w-[280px] text-center mb-3">
                          {selectedFile?.name}
                        </span>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="px-4 py-2 bg-rose-500 hover:bg-rose-650 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-95 cursor-pointer font-['Montserrat']"
                        >
                          Hapus Foto
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <FiUploadCloud size={32} className={`mb-2 transition-colors duration-300 ${isDragging ? 'text-[#E2B053]' : 'text-slate-350'}`} />
                      <span className="text-xs md:text-sm font-bold text-slate-400 text-center">
                        Tarik & letakkan foto di sini, atau klik untuk memilih
                      </span>
                    </>
                  )}
                  <input 
                    type="file" 
                    ref={fileRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => setSelectedFile(e.target.files[0])} 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Nama Barang *</label>
                    <input type="text" required value={uploadForm.nama_barang} onChange={e => setUploadForm({...uploadForm, nama_barang: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-sm text-[#273A5A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E2B053] focus:border-transparent placeholder-slate-400" placeholder="Contoh: Dompet Hitam" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Kategori *</label>
                    <select required value={uploadForm.kategori_id} onChange={e => setUploadForm({...uploadForm, kategori_id: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-sm text-[#273A5A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E2B053] focus:border-transparent">
                      <option value="">Pilih Kategori</option>
                      {Array.isArray(categories) && categories.map(c => <option key={c.kategori_barang_id} value={c.kategori_barang_id}>{c.nama_kategori}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Gedung Temuan *</label>
                    <select required value={uploadForm.gedung_id} onChange={e => setUploadForm({...uploadForm, gedung_id: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-sm text-[#273A5A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E2B053] focus:border-transparent">
                      <option value="">Pilih Gedung</option>
                      {Array.isArray(buildings) && buildings.map(b => <option key={b.gedung_id} value={b.gedung_id}>{b.nama_gedung}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Tanggal Ditemukan *</label>
                    <input type="date" required value={uploadForm.tanggal_ditemukan} onChange={e => setUploadForm({...uploadForm, tanggal_ditemukan: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-sm text-[#273A5A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E2B053] focus:border-transparent" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Lokasi Ditemukan</label>
                    <input type="text" value={uploadForm.lokasi_ditemukan} onChange={e => setUploadForm({...uploadForm, lokasi_ditemukan: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-sm text-[#273A5A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E2B053] focus:border-transparent placeholder-slate-400" placeholder="Lt.2 Ruang 205" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Ditemukan Oleh</label>
                    <input type="text" value={uploadForm.ditemukan_oleh} onChange={e => setUploadForm({...uploadForm, ditemukan_oleh: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-sm text-[#273A5A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E2B053] focus:border-transparent placeholder-slate-400" placeholder="Nama penemu (opsional)" />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Deskripsi / Ciri-ciri</label>
                  <textarea rows="3" value={uploadForm.deskripsi} onChange={e => setUploadForm({...uploadForm, deskripsi: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200/60 rounded-xl text-sm text-[#273A5A] font-semibold focus:outline-none focus:ring-2 focus:ring-[#E2B053] focus:border-transparent resize-none placeholder-slate-400" placeholder="Deskripsikan barang..." />
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setIsUploadOpen(false)} className="flex-1 py-3.5 rounded-xl border border-slate-200 text-slate-500 font-extrabold text-sm hover:bg-slate-50 transition-all cursor-pointer">Batal</button>
                  <button type="submit" disabled={isUploading} className="flex-1 py-3.5 rounded-xl bg-[#E2B053] hover:bg-[#d49f3e] text-white font-extrabold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer">
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