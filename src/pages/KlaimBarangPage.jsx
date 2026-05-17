import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoLocationSharp, IoCalendarClear, IoCloudUploadOutline } from 'react-icons/io5';
import useFetch from '../hooks/useFetch';
import axiosClient from '../api/axiosClient';
import './KlaimBarangPage.css';

function KlaimBarangPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    verifikasi: '',
    lokasi_terakhir: ''
  });

  const { data: item, loading, error } = useFetch(`/barang-temuan/${id}`);

  if (loading) return <div className="error-screen"><h2>Memuat...</h2></div>;
  if (error || !item) {
    return (
      <div className="error-screen">
        <h2 className="text-bold">Ups! Detail barang tidak ditemukan.</h2>
        <button onClick={() => navigate('/')} className="btn-gold-klaim">Kembali ke Beranda</button>
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
      alert(err.response?.data?.message || 'Gagal mengajukan klaim');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen font-['Montserrat'] text-[#273A5A] pb-20 pt-10 bg-gray-50">
      <div className="max-w-[1000px] mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-8 text-center">
          Klaim <span className="text-[#EBB134]">Barang</span>
        </h1>

        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row">
            {/* Sisi Kiri: Foto Barang */}
            <div className="md:w-1/3 h-[250px] md:h-auto relative">
              <img 
                src={item.foto_barang ? `http://localhost:8000/storage/barang/${item.foto_barang}` : `https://via.placeholder.com/600x450?text=${item.nama_barang}`} 
                alt={item.nama_barang} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Sisi Kanan: Info Ringkas */}
            <div className="md:w-2/3 p-6 md:p-10">
              <div className="bg-[#273A5A] text-white inline-block px-4 py-1 rounded-full text-[10px] font-bold mb-4 uppercase">
                {item.kategori?.nama_kategori || 'Elektronik'}
              </div>
              <h2 className="text-2xl font-bold mb-4">{item.nama_barang}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-600">
                  <HiOutlineOfficeBuilding className="text-[#EBB134]" size={18} />
                  <span>{item.temuan?.gedung?.nama_gedung || 'Vokasi Veteran'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-600">
                  <IoLocationSharp className="text-[#EBB134]" size={18} />
                  <span>{item.temuan?.lokasi_detail || 'Detail lokasi tidak tersedia'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-600">
                  <IoCalendarClear className="text-[#EBB134]" size={18} />
                  <span>{item.temuan?.tanggal_ditemukan || 'Tanggal tidak tersedia'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Klaim */}
        <div className="bg-white p-6 md:p-12 rounded-[40px] shadow-xl border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm md:text-base font-bold mb-3">Bukti Foto Kepemilikan <span className="text-red-500">*</span></label>
              <div 
                onClick={() => document.getElementById('fileInput').click()}
                className="border-2 border-dashed border-gray-200 rounded-[20px] p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#EBB134] hover:bg-yellow-50/30 transition-all group"
              >
                <IoCloudUploadOutline className="text-4xl text-gray-400 mb-3 group-hover:text-[#EBB134] transition-colors" />
                <span className="font-bold text-gray-500 group-hover:text-[#273A5A]">
                  {fileName ? fileName : 'Upload Foto Barang'}
                </span>
                <p className="text-[10px] text-gray-400 mt-2 font-medium">Klik untuk memilih file dari perangkat Anda</p>
                <input type="file" id="fileInput" hidden onChange={handleFileChange} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm md:text-base font-bold mb-3">Verifikasi Kepemilikan <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  className="w-full bg-gray-50 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#EBB134] font-medium border border-gray-100" 
                  placeholder="Contoh: Kode Ponsel, Baret Khas" 
                  required 
                  value={formData.verifikasi}
                  onChange={(e) => setFormData({...formData, verifikasi: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm md:text-base font-bold mb-3">Tempat Kehilangan <span className="text-red-500">*</span></label>
                <textarea 
                  className="w-full bg-gray-50 px-6 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#EBB134] font-medium border border-gray-100 resize-none" 
                  placeholder="Deskripsikan lokasi terakhir..." 
                  rows="1" 
                  required 
                  value={formData.lokasi_terakhir}
                  onChange={(e) => setFormData({...formData, lokasi_terakhir: e.target.value})}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                type="button" 
                className="flex-1 bg-gray-100 text-[#273A5A] font-bold py-4 rounded-2xl hover:bg-gray-200 transition-all" 
                onClick={() => navigate(-1)}
              >
                Kembali
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 bg-[#EBB134] text-white font-bold py-4 rounded-2xl shadow-xl shadow-[#EBB134]/20 hover:bg-[#d19a28] transition-all disabled:opacity-50"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white p-10 rounded-[30px] shadow-2xl flex flex-col items-center max-w-sm w-full"
            >
              <div className="w-20 h-20 bg-[#EBB134] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#EBB134]/30">
                <span className="text-white text-4xl">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-[#273A5A] mb-2">Berhasil Diajukan!</h3>
              <p className="text-gray-500 text-center font-medium">Mengarahkan ke halaman riwayat...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default KlaimBarangPage;