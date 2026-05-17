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

  if (loading) return <div className="not-found-wrapper"><h2>Memuat...</h2></div>;
  if (error || !item) {
    return (
      <div className="not-found-wrapper">
        <h2>Ups! Detail barang tidak ditemukan.</h2>
        <button onClick={() => navigate('/')} className="btn-yellow-claim" style={{ width: 'auto', marginTop: '20px' }}>
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const themeColor = '#E2B053';
  const mainColor = '#273A5A';

  return (
    <div className="min-h-screen font-['Montserrat'] text-[#273A5A] pb-20 pt-10">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
          <div className="flex flex-col lg:flex-row">
            
            {/* Sisi Kiri: Foto Barang */}
            <div className="lg:w-1/2 h-[300px] md:h-[450px] lg:h-auto relative group">
              <img 
                src={item.foto_barang ? `http://localhost:8000/storage/barang/${item.foto_barang}` : `https://via.placeholder.com/600x450?text=${item.nama_barang}`} 
                alt={item.nama_barang} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6 bg-[#E2B053] text-white px-5 py-1.5 rounded-full text-[10px] font-bold shadow-lg uppercase tracking-wider">
                Barang Temuan
              </div>
            </div>

            {/* Sisi Kanan: Konten Informasi */}
            <div className="lg:w-1/2 p-6 md:p-10 lg:p-14 flex flex-col justify-between">
              <div>
                <div className="bg-[#273A5A] text-white inline-block px-4 py-1 rounded-full text-[11px] font-bold mb-6">
                  {item.kategori?.nama_kategori || 'Kategori Umum'}
                </div>
                
                <h1 className="text-2xl md:text-4xl font-extrabold mb-6 leading-tight">{item.nama_barang}</h1>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 text-sm md:text-base font-semibold">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#E2B053]">
                      <HiOutlineOfficeBuilding size={20} />
                    </div>
                    <span>{item.temuan?.gedung?.nama_gedung || 'Vokasi Veteran'}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm md:text-base font-semibold">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#E2B053]">
                      <IoLocationSharp size={20} />
                    </div>
                    <span>{item.temuan?.lokasi_ditemukan || item.temuan?.lokasi_detail || 'Detail lokasi tidak tersedia'}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm md:text-base font-semibold">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#E2B053]">
                      <IoCalendarClear size={20} />
                    </div>
                    <span>Ditemukan: {item.temuan?.tanggal_ditemukan || item.tanggal_lapor}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                  <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-3">Deskripsi & Ciri-ciri</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {item.deskripsi || `Sebuah ${item.nama_barang} ditemukan di area tersebut. Bagi yang merasa memiliki, silakan ajukan klaim untuk proses verifikasi.`}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button 
                  onClick={() => navigate('/')}
                  className="flex-1 bg-gray-100 text-[#273A5A] font-bold py-4 rounded-2xl hover:bg-gray-200 transition-all text-sm"
                >
                  Kembali
                </button>
                <button 
                  onClick={() => navigate(`/klaim/${item.temuan?.temuan_id}`)}
                  className="flex-1 bg-[#E2B053] text-white font-bold py-4 rounded-2xl shadow-xl shadow-[#E2B053]/20 hover:bg-[#d19f42] transition-all text-sm"
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
            <h2 className="text-xl md:text-2xl font-bold mb-8 text-center md:text-left">
              Barang yang mungkin kamu cari
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
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