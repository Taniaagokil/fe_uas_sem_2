import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Tambah AnimatePresence
import { useNavigate } from 'react-router-dom';
import { UploadCloud, ChevronDown, Building, CalendarDays, Check } from 'lucide-react'; // Tambah Check

const ReportPage = ({ onAddItem }) => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false); // State untuk modal
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
    
    // Tampilkan animasi sukses
    setIsSubmitted(true);

    // Otomatis pindah halaman setelah 2.5 detik
    setTimeout(() => {
      navigate('/'); 
    }, 2500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 min-h-screen flex justify-center py-12 px-4 relative" 
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
          {/* Form fields tetap sama seperti sebelumnya... */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
               className="w-full bg-[#F8F9FA] px-4 py-3.5 rounded-[12px] text-sm focus:outline-none focus:ring-2 focus:ring-[#263859] text-gray-600 placeholder-gray-400 resize-none"
             ></textarea>
           </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="w-1/2 bg-[#263859] hover:bg-[#1a263d] text-white font-semibold py-3.5 px-4 rounded-[12px] transition duration-200 text-[15px]"
            >
              Kembali
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