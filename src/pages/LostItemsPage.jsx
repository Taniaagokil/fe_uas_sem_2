import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import ItemCard from '../components/ItemCard';
import { IoSearch } from 'react-icons/io5';
import { motion } from 'framer-motion';

function LostItemsPage() {
  const { data: items, loading, error } = useFetch('/barang');
  const [searchTerm, setSearchTerm] = useState('');
  
  const lost = Array.isArray(items) ? items.filter(i => i.status === 'belum_ditemukan') : [];
  
  const filteredItems = lost.filter(item => 
    item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen font-['Montserrat'] text-[#273A5A] pb-20">
      {/* Header Section */}
      <div className="bg-[#273A5A] text-white py-16 px-4">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Pusat Informasi <span className="text-[#fbbf24]">Barang Hilang</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-lg opacity-80 max-w-2xl mx-auto"
          >
            Bantu teman-teman kita menemukan barang mereka yang hilang di area kampus.
          </motion.p>
        </div>
      </div>

      {/* Search & Stats Bar */}
      <div className="max-w-[1200px] mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#fbbf24] text-white p-3 rounded-xl shadow-lg shadow-[#fbbf24]/20">
              <IoSearch size={24} />
            </div>
            <div>
              <h3 className="font-bold text-sm">Cari Laporan</h3>
              <p className="text-[10px] text-gray-400 font-semibold">{lost.length} Total Laporan</p>
            </div>
          </div>
          
          <div className="relative w-full md:w-96 group">
            <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#fbbf24] transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Masukkan nama barang..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#fbbf24] transition-all text-sm font-medium"
            />
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="max-w-[1200px] mx-auto px-4 mt-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-[#273A5A] border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold opacity-60">Memuat data barang hilang...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-bold">{error}</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold">Laporan tidak ditemukan</h3>
            <p className="opacity-60 text-sm">Coba kata kunci lain atau cek kembali nanti.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.barang_id || item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <ItemCard item={item} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default LostItemsPage;