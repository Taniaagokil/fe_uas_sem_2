import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ItemCard from '../components/itemcard';
import FilterBar from '../components/filterbar';
import CardTemuan from '../components/CardTemuan';
import { IoSearch } from 'react-icons/io5';
import { HiOutlineClipboardList } from 'react-icons/hi';
import useFetch from '../hooks/useFetch';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import vokasiDieng from '../img/vokasi_dieng.jpg';
import vokasiKp from '../img/vokasi_kp.jpg';

function HomePage() {
  const [selectedFilters, setSelectedFilters] = useState({
    kategori: 'Semua',
    gedung: 'Semua'
  });

  const handleFilterChange = (newFilters) => {
    setSelectedFilters(newFilters);
  };

  const buildUrl = () => {
    const params = [];
    if (selectedFilters.kategori && selectedFilters.kategori !== 'Semua') {
      params.push(`kategori=${encodeURIComponent(selectedFilters.kategori)}`);
    }
    if (selectedFilters.gedung && selectedFilters.gedung !== 'Semua') {
      params.push(`gedung=${encodeURIComponent(selectedFilters.gedung)}`);
    }
    return params.length > 0 ? `/barang?${params.join('&')}` : '/barang';
  };

  const { data: items, loading, error } = useFetch(buildUrl());
  
  // Memisahkan item berdasarkan status
  // Note: Sesuaikan dengan status di database Laravel (enum)
  const lostItems = Array.isArray(items) ? items.filter(item => item.status === 'belum_ditemukan').slice(0, 4) : [];
  const foundItems = Array.isArray(items) ? items.filter(item => item.status === 'diunggah' || item.status === 'ditemukan').slice(0, 4) : [];

  return (
    <div className="font-['Montserrat'] text-[#273A5A] min-h-screen bg-slate-50/50 pb-16">
      <style>
        {`
          .swiper-pagination-bullet { background: white !important; opacity: 0.5; transition: all 0.3s ease; }
          .swiper-pagination-bullet-active { background: #fbbf24 !important; opacity: 1; transform: scale(1.2); }
          input::placeholder { color: #273A5A; opacity: 0.5; }
        `}
      </style>

      {/* 1. Hero Section */}
      <div className="max-w-[1200px] mx-auto px-4 -mt-8 md:-mt-12 mb-8 relative z-10">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="rounded-3xl h-[280px] sm:h-[350px] md:h-[400px] overflow-hidden shadow-2xl shadow-[#273A5A]/10"
        >
          { [vokasiDieng, vokasiKp].map((img, index) => (
            <SwiperSlide key={index}>
              <div 
                className="h-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${img})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#273A5A]/95 via-[#273A5A]/80 to-[#273A5A]/45 flex flex-col justify-center items-center text-center text-white p-6 md:p-12">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-[#E2B053] text-[#273A5A] mb-3 uppercase tracking-wider shadow-sm">
                    Fakultas Vokasi UB
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-3 tracking-tight drop-shadow-md">
                    Voks<span className="text-[#fbbf24] text-glow">Find</span>
                  </h1>
                  <p className="text-xs sm:text-sm md:text-lg max-w-[620px] leading-relaxed opacity-90 px-4 font-medium">
                    Tempat mencari dan melaporkan barang hilang di lingkungan Fakultas Vokasi Universitas Brawijaya.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <FilterBar onFilterChange={handleFilterChange} />

      {/* 3. Section Barang Temuan (FOUND) */}
      <div className="max-w-[1200px] mx-auto my-12 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-[#273A5A] font-extrabold text-2xl md:text-3xl tracking-tight">
              Barang Temuan <span className="text-[#E2B053]">Found</span>
            </h2>
            <p className="text-xs text-slate-400 font-semibold mt-1">Barang yang telah ditemukan di lingkungan kampus</p>
          </div>
          
          <div className="flex items-center bg-white rounded-full px-4 py-2.5 w-full sm:w-[280px] shadow-sm border border-slate-100 focus-within:ring-2 focus-within:ring-[#E2B053]/30 focus-within:border-[#E2B053]/50 transition-all duration-300">
            <IoSearch className="text-[#E2B053] text-lg mr-2.5 shrink-0" />
            <input 
              type="text" 
              placeholder="Cari barang anda..." 
              className="bg-transparent border-none outline-none font-semibold text-[#273A5A] text-xs w-full placeholder:text-slate-400" 
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-[#E2B053] border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold opacity-60 text-sm">Memuat data barang...</p>
          </div>
        ) : error ? (
          <p className="text-center py-12 text-red-500 font-bold bg-red-50/50 rounded-2xl p-6 border border-red-150">{error}</p>
        ) : foundItems.length === 0 ? (
          <p className="text-center py-16 text-slate-400 bg-white rounded-3xl p-8 border border-slate-100 font-medium">Tidak ada barang temuan terbaru.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {foundItems.map((item, index) => (
              <CardTemuan key={item.barang_id || item.id} item={item} isNew={index === 0} />
            ))}
          </div>
        )}
      </div>

      {/* 4. Section Dicari Barang Hilang (LOST) */}
      <div className="max-w-[1200px] mx-auto my-12 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-[#273A5A] font-extrabold text-2xl md:text-3xl tracking-tight">
              Dicari Barang Hilang <span className="text-[#E2B053]">Lost</span>
            </h2>
            <p className="text-xs text-slate-400 font-semibold mt-1">Laporan barang hilang terbaru dari sivitas akademika</p>
          </div>
          
          <Link to="/lapor" className="flex items-center gap-2 bg-[#273A5A] text-white px-5 py-3 rounded-full text-xs font-bold shadow-lg shadow-[#273A5A]/15 hover:bg-[#1f2f4c] hover:shadow-xl hover:shadow-[#273A5A]/25 transition-all duration-300 cursor-pointer shrink-0">
            <HiOutlineClipboardList className="text-[#E2B053] text-lg" />
            Lapor Kehilangan
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-[#273A5A] border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold opacity-60 text-sm">Memuat data barang...</p>
          </div>
        ) : error ? (
          <p className="text-center py-12 text-red-500 font-bold bg-red-50/50 rounded-2xl p-6 border border-red-150">{error}</p>
        ) : lostItems.length === 0 ? (
          <p className="text-center py-16 text-slate-400 bg-white rounded-3xl p-8 border border-slate-100 font-medium">Tidak ada laporan barang hilang terbaru.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {lostItems.map(item => (
              <ItemCard key={item.barang_id || item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;