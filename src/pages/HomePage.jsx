import React from 'react';
import { Link } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import FilterBar from '../components/FilterBar';
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
  const { data: items, loading, error } = useFetch('/barang');
  
  // Memisahkan item berdasarkan status
  // Note: Sesuaikan dengan status di database Laravel (enum)
  const lostItems = Array.isArray(items) ? items.filter(item => item.status === 'belum_ditemukan').slice(0, 4) : [];
  const foundItems = Array.isArray(items) ? items.filter(item => item.status === 'diunggah' || item.status === 'ditemukan').slice(0, 4) : [];

  // Warna utama konsisten #273A5A
  const mainColor = '#273A5A';
  const accentGold = '#E2B053';

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", color: mainColor }}>
      <style>
        {`
          .swiper-pagination-bullet { background: white !important; opacity: 0.5; }
          .swiper-pagination-bullet-active { background: white !important; opacity: 1; }
          input::placeholder { color: ${mainColor}; opacity: 0.6; }
        `}
      </style>

      {/* 1. Hero Section */}
      <div className="max-w-[1200px] mx-auto px-4 -mt-8 md:-mt-12 mb-6 relative z-10">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="rounded-3xl h-[250px] md:h-[350px] overflow-hidden shadow-xl"
        >
          { [vokasiDieng, vokasiKp].map((img, index) => (
            <SwiperSlide key={index}>
              <div 
                className="h-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${img})` }}
              >
                <div className="absolute inset-0 bg-[#273A5A]/75 flex flex-col justify-center items-center text-center text-white p-6">
                  <h1 className="text-3xl md:text-5xl font-bold mb-2">Voks<span className="text-[#fbbf24]">Find</span></h1>
                  <p className="text-sm md:text-base max-w-[600px] leading-relaxed opacity-90">Tempat mencari dan melaporkan barang hilang di Fakultas Vokasi UB.</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <FilterBar />

      {/* 3. Section Barang Temuan (FOUND) */}
      <div className="max-w-[1200px] mx-auto my-10 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-[#273A5A] font-bold text-xl md:text-2xl">
            Barang Temuan <span className="text-[#E2B053]">Found</span>
          </h2>
          
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full md:w-[250px] shadow-sm border border-gray-50">
            <IoSearch className="text-[#E2B053] text-lg mr-2" />
            <input 
              type="text" 
              placeholder="Cari barang anda" 
              className="bg-transparent border-none outline-none font-semibold text-[#273A5A] text-xs w-full" 
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center py-10 opacity-60">Memuat data...</p>
        ) : error ? (
          <p className="text-center py-10 text-red-500">{error}</p>
        ) : foundItems.length === 0 ? (
          <p className="text-center py-10 opacity-60">Tidak ada barang temuan terbaru.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {foundItems.map((item, index) => (
              <CardTemuan key={item.barang_id || item.id} item={item} isNew={index === 0} />
            ))}
          </div>
        )}
      </div>

      {/* 4. Section Dicari Barang Hilang (LOST) */}
      <div className="max-w-[1200px] mx-auto my-12 px-4 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-[#273A5A] font-bold text-xl md:text-2xl">
            Dicari Barang Hilang <span className="text-[#E2B053]">Lost</span>
          </h2>
          
          <Link to="/lapor" className="flex items-center gap-2 bg-[#273A5A] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-lg shadow-[#273A5A]/20 hover:bg-[#1a2944] transition-all">
            <HiOutlineClipboardList className="text-[#E2B053] text-lg" />
            Lapor Kehilangan
          </Link>
        </div>

        {loading ? (
          <p className="text-center py-10 opacity-60">Memuat data...</p>
        ) : error ? (
          <p className="text-center py-10 text-red-500">{error}</p>
        ) : lostItems.length === 0 ? (
          <p className="text-center py-10 opacity-60">Tidak ada laporan barang hilang terbaru.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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