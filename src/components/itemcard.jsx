import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoLocationSharp, IoCalendarClear } from 'react-icons/io5';

function ItemCard({ item }) {
  const navigate = useNavigate();
  const themeColor = '#E2B053'; 
  const darkBlue = '#273A5A'; 

  return (
    <div 
      className="group bg-[#F8F9FA] rounded-[24px] overflow-hidden p-3 relative flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-200/50 cursor-pointer border border-slate-100 max-w-[280px] w-full mx-auto font-['Montserrat']"
      onClick={() => navigate(`/barang-hilang/${item.barang_id}`)}
    >
      
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
          {/* Nama Barang */}
          <h3 className="text-base font-extrabold text-[#273A5A] mb-3 truncate leading-snug">
            {item.nama_barang}
          </h3>
          
          {/* Detail List */}
          <div className="flex flex-col gap-2.5 mb-5">
            <div className="flex items-center gap-2.5 text-[11px] font-semibold text-[#273A5A]/90">
              <HiOutlineOfficeBuilding className="text-sm shrink-0" style={{ color: themeColor }} />
              <span className="truncate opacity-80">{item.laporan?.gedung?.nama_gedung || 'Vokasi Veteran'}</span>
            </div>
            <div className="flex items-center gap-2.5 text-[11px] font-semibold text-[#273A5A]/90">
              <IoLocationSharp className="text-sm shrink-0" style={{ color: themeColor }} />
              <span className="truncate opacity-80">{item.laporan?.lokasi_detail || 'Detail tidak tersedia'}</span>
            </div>
            <div className="flex items-center gap-2.5 text-[11px] font-semibold text-[#273A5A]/90">
              <IoCalendarClear className="text-sm shrink-0" style={{ color: themeColor }} />
              <span className="truncate opacity-80">{item.laporan?.tanggal_hilang || item.tanggal_lapor}</span>
            </div>
          </div>
        </div>

        {/* Tombol Hubungi Staff */}
        <button 
          className="w-full py-2.5 bg-[#273A5A] group-hover:bg-[#1a2944] text-white text-xs font-bold rounded-xl transition-all duration-300 group-hover:shadow-md group-hover:shadow-[#273A5A]/20 border-none cursor-pointer text-center"
        >
          Hubungi Staff
        </button>
      </div>
    </div>
  );
}

export default ItemCard;