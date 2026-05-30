import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import CardTemuan from '../components/CardTemuan';
import { IoSearch } from 'react-icons/io5';
import { motion } from 'framer-motion';

function FoundItemsPage() {
  const { data: items, loading, error } = useFetch('/barang');
  const [searchTerm, setSearchTerm] = useState('');
  
  const found = Array.isArray(items) ? items.filter(i => i.status === 'diunggah' || i.status === 'ditemukan') : [];
  
  const filteredItems = found.filter(item => 
    item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen font-['Montserrat'] text-[#273A5A] bg-slate-50/50 pb-24">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#fccb45] via-[#fbbf24] to-[#e2aa24] text-[#273A5A] py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#273A5A_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight"
          >
            Pusat Informasi <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">Barang Temuan</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm md:text-lg font-semibold opacity-85 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Temukan barang berhargamu yang telah diamankan oleh pihak Fakultas Vokasi Universitas Brawijaya.
          </motion.p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-[1200px] mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-[24px] shadow-xl shadow-[#273A5A]/5 border border-slate-100 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="bg-[#273A5A] text-white p-3.5 rounded-2xl shadow-lg shadow-[#273A5A]/15 shrink-0">
              <IoSearch size={22} className="stroke-[1.5]" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-[#273A5A]">Cari Barang Temuan</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 mt-1 rounded-full text-[10px] font-bold bg-[#FFF9EB] text-[#EBB134] border border-[#FCEABB]/50">
                {found.length} Total Ditemukan
              </span>
            </div>
          </div>
          
          <div className="relative w-full md:w-96 group">
            <IoSearch className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#273A5A] transition-colors duration-200" size={18} />
            <input 
              type="text" 
              placeholder="Masukkan nama barang..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#273A5A]/20 focus:border-[#273A5A] focus:bg-white transition-all duration-300 text-xs font-semibold placeholder:text-slate-400 text-[#273A5A]"
            />
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="max-w-[1200px] mx-auto px-4 mt-16">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white rounded-[32px] border border-slate-100 shadow-sm">
            <div className="w-12 h-12 border-4 border-[#fbbf24] border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold opacity-60 text-sm">Memuat data barang temuan...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-bold bg-red-50/50 rounded-[32px] p-8 border border-red-100">{error}</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[32px] border border-slate-100 shadow-sm">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-lg font-extrabold text-[#273A5A]">Barang Tidak Ditemukan</h3>
            <p className="opacity-60 text-xs mt-1 font-semibold">Coba kata kunci lain atau silakan kembali nanti.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.barang_id || item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04, duration: 0.3 }}
                className="w-full flex justify-center"
              >
                <CardTemuan item={item} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FoundItemsPage;