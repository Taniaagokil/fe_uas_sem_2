import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, ChevronDown, Building, CalendarDays, Check } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import axiosClient from '../api/axiosClient';
import { useToast } from '../contexts/ToastContext';

const ReportPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    namaBarang: '',
    kategori: '',
    gedung: '',
    lokasi: '',
    tanggal: '', 
    deskripsi: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const { data: categories } = useFetch('/kategori');
  const { data: buildings } = useFetch('/gedung');

  useEffect(() => {
    if (buildings && buildings.length > 0 && !formData.gedung) {
      setFormData(prev => ({ ...prev, gedung: buildings[0].gedung_id }));
    }
  }, [buildings]);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

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
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const data = new FormData();
    data.append('nama_barang', formData.namaBarang);
    data.append('kategori_id', formData.kategori);
    data.append('gedung_id', formData.gedung);
    data.append('lokasi_detail', formData.lokasi);
    data.append('tanggal_hilang', formData.tanggal);
    data.append('deskripsi', formData.deskripsi);
    if (selectedFile) {
      data.append('foto', selectedFile);
    }

    try {
      await axiosClient.post('/laporan-kehilangan', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setIsSubmitted(true);
      setTimeout(() => {
        navigate('/'); 
      }, 2500);
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || 'Gagal mengirim laporan', 'error');
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

        <h1 className="text-3xl md:text-5xl font-extrabold mb-8 text-center tracking-tight text-[#273A5A]">
          Lapor <span className="text-[#EBB134] text-glow">Kehilangan</span>
        </h1>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*"
          className="hidden" 
        />

        <div className="max-w-2xl mx-auto">
          {/* Upload Foto Area */}
          <div 
            onClick={handleUploadClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`bg-white border-2 border-dashed rounded-[24px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group mb-8 shadow-xl shadow-[#273A5A]/5 relative min-h-[200px] ${
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
                <UploadCloud className={`w-12 h-12 mb-3 transition-colors duration-300 ${isDragging ? 'text-[#EBB134]' : 'text-slate-400 group-hover:text-[#EBB134]'}`} strokeWidth={1.5} />
                <span className="font-extrabold text-xs sm:text-sm text-slate-500 group-hover:text-[#273A5A] transition-colors duration-300">
                  Upload Foto Barang
                </span>
                <p className="text-[10px] text-slate-400 mt-2 font-semibold">Tarik & letakkan foto di sini, atau klik untuk memilih</p>
              </>
            )}
          </div>

          <div className="bg-white p-6 sm:p-10 md:p-12 rounded-[32px] shadow-xl shadow-[#273A5A]/5 border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Nama Barang <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="namaBarang"
                  required
                  value={formData.namaBarang}
                  onChange={handleChange}
                  placeholder="Contoh: iPhone 17 Pro Max" 
                  className="w-full bg-slate-50 px-5 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#EBB134]/30 focus:border-[#EBB134] focus:bg-white transition-all duration-300 font-semibold text-xs sm:text-sm border border-slate-100 text-[#273A5A]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Kategori Barang <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select 
                      name="kategori"
                      required
                      value={formData.kategori}
                      onChange={handleChange}
                      className="w-full bg-slate-50 px-5 py-3.5 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#EBB134]/30 focus:border-[#EBB134] focus:bg-white transition-all duration-300 font-semibold text-xs sm:text-sm border border-slate-100 text-[#273A5A] cursor-pointer"
                    >
                      <option value="" disabled>Pilih Kategori</option>
                      {categories && categories.map(cat => (
                        <option key={cat.kategori_barang_id} value={cat.kategori_barang_id}>
                          {cat.nama_kategori}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <ChevronDown className="w-4 h-4 text-slate-400" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Gedung Kehilangan <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select 
                      name="gedung"
                      value={formData.gedung}
                      onChange={handleChange}
                      className="w-full bg-slate-50 pl-12 pr-10 py-3.5 rounded-2xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#EBB134]/30 focus:border-[#EBB134] focus:bg-white transition-all duration-300 font-semibold text-xs sm:text-sm border border-slate-100 text-[#273A5A] cursor-pointer"
                    >
                      {buildings && buildings.map(b => (
                        <option key={b.gedung_id} value={b.gedung_id}>
                          {b.nama_gedung}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <Building className="w-5 h-5 text-[#EBB134]" strokeWidth={2} />
                    </div>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <ChevronDown className="w-4 h-4 text-slate-400" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Lokasi Terakhir <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="lokasi"
                    required
                    value={formData.lokasi}
                    onChange={handleChange}
                    placeholder="Contoh: Lt. 3 ruang 306" 
                    className="w-full bg-slate-50 px-5 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#EBB134]/30 focus:border-[#EBB134] focus:bg-white transition-all duration-300 font-semibold text-xs sm:text-sm border border-slate-100 text-[#273A5A]"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Tanggal Hilang <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="date" 
                      name="tanggal"
                      required
                      value={formData.tanggal}
                      onChange={handleChange}
                      className="w-full bg-slate-50 pl-12 pr-5 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#EBB134]/30 focus:border-[#EBB134] focus:bg-white transition-all duration-300 font-semibold text-xs sm:text-sm border border-slate-100 text-[#273A5A]"
                    />
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <CalendarDays className="w-5 h-5 text-[#EBB134]" strokeWidth={2} />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Deskripsi dan Ciri-Ciri <span className="text-red-500">*</span>
                </label>
                <textarea 
                  rows="4" 
                  name="deskripsi"
                  required
                  value={formData.deskripsi}
                  onChange={handleChange}
                  placeholder="Deskripsikan ciri-ciri khusus barang Anda (misal: warna casing, stiker, dll)" 
                  className="w-full bg-slate-50 px-5 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#EBB134]/30 focus:border-[#EBB134] focus:bg-white transition-all duration-300 font-semibold text-xs sm:text-sm border border-slate-100 text-[#273A5A] resize-none"
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => navigate('/')}
                  disabled={isSubmitting}
                  className={`flex-1 bg-slate-100 hover:bg-slate-200 text-[#273A5A] font-extrabold py-4 px-6 rounded-2xl transition-all duration-200 text-xs cursor-pointer border-none ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Kembali
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`flex-1 bg-[#EBB134] hover:bg-[#d19a28] text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-[#EBB134]/15 hover:shadow-xl hover:shadow-[#EBB134]/25 transition-all duration-300 text-xs cursor-pointer border-none ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Mengirim...' : 'Lapor Kehilangan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-white p-8 sm:p-10 rounded-[32px] shadow-2xl border border-slate-100 flex flex-col items-center max-w-sm mx-4 text-center animate-fade-in"
            >
              {/* Lingkaran Centang */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6"
              >
                <Check className="w-10 h-10" strokeWidth={3} />
              </motion.div>

              <h2 className="text-[#273A5A] text-xl sm:text-2xl font-extrabold mb-3">Laporan Diajukan!</h2>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
                Laporan kehilangan Anda telah kami terima. Mengarahkan kembali ke beranda...
              </p>

              {/* Progress bar */}
              <div className="mt-8 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                  className="bg-[#EBB134] h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReportPage;