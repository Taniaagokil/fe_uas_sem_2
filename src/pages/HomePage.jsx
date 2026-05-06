import React from 'react';
import { Link } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import FilterBar from '../components/FilterBar';
import CardTemuan from '../components/CardTemuan';
import { IoSearch } from 'react-icons/io5';
import { HiOutlineClipboardList } from 'react-icons/hi';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import vokasiDieng from '../img/vokasi_dieng.jpg';
import vokasiKp from '../img/vokasi_kp.jpg';

function HomePage({ items }) {
  // Memisahkan item berdasarkan status
  const lostItems = items.filter(item => item.status === 'lost').slice(0, 4);
  const foundItems = items.filter(item => item.status === 'found').slice(0, 4);

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
      <div style={{ maxWidth: '1200px', margin: '-50px auto 20px auto', padding: '0 20px', position: 'relative', zIndex: 10 }}>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          style={{ borderRadius: '20px', height: '350px', overflow: 'hidden' }}
        >
          { [vokasiDieng, vokasiKp].map((img, index) => (
            <SwiperSlide key={index}>
              <div style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100%', position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(39, 58, 90, 0.75)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'white', padding: '20px' }}>
                  <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '10px' }}>Voks<span style={{ color: '#fbbf24' }}>Find</span></h1>
                  <p style={{ fontSize: '16px', maxWidth: '650px', lineHeight: '1.5', opacity: '0.9' }}>Tempat mencari dan melaporkan barang hilang di Fakultas Vokasi UB.</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <FilterBar />

      {/* 3. Section Barang Temuan (FOUND) - Menggunakan CardTemuan */}
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: mainColor, fontWeight: 700, fontSize: '22px' }}>
            Barang Temuan <span style={{ color: accentGold }}>Found</span>
          </h2>
          
          <div style={{ display: 'flex', alignItems: 'center', background: '#F3F4F6', borderRadius: '50px', padding: '6px 15px', width: '230px' }}>
            <IoSearch style={{ color: accentGold, fontSize: '18px', marginRight: '8px' }} />
            <input 
              type="text" 
              placeholder="Cari barang anda" 
              style={{ border: 'none', background: 'transparent', outline: 'none', fontFamily: "'Montserrat', sans-serif", fontWeight: 600, color: mainColor, fontSize: '12px', width: '100%' }} 
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {foundItems.map((item, index) => (
            // Menggunakan CardTemuan dengan prop isNew untuk item pertama
            <CardTemuan key={item.id} item={item} isNew={index === 0} />
          ))}
        </div>
      </div>

      {/* 4. Section Dicari Barang Hilang (LOST) - Menggunakan ItemCard */}
      <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: mainColor, fontWeight: 700, fontSize: '22px' }}>
            Dicari Barang Hilang <span style={{ color: accentGold }}>Lost</span>
          </h2>
          
          <Link to="/lapor" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: '#F3F4F6', 
            color: mainColor, 
            textDecoration: 'none', 
            padding: '6px 18px', 
            borderRadius: '50px', 
            fontSize: '12px', 
            fontWeight: 700 
          }}>
            <HiOutlineClipboardList style={{ color: accentGold, fontSize: '18px' }} />
            Lapor Kehilangan
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {lostItems.map(item => (
            // Menggunakan ItemCard untuk barang hilang
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;