import React from 'react';
import { LayoutGrid, Building2 } from 'lucide-react';

const FilterBar = () => {
  const categories = ["Elektronik", "Buku", "Botol", "Boneka", "Dompet", "Uang"];
  const locations = [
    "Vokasi Veteran - Gedung BNI",
    "Vokasi Veteran - Gedung Perbankan",
    "Vokasi Dieng"
  ];

  const mainBlue = '#213349';

  return (
    <div className="w-full max-w-[1200px] mx-auto px-[20px] mt-10" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      
      {/* Judul Kategori Montserrat Bold */}
      <h2 className="text-2xl mb-6" style={{ color: mainBlue, fontWeight: 700 }}>
        Kategori
      </h2>

      {/* Baris Pertama: Kategori Umum */}
      <div className="flex items-center justify-between mb-4 w-full">
        {/* Grup List Kategori Kiri */}
        <div className="flex flex-wrap gap-3">
          {categories.map((item, index) => (
            <button
              key={index}
              className="px-6 py-2 bg-[#f3f4f6] hover:bg-slate-200 text-slate-700 rounded-full text-sm transition-colors"
              style={{ fontWeight: 600 }} // Semi-bold untuk item kategori
            >
              {item}
            </button>
          ))}
        </div>
        
        {/* Tombol Pilih Kategori ditarik ke paling kanan */}
        <button className="flex items-center gap-2 px-6 py-2 bg-[#fffbeb] text-[#d97706] rounded-full text-sm border border-[#fef3c7] hover:bg-[#fef3c7] transition-colors" style={{ fontWeight: 700 }}>
          <LayoutGrid size={18} className="fill-[#d97706]" />
          Pilih kategori
        </button>
      </div>

      {/* Baris Kedua: Lokasi */}
      <div className="flex flex-wrap gap-3">
        {locations.map((loc, index) => (
          <button
            key={index}
            className="flex items-center gap-2 px-5 py-2 bg-[#f3f4f6] hover:bg-slate-200 text-slate-700 rounded-full text-sm transition-colors"
            style={{ fontWeight: 600 }}
          >
            <Building2 size={18} className="text-[#f59e0b]" />
            {loc}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;