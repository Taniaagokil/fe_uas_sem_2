import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoLocationSharp, IoCalendarClear, IoCloudUploadOutline } from 'react-icons/io5';
import useFetch from '../hooks/useFetch';
import axiosClient from '../api/axiosClient';
import { useToast } from '../contexts/ToastContext';
import './KlaimBarangPage.css';

function KlaimBarangPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    verifikasi: '',
    lokasi_terakhir: ''
  });

  const fileInputRef = useRef(null);

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
      setFileName(file.name);
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    setFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const { data: item, loading, error } = useFetch(`/barang-temuan/${id}`);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-['Montserrat'] bg-slate-50/50 text-[#273A5A] p-6">
        <div className="w-12 h-12 border-4 border-[#EBB134] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-bold opacity-75 text-sm">Memuat halaman klaim...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-['Montserrat'] bg-slate-50/50 text-[#273A5A] p-6 text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-extrabold mb-2">Barang Tidak Ditemukan</h2>
        <p className="opacity-75 text-sm max-w-sm mb-6">Detail barang temuan tidak dapat diakses atau sudah diklaim.</p>
        <button 
          onClick={() => navigate('/')} 
          className="bg-[#273A5A] text-white px-6 py-3 rounded-2xl font-bold text-xs shadow-lg hover:bg-[#1f2f4c] transition-all cursor-pointer"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const data = new FormData();
    data.append('temuan_id', id);
    data.append('verifikasi_kepemilikan', formData.verifikasi);
    data.append('tempat_kehilangan', formData.lokasi_terakhir);
    data.append('bukti_foto', selectedFile);

    try {
      await axiosClient.post('/klaim', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate('/riwayat-claim'); 
      }, 2300);
    } catch (err) {
      showToast(err.response?.data?.message || 'Gagal mengajukan klaim', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen font-['Montserrat'] text-[#273A5A] pb-24 pt-8 bg-slate-50/50">
      <div className="max-w-[1000px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#273A5A] transition-colors border-none bg-transparent cursor-pointer"
          >
            ← Kembali
          </button>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold mb-8 text-center tracking-tight">
          Klaim <span className="text-[#EBB134] text-glow">Barang</span>
        </h1>

        {/* Info Ringkas Barang */}
        <div className="bg-white rounded-[32px] shadow-xl shadow-[#273A5A]/5 overflow-hidden border border-slate-100 mb-8">
          <div className="flex flex-col md:flex-row">
            {/* Sisi Kiri: Foto Barang */}
            <div className="md:w-1/3 h-[220px] md:h-auto bg-slate-100 relative">
              <img 
                src={item.foto_barang ? `http://localhost:8000/storage/barang/${item.foto_barang}` : `https://via.placeholder.com/600x450?text=${item.nama_barang}`} 
                alt={item.nama_barang} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Sisi Kanan: Info Ringkas */}
            <div className="md:w-2/3 p-6 sm:p-8 flex flex-col justify-center">
              <div className="flex mb-3">
                <span className="bg-[#273A5A] text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {item.kategori?.nama_kategori || 'Kategori Umum'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#273A5A] mb-4">{item.nama_barang}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-600">
                  <HiOutlineOfficeBuilding className="text-[#EBB134] shrink-0" size={18} />
                  <span>{item.temuan?.gedung?.nama_gedung || 'Vokasi Veteran'}</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-600">
                  <IoLocationSharp className="text-[#EBB134] shrink-0" size={18} />
                  <span>{item.temuan?.lokasi_detail || 'Detail lokasi tidak tersedia'}</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-600">
                  <IoCalendarClear className="text-[#EBB134] shrink-0" size={18} />
                  <span>Ditemukan: {item.temuan?.tanggal_ditemukan || 'Tanggal tidak tersedia'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Klaim */}
        <div className="bg-white p-6 sm:p-10 md:p-12 rounded-[32px] shadow-xl shadow-[#273A5A]/5 border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Bukti Foto Kepemilikan <span className="text-red-500">*</span></label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group relative min-h-[200px] ${
                  previewUrl 
                    ? 'p-0 overflow-hidden border-[#EBB134]' 
                    : 'p-8 sm:p-10 border-slate-200 hover:border-[#EBB134] hover:bg-amber-50/20'
                } ${
                  isDragging 
                    ? 'border-[#EBB134] bg-amber-50/40 scale-[1.01]' 
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
                      <span className="font-extrabold text-xs sm:text-sm text-white truncate max-w-[250px] text-center mb-3">
                        {fileName}
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
                    <IoCloudUploadOutline className={`text-4xl mb-3 transition-colors duration-300 ${isDragging ? 'text-[#EBB134]' : 'text-slate-400 group-hover:text-[#EBB134]'}`} />
                    <span className="font-extrabold text-xs sm:text-sm text-slate-500 group-hover:text-[#273A5A] duration-300 transition-colors">
                      Upload Foto Bukti Kepemilikan
                    </span>
                    <p className="text-[10px] text-slate-400 mt-2 font-semibold">Tarik & letakkan foto di sini, atau klik untuk memilih</p>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  required={!selectedFile} 
                  accept="image/*"
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Deskripsi Verifikasi Kepemilikan <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 px-5 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#EBB134]/30 focus:border-[#EBB134] focus:bg-white transition-all duration-300 font-semibold text-xs sm:text-sm border border-slate-100 text-[#273A5A]" 
                  placeholder="Contoh: Wallpaper HP, Kode Sandi, Goresan di sisi kiri" 
                  required 
                  value={formData.verifikasi}
                  onChange={(e) => setFormData({...formData, verifikasi: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Perkiraan Tempat Kehilangan <span className="text-red-500">*</span></label>
                <textarea 
                  className="w-full bg-slate-50 px-5 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#EBB134]/30 focus:border-[#EBB134] focus:bg-white transition-all duration-300 font-semibold text-xs sm:text-sm border border-slate-100 text-[#273A5A] resize-none" 
                  placeholder="Contoh: Gedung BNI Lantai 3 Ruang 3.2..." 
                  rows="1" 
                  required 
                  value={formData.lokasi_terakhir}
                  onChange={(e) => setFormData({...formData, lokasi_terakhir: e.target.value})}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 shrink-0">
              <button 
                type="button" 
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-[#273A5A] font-extrabold py-4 px-6 rounded-2xl transition-all duration-200 text-xs cursor-pointer border-none" 
                onClick={() => navigate(-1)}
              >
                Batal
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 bg-[#EBB134] hover:bg-[#d19a28] text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-[#EBB134]/15 hover:shadow-xl hover:shadow-[#EBB134]/25 transition-all duration-300 text-xs disabled:opacity-50 cursor-pointer border-none"
              >
                {isSubmitting ? 'Mengirim...' : 'Ajukan Klaim'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="bg-white p-8 sm:p-10 rounded-[32px] shadow-2xl flex flex-col items-center max-w-sm w-full border border-slate-100"
            >
              <div className="w-16 h-16 bg-[#EBB134] rounded-full flex items-center justify-center mb-5 shadow-lg shadow-[#EBB134]/20 animate-bounce">
                <span className="text-white text-3xl">✓</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#273A5A] mb-2">Klaim Diajukan!</h3>
              <p className="text-xs text-slate-400 text-center font-bold">Verifikasi Anda sedang diproses. Mohon tunggu...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default KlaimBarangPage;