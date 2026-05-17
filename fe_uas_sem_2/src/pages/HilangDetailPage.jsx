import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoLocationSharp, IoCalendarClear } from 'react-icons/io5';
import useFetch from '../hooks/useFetch';
import './HilangDetailPage.css';

function HilangDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: item, loading, error } = useFetch(`/barang/${id}`);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Memuat...</div>;
  if (error || !item) {
    return <div style={{ padding: '100px', textAlign: 'center' }}>Barang tidak ditemukan.</div>;
  }

  return (
    <div className="min-h-screen font-['Montserrat'] text-[#273A5A] pb-20 pt-10">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
          <div className="flex flex-col lg:flex-row">
            
            {/* Sisi Kiri: Foto Barang */}
            <div className="lg:w-1/2 h-[300px] md:h-[450px] lg:h-auto relative group">
              <img 
                src={item.foto_barang ? `http://localhost:8000/storage/barang/${item.foto_barang}` : "https://via.placeholder.com/600x450?text=No+Image"} 
                alt={item.nama_barang} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-6 left-6 bg-[#C64747] text-white px-5 py-1.5 rounded-full text-[10px] font-bold shadow-lg uppercase tracking-wider">
                Barang Hilang
              </div>
            </div>

            {/* Sisi Kanan: Konten Informasi */}
            <div className="lg:w-1/2 p-6 md:p-10 lg:p-14 flex flex-col justify-between">
              <div>
                <div className="bg-[#273A5A] text-white inline-block px-4 py-1 rounded-full text-[11px] font-bold mb-6 uppercase">
                  {item.status === 'belum_ditemukan' ? 'Belum Ditemukan' : item.status}
                </div>
                
                <h1 className="text-2xl md:text-4xl font-extrabold mb-6 leading-tight">{item.nama_barang}</h1>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 text-sm md:text-base font-semibold">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#E2B053]">
                      <HiOutlineOfficeBuilding size={20} />
                    </div>
                    <span>{item.laporan?.gedung?.nama_gedung || 'Vokasi Veteran'}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm md:text-base font-semibold">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#E2B053]">
                      <IoLocationSharp size={20} />
                    </div>
                    <span>{item.laporan?.lokasi_detail || 'Detail lokasi tidak tersedia'}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm md:text-base font-semibold">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#E2B053]">
                      <IoCalendarClear size={20} />
                    </div>
                    <span>Hilang Sejak: {item.laporan?.tanggal_hilang || item.tanggal_lapor}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                  <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-3">Deskripsi & Ciri-ciri</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {item.deskripsi || "Tidak ada deskripsi tambahan untuk barang ini."}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button 
                  onClick={() => navigate(-1)}
                  className="flex-1 bg-gray-100 text-[#273A5A] font-bold py-4 rounded-2xl hover:bg-gray-200 transition-all text-sm"
                >
                  Kembali
                </button>
                <button 
                  onClick={() => navigate(`/pengembalian/${item.barang_id}`)}
                  className="flex-1 bg-[#273A5A] text-white font-bold py-4 rounded-2xl shadow-xl shadow-[#273A5A]/20 hover:bg-[#1a2944] transition-all text-sm"
                >
                  Kembalikan Barang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HilangDetailPage;