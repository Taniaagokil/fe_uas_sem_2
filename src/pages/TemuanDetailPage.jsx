import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoLocationSharp, IoCalendarClear } from 'react-icons/io5';
import CardTemuan from '../components/CardTemuan';
import useFetch from '../hooks/useFetch';
import './TemuanDetailPage.css';

function TemuanDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: item, loading, error } = useFetch(`/barang/${id}`);
  const { data: allItems } = useFetch('/barang');
  
  const otherItems = Array.isArray(allItems) 
    ? allItems.filter(i => i.status === 'diunggah' && i.barang_id.toString() !== id.toString()).slice(0, 4) 
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-['Montserrat'] bg-slate-50/50 text-[#273A5A] p-6">
        <div className="w-12 h-12 border-4 border-[#E2B053] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-bold opacity-75 text-sm">Memuat detail barang...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-['Montserrat'] bg-slate-50/50 text-[#273A5A] p-6 text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-extrabold mb-2">Barang Tidak Ditemukan</h2>
        <p className="opacity-75 text-sm max-w-sm mb-6">Detail barang temuan yang Anda cari tidak tersedia.</p>
        <button 
          onClick={() => navigate('/')} 
          className="bg-[#273A5A] text-white px-6 py-3 rounded-2xl font-bold text-xs shadow-lg hover:bg-[#1f2f4c] transition-all cursor-pointer"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-['Montserrat'] text-[#273A5A] bg-slate-50/50 pb-20 pt-8">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Breadcrumb / Back Link */}
        <div className="mb-6">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#273A5A] transition-colors border-none bg-transparent cursor-pointer"
          >
            ← Kembali ke Beranda
          </button>
        </div>

        <div className="bg-white rounded-[32px] shadow-xl shadow-[#273A5A]/5 overflow-hidden border border-slate-100/80">
          <div className="flex flex-col lg:flex-row">
            
            {/* Sisi Kiri: Foto Barang */}
            <div className="lg:w-1/2 h-[320px] sm:h-[400px] lg:h-[550px] relative overflow-hidden group bg-slate-100">
              <img 
                src={item.foto_barang ? `http://localhost:8000/storage/barang/${item.foto_barang}` : `https://via.placeholder.com/600x450?text=${item.nama_barang}`} 
                alt={item.nama_barang} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute top-6 left-6 bg-[#E2B053] text-white px-5 py-1.5 rounded-full text-[10px] font-bold shadow-lg uppercase tracking-wider">
                Barang Temuan
              </div>
            </div>

            {/* Sisi Kanan: Konten Informasi */}
            <div className="lg:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="bg-slate-100 text-[#273A5A] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-slate-200/50">
                    {item.kategori?.nama_kategori || 'Kategori Umum'}
                  </span>
                  <span className="bg-[#FFF9EB] text-[#EBB134] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-[#FCEABB]/50">
                    Amankan
                  </span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 leading-tight tracking-tight text-[#273A5A]">
                  {item.nama_barang}
                </h1>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#E2B053] border border-slate-100 shrink-0">
                      <HiOutlineOfficeBuilding size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Gedung Penemuan</p>
                      <span className="text-[#273A5A]">{item.temuan?.gedung?.nama_gedung || 'Vokasi Veteran'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#E2B053] border border-slate-100 shrink-0">
                      <IoLocationSharp size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Detail Lokasi Ditemukan</p>
                      <span className="text-[#273A5A]">{item.temuan?.lokasi_ditemukan || item.temuan?.lokasi_detail || 'Detail lokasi tidak tersedia'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#E2B053] border border-slate-100 shrink-0">
                      <IoCalendarClear size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Tanggal Ditemukan</p>
                      <span className="text-[#273A5A]">{item.temuan?.tanggal_ditemukan || item.tanggal_lapor}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50/70 rounded-2xl p-5 mb-8 border border-slate-100/80">
                  <h3 className="font-bold text-[10px] uppercase tracking-widest text-slate-400 mb-2">Deskripsi & Ciri-ciri</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    {item.deskripsi || `Sebuah ${item.nama_barang} ditemukan di area tersebut. Bagi yang merasa memiliki, silakan ajukan klaim untuk proses verifikasi.`}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-4 shrink-0">
                <button 
                  onClick={() => navigate('/')}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-[#273A5A] font-extrabold py-3.5 px-6 rounded-2xl transition-all duration-200 text-xs cursor-pointer border-none"
                >
                  Kembali
                </button>
                <button 
                  onClick={() => navigate(`/klaim/${item.temuan?.temuan_id}`)}
                  className="flex-1 bg-[#E2B053] hover:bg-[#d19f42] text-white font-extrabold py-3.5 px-6 rounded-2xl shadow-lg shadow-[#E2B053]/10 hover:shadow-xl hover:shadow-[#E2B053]/20 transition-all duration-300 text-xs cursor-pointer border-none"
                >
                  Ajukan Klaim
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Rekomendasi */}
        {otherItems.length > 0 && (
          <div className="mt-16">
            <div className="border-b border-slate-100 pb-4 mb-8">
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-[#273A5A] text-center md:text-left">
                Barang yang mungkin Anda cari
              </h2>
              <p className="text-xs text-slate-400 font-semibold mt-1 text-center md:text-left">Barang temuan serupa di area kampus</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {otherItems.map((otherItem, index) => (
                <CardTemuan key={otherItem.barang_id} item={otherItem} isNew={index === 0} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TemuanDetailPage;