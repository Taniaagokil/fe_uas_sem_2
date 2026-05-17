import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, ChevronDown, Building, CalendarDays, Check } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import axiosClient from '../api/axiosClient';

const ReportPage = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    namaBarang: '',
    kategori: '',
    gedung: '',
    lokasi: '',
    tanggal: '', 
    deskripsi: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const { data: categories } = useFetch('/kategori');
  const { data: buildings } = useFetch('/gedung');

  useEffect(() => {
    if (buildings && buildings.length > 0 && !formData.gedung) {
      setFormData(prev => ({ ...prev, gedung: buildings[0].gedung_id }));
    }
  }, [buildings]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
      alert(err.response?.data?.message || 'Gagal mengirim laporan');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 min-h-screen flex justify-center py-6 md:py-12 px-4 relative" 
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="bg-white p-5 md:p-10 rounded-[30px] shadow-xl w-full max-w-2xl h-fit border border-gray-100">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#263859] mb-8 text-center md:text-left">
          Lapor <span className="text-[#EBB134]">Kehilangan</span>
        </h2>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*"
          className="hidden" 
        />

        {/* Upload Foto Area */}
        <div 
          onClick={handleUploadClick}
          className="bg-[#F8F9FA] rounded-[15px] flex flex-col items-center justify-center py-12 mb-8 cursor-pointer hover:bg-gray-200 transition duration-200"
        >
          <UploadCloud className="w-12 h-12 text-[#263859] mb-3" strokeWidth={1.5} />
          <span className="text-[#263859] font-bold text-[15px]">
            {selectedFile ? `File: ${selectedFile.name}` : 'Upload Foto Barang'}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[#263859] font-bold text-[15px] mb-2">
              Nama Barang <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="namaBarang"
              required
              value={formData.namaBarang}
              onChange={handleChange}
              placeholder="Contoh: iPhone 17 Pro Max" 
              className="w-full bg-[#F8F9FA] px-4 py-3.5 rounded-[12px] text-[14px] focus:outline-none text-[#263859] placeholder-gray-400 font-medium"
            />
          </div>

          <div>
            <label className="block text-[#263859] font-bold text-[15px] mb-2">
              Kategori Barang <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select 
                name="kategori"
                required
                value={formData.kategori}
                onChange={handleChange}
                className="w-full bg-[#F8F9FA] px-4 py-3.5 rounded-[12px] text-[14px] appearance-none focus:outline-none text-[#263859] font-medium cursor-pointer"
              >
                <option value="" disabled>Pilih Kategori</option>
                {categories && categories.map(cat => (
                  <option key={cat.kategori_barang_id} value={cat.kategori_barang_id}>
                    {cat.nama_kategori}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <ChevronDown className="w-5 h-5 text-[#263859]" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[#263859] font-bold text-[15px] mb-2">
              Gedung kehilangan barang <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center bg-[#F8F9FA] rounded-[12px] px-4 py-3.5">
              <Building className="w-5 h-5 text-[#EBB134] mr-3" strokeWidth={2} />
              <select 
                name="gedung"
                value={formData.gedung}
                onChange={handleChange}
                className="w-full bg-transparent text-[14px] appearance-none focus:outline-none text-[#263859] font-medium cursor-pointer"
              >
                {buildings && buildings.map(b => (
                  <option key={b.gedung_id} value={b.gedung_id}>
                    {b.nama_gedung}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-5 h-5 text-[#263859] absolute right-0 pointer-events-none" strokeWidth={2.5} />
            </div>
          </div>

          <div>
            <label className="block text-[#263859] font-bold text-[15px] mb-2">
              Lokasi Terakhir <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="lokasi"
              required
              value={formData.lokasi}
              onChange={handleChange}
              placeholder="Contoh: Lt. 3 ruang 306" 
              className="w-full bg-[#F8F9FA] px-4 py-3.5 rounded-[12px] text-[14px] focus:outline-none text-[#263859] placeholder-gray-400 font-medium"
            />
          </div>

          <div>
            <label className="block text-[#263859] font-bold text-[15px] mb-2">
              Tanggal Hilang
            </label>
            <div className="relative flex items-center bg-[#F8F9FA] rounded-[12px] px-4 py-3.5">
              <CalendarDays className="w-5 h-5 text-[#EBB134] mr-3" strokeWidth={2} />
              <input 
                type="date" 
                name="tanggal"
                required
                value={formData.tanggal}
                onChange={handleChange}
                className="w-full bg-transparent text-[14px] focus:outline-none text-[#263859] font-medium"
              />
              <ChevronDown className="w-5 h-5 text-[#263859] absolute right-4 pointer-events-none" strokeWidth={2.5} />
            </div>
          </div>

          <div>
            <label className="block text-[#263859] font-bold text-[15px] mb-2">
              Deskripsi dan ciri ciri <span className="text-red-500">*</span>
            </label>
            <textarea 
              rows="4" 
              name="deskripsi"
              required
              value={formData.deskripsi}
              onChange={handleChange}
              placeholder="Deskripsikan ciri ciri barang anda" 
              className="w-full bg-[#F8F9FA] px-4 py-3.5 rounded-[12px] text-[14px] focus:outline-none text-[#263859] placeholder-gray-400 resize-none font-medium"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="w-full sm:w-1/2 bg-gray-100 text-[#263859] hover:bg-gray-200 font-bold py-4 px-4 rounded-xl transition duration-200 text-sm"
            >
              Kembali
            </button>
            <button 
              type="submit" 
              className="w-full sm:w-1/2 bg-[#EBB134] hover:bg-[#d19a28] text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-[#EBB134]/20 transition duration-200 text-sm"
            >
              Lapor Kehilangan
            </button>
          </div>
        </form>
      </div>

      {/* MODAL VALIDASI ANIMASI */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white p-10 rounded-[30px] shadow-xl flex flex-col items-center max-w-sm mx-4"
            >
              {/* Lingkaran Centang */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-[#EBB134] rounded-full flex items-center justify-center mb-6"
              >
                <Check className="text-white w-12 h-12" strokeWidth={4} />
              </motion.div>

              <h2 className="text-[#263859] text-xl font-bold mb-2">Berhasil Diajukan!</h2>
              <p className="text-gray-500 text-center text-sm leading-relaxed">
                Laporan Anda telah kami terima. Mengarahkan ke halaman beranda...
              </p>

              {/* Loader kecil di bawah */}
              <div className="mt-6 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                  className="bg-[#EBB134] h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ReportPage;