import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoLocationSharp, IoCalendarClear } from 'react-icons/io5';
import './CardTemuan.css';

function CardTemuan({ item, isNew }) {
  const themeColor = '#E2B053'; // Untuk warna icon yang dinamis

  return (
    <div className="group bg-[#F8F9FA] rounded-[24px] overflow-hidden p-3 relative flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-200/50 cursor-pointer border border-slate-100 max-w-[280px] w-full mx-auto font-['Montserrat']">
      
      {/* Label Baru Ditemukan */}
      {isNew && (
        <div className="absolute top-5 left-5 bg-red-500 text-white px-3 py-1 rounded-bl-xl rounded-tr-xl text-[10px] font-bold z-10 shadow-sm uppercase tracking-wider">
          Baru Ditemukan
        </div>
      )}

      {/* Container Gambar */}
      <div className="rounded-[20px] overflow-hidden h-[160px] relative">
        <img 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={item.foto_barang ? `http://localhost:8000/storage/barang/${item.foto_barang}` : `https://via.placeholder.com/400x300?text=${item.nama_barang}`} 
          alt={item.nama_barang}
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x300?text=${item.nama_barang}`
          }}
        />
      </div>

      {/* Info Content */}
      <div className="p-3 pt-4 flex-grow flex flex-col justify-between">
        <div>
          {/* Badge Kategori */}
          <div className="inline-block bg-[#273A5A] text-white px-3.5 py-1 rounded-full text-[10px] font-extrabold mb-3 w-fit tracking-wide">
            {item.kategori?.nama_kategori || item.kategori}
          </div>

          {/* Nama Barang */}
          <h3 className="text-base font-extrabold text-[#273A5A] mb-3 truncate leading-snug">
            {item.nama_barang}
          </h3>
          
          {/* Detail List */}
          <div className="flex flex-col gap-2.5 mb-5">
            <div className="flex items-center gap-2.5 text-[11px] font-semibold text-[#273A5A]/90">
              <HiOutlineOfficeBuilding className="text-sm shrink-0" style={{ color: themeColor }} />
              <span className="truncate opacity-80">{item.temuan?.gedung?.nama_gedung || item.lokasi || 'Vokasi Veteran'}</span>
            </div>
            <div className="flex items-center gap-2.5 text-[11px] font-semibold text-[#273A5A]/90">
              <IoLocationSharp className="text-sm shrink-0" style={{ color: themeColor }} />
              <span className="truncate opacity-80">{item.temuan?.lokasi_ditemukan || item.temuan?.lokasi_detail || item.lokasiDetail || 'Detail tidak tersedia'}</span>
            </div>
            <div className="flex items-center gap-2.5 text-[11px] font-semibold text-[#273A5A]/90">
              <IoCalendarClear className="text-sm shrink-0" style={{ color: themeColor }} />
              <span className="truncate opacity-80">{item.temuan?.tanggal_ditemukan || item.tanggal}</span>
            </div>
          </div>
        </div>

        {/* Tombol Kuning - Lihat Detail */}
        <Link to={`/barang/${item.barang_id}`} className="block text-center py-2.5 bg-[#E2B053] hover:bg-[#d19f42] text-white text-xs font-bold rounded-xl transition-all duration-300 group-hover:shadow-md group-hover:shadow-[#E2B053]/20 no-underline">
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}

export default CardTemuan;