import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
// Import Lucide icons
import { UploadCloud, ChevronDown, Building, CalendarDays } from 'lucide-react';

const ReportPage = ({ onAddItem }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaBarang: '',
    kategori: '',
    gedung: 'Vokasi Veteran - Gedung BNI',
    lokasi: '',
    tanggal: '', 
    deskripsi: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (onAddItem) {
      onAddItem({
        ...formData,
        status: 'hilang',
        id: Date.now(),
        image: selectedFile ? URL.createObjectURL(selectedFile) : null
      });
    }
    
    alert('Laporan berhasil dibuat!');
    navigate('/'); 
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 min-h-screen flex justify-center py-12 px-4" 
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="bg-white p-8 rounded-[20px] shadow-sm w-full max-w-2xl h-fit">
        
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
            
          {/* Nama Barang */}
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
              className="w-full bg-[#F8F9FA] px-4 py-3.5 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-[#263859] text-gray-600 placeholder-gray-400"
            />
          </div>

          {/* Tata Letak Ke Samping (Grid 2 Kolom) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kategori Barang */}
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
                  className="w-full bg-[#F8F9FA] px-4 py-3.5 rounded-[12px] text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#263859] text-gray-600 cursor-pointer"
                >
                  <option value="" disabled>Pilih Kategori</option>
                  <option value="elektronik">Elektronik</option>
                  <option value="dokumen">Dokumen</option>
                  <option value="pakaian">Pakaian</option>
                  <option value="lainnya">Lainnya</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <ChevronDown className="w-5 h-5 text-[#263859]" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Gedung Kehilangan Barang */}
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
                  className="w-full bg-transparent text-sm appearance-none focus:outline-none text-gray-600 cursor-pointer"
                >
                  <option value="Vokasi Veteran - Gedung BNI">Vokasi Veteran - Gedung BNI</option>
                  <option value="Vokasi Veteran - Gedung Perbankan">Vokasi Veteran - Gedung Perbankan</option>
                  <option value="Vokasi Dieng">Vokasi Dieng</option>
                </select>
                <ChevronDown className="w-5 h-5 text-[#263859] absolute right-4 pointer-events-none" strokeWidth={2.5} />
              </div>
            </div>

            {/* Lokasi Terakhir */}
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
                className="w-full bg-[#F8F9FA] px-4 py-3.5 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-[#263859] text-gray-600 placeholder-gray-400"
              />
            </div>

            {/* Tanggal Hilang */}
            <div>
              <label className="block text-[#263859] font-bold text-[15px] mb-2">
                Tanggal Hilang <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center bg-[#F8F9FA] rounded-[12px] px-4 py-3.5">
                <CalendarDays className="w-5 h-5 text-[#EBB134] mr-3" strokeWidth={2} />
                <input 
                  type="date"
                  name="tanggal"
                  required
                  value={formData.tanggal}
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm focus:outline-none text-gray-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Deskripsi */}
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
              className="w-full bg-[#F8F9FA] px-4 py-3.5 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-[#263859] text-gray-600 placeholder-gray-400 resize-none"
            ></textarea>
          </div>

          {/* Tombol Aksi */}
          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="w-1/2 bg-[#263859] hover:bg-[#1a263d] text-white font-semibold py-3.5 px-4 rounded-[12px] transition duration-200 text-[15px]"
            >
              Kembali ke beranda
            </button>
            <button 
              type="submit" 
              className="w-1/2 bg-[#EBB134] hover:bg-[#d19a28] text-white font-semibold py-3.5 px-4 rounded-[12px] transition duration-200 text-[15px]"
            >
              Lapor Kehilangan
            </button>
          </div>
          
        </form>
      </div>
    </motion.div>
  );
};

export default ReportPage;