import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, X, Building2, Tag, ChevronRight, RotateCcw } from 'lucide-react';

const FilterBar = ({ onFilterChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State sekarang menyimpan dua nilai
  const [filters, setFilters] = useState({
    kategori: 'Semua',
    gedung: 'Semua'
  });

  const categories = ['Elektronik', 'Buku', 'Botol', 'Boneka', 'Dompet', 'Uang'];
  const buildings = [
    'Vokasi Veteran - Gedung BNI',
    'Vokasi Veteran - Gedung Perbankan',
    'Vokasi Dieng'
  ];

  // Fungsi untuk update salah satu filter tanpa menghapus yang lain
  const updateFilter = (type, value) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    onFilterChange(newFilters); // Kirim object {kategori, gedung} ke HomePage
  };

  const resetFilter = () => {
    const defaultFilters = { kategori: 'Semua', gedung: 'Semua' };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-5 py-8">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-[22px] font-bold text-[#273A5A]">Kategori</h2>
        {(filters.kategori !== 'Semua' || filters.gedung !== 'Semua') && (
          <button 
            onClick={resetFilter}
            className="flex items-center gap-1 text-xs font-bold text-red-500 hover:underline"
          >
            <RotateCcw size={14} /> Reset Filter
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap items-center gap-3">
        {/* Chips Kategori Barang */}
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => updateFilter('kategori', cat)}
            className={`px-6 py-2 rounded-full text-[14px] font-bold transition-all ${
              filters.kategori === cat 
              ? 'bg-[#273A5A] text-white shadow-md' 
              : 'bg-[#F3F4F6] text-[#273A5A] hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#FFF9EB] border border-[#FCEABB] text-[#EBB134] px-5 py-2 rounded-full font-bold text-[14px] hover:bg-[#FDEFCF] transition-all ml-auto"
        >
          <LayoutGrid size={18} />
          Pilih kategori
        </button>

        {/* Baris Gedung */}
        <div className="w-full flex flex-wrap gap-3 mt-1">
          {buildings.map((bld) => (
            <button
              key={bld}
              onClick={() => updateFilter('gedung', bld)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-[14px] font-bold transition-all ${
                filters.gedung === bld 
                ? 'bg-[#273A5A] text-white shadow-md' 
                : 'bg-[#F3F4F6] text-[#273A5A] hover:bg-gray-200'
              }`}
            >
              <Building2 size={16} className={filters.gedung === bld ? "text-white" : "text-[#EBB134]"} />
              {bld}
            </button>
          ))}
        </div>
      </div>

      {/* --- MODAL (Logikanya sama, menggunakan updateFilter) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="relative bg-white w-full max-w-5xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col z-[10000]">
              <div className="p-8 border-b flex justify-between items-center bg-white">
                <div className="flex gap-8">
                   <button className="text-[#EBB134] text-lg font-bold border-b-4 border-[#EBB134] pb-2">Barang & Lokasi</button>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-gray-100 hover:bg-red-50 hover:text-red-500 rounded-full transition-all">
                  <X size={28} strokeWidth={3} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto max-h-[70vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Bagian Barang */}
                  <div>
                    <p className="text-[13px] font-black text-gray-400 uppercase tracking-[3px] mb-6">Pilih Jenis Barang</p>
                    <div className="grid grid-cols-2 gap-3">
                      {['Semua', ...categories].map((item) => (
                        <button key={item} onClick={() => { updateFilter('kategori', item); setIsModalOpen(false); }} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${filters.kategori === item ? 'border-[#EBB134] bg-[#FFF9EB]' : 'border-gray-100 hover:bg-gray-50'}`}>
                          <div className="flex items-center gap-3">
                            <Tag size={18} className="text-[#EBB134]" />
                            <span className="font-bold text-[#273A5A] text-sm">{item}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Bagian Gedung */}
                  <div>
                    <p className="text-[13px] font-black text-gray-400 uppercase tracking-[3px] mb-6">Pilih Lokasi Gedung</p>
                    <div className="space-y-3">
                      {['Semua', ...buildings].map((bld) => (
                        <button key={bld} onClick={() => { updateFilter('gedung', bld); setIsModalOpen(false); }} className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${filters.gedung === bld ? 'border-[#EBB134] bg-[#FFF9EB]' : 'border-gray-100 hover:bg-gray-50'}`}>
                          <div className="flex items-center gap-4">
                            <Building2 size={20} className="text-[#EBB134]" />
                            <span className="font-bold text-[#273A5A] text-sm">{bld}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterBar;