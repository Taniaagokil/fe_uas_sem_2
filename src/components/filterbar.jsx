import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, X, Building2, Tag, ChevronRight, RotateCcw } from 'lucide-react';
import useFetch from '../hooks/useFetch';

const FilterBar = ({ onFilterChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State sekarang menyimpan dua nilai
  const [filters, setFilters] = useState({
    kategori: 'Semua',
    gedung: 'Semua'
  });

  const { data: categoriesData } = useFetch('/kategori');
  const { data: buildingsData } = useFetch('/gedung');

  const categories = Array.isArray(categoriesData) ? categoriesData.map(c => c.nama_kategori) : [];
  const buildings = Array.isArray(buildingsData) ? buildingsData.map(b => b.nama_gedung) : [];

  // Fungsi untuk update salah satu filter tanpa menghapus yang lain
  const updateFilter = (type, value) => {
    const newFilters = { ...filters, [type]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters); // Kirim object {kategori, gedung} ke HomePage
    }
  };

  const resetFilter = () => {
    const defaultFilters = { kategori: 'Semua', gedung: 'Semua' };
    setFilters(defaultFilters);
    if (onFilterChange) {
      onFilterChange(defaultFilters);
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 py-6 font-['Montserrat']">
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-extrabold text-[#273A5A] m-0">Filter Pencarian</h2>
          {(filters.kategori !== 'Semua' || filters.gedung !== 'Semua') && (
            <button 
              onClick={resetFilter}
              className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-650 transition-colors border-none bg-transparent cursor-pointer w-fit"
            >
              <RotateCcw size={14} /> Reset Filter
            </button>
          )}
        </div>
        
        <div className="flex flex-col gap-5">
          {/* Baris Kategori */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Kategori Barang</span>
            <div className="flex flex-wrap items-center gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => updateFilter('kategori', cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 border-none cursor-pointer ${
                    filters.kategori === cat 
                    ? 'bg-[#273A5A] text-white shadow-md shadow-[#273A5A]/10' 
                    : 'bg-[#F3F4F6] text-[#273A5A] hover:bg-slate-200/80'
                  }`}
                >
                  {cat}
                </button>
              ))}

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-[#FFF9EB] border border-[#FCEABB] text-[#EBB134] px-5 py-2.5 rounded-full font-bold text-xs hover:bg-[#FDEFCF] transition-all sm:ml-auto cursor-pointer"
              >
                <LayoutGrid size={15} />
                Pilih Kategori & Lokasi
              </button>
            </div>
          </div>

          {/* Baris Gedung */}
          <div className="flex flex-col gap-2.5 border-t border-slate-100 pt-4">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Lokasi Gedung</span>
            <div className="flex flex-wrap gap-2.5">
              {buildings.map((bld) => (
                <button
                  key={bld}
                  onClick={() => updateFilter('gedung', bld)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 border-none cursor-pointer ${
                    filters.gedung === bld 
                    ? 'bg-[#273A5A] text-white shadow-md shadow-[#273A5A]/10' 
                    : 'bg-[#F3F4F6] text-[#273A5A] hover:bg-slate-200/80'
                  }`}
                >
                  <Building2 size={14} className={filters.gedung === bld ? "text-white" : "text-[#EBB134]"} />
                  {bld}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="relative bg-white w-full max-w-4xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col z-[10000] max-h-[90vh]">
              <div className="p-6 sm:p-8 border-b flex justify-between items-center bg-white shrink-0">
                <h3 className="text-lg font-extrabold text-[#273A5A] m-0">Cari Berdasarkan Barang & Lokasi</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2.5 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-full border-none cursor-pointer transition-all">
                  <X size={20} strokeWidth={3} />
                </button>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  {/* Bagian Barang */}
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-4">Pilih Jenis Barang</p>
                    <div className="grid grid-cols-2 gap-3">
                      {['Semua', ...categories].map((item) => (
                        <button 
                          key={item} 
                          onClick={() => { updateFilter('kategori', item); setIsModalOpen(false); }} 
                          className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer text-left ${filters.kategori === item ? 'border-[#EBB134] bg-[#FFF9EB]' : 'border-slate-100 bg-white hover:bg-slate-50'}`}
                        >
                          <div className="flex items-center gap-3">
                            <Tag size={16} className="text-[#EBB134]" />
                            <span className="font-bold text-[#273A5A] text-xs">{item}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Bagian Gedung */}
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] mb-4">Pilih Lokasi Gedung</p>
                    <div className="space-y-3">
                      {['Semua', ...buildings].map((bld) => (
                        <button 
                          key={bld} 
                          onClick={() => { updateFilter('gedung', bld); setIsModalOpen(false); }} 
                          className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer text-left ${filters.gedung === bld ? 'border-[#EBB134] bg-[#FFF9EB]' : 'border-slate-100 bg-white hover:bg-slate-50'}`}
                        >
                          <div className="flex items-center gap-4">
                            <Building2 size={18} className="text-[#EBB134]" />
                            <span className="font-bold text-[#273A5A] text-xs">{bld}</span>
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