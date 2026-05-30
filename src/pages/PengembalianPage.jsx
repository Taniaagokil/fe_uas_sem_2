import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoLocationSharp, IoCalendarClear } from 'react-icons/io5';
import { FaUsers, FaInfoCircle, FaClock } from 'react-icons/fa';
import useFetch from '../hooks/useFetch';
import './PengembalianPage.css';

function PengembalianPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: item, loading, error } = useFetch(`/barang/${id}`);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-['Montserrat'] bg-slate-50/50 text-[#273A5A] p-6">
        <div className="w-12 h-12 border-4 border-[#EBB134] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="font-bold opacity-75 text-sm">Memuat detail pengembalian...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-['Montserrat'] bg-slate-50/50 text-[#273A5A] p-6 text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-xl font-extrabold mb-2">Barang Tidak Ditemukan</h2>
        <p className="opacity-75 text-sm max-w-sm mb-6">Detail barang yang ingin dikembalikan tidak tersedia atau telah dihapus.</p>
        <button 
          onClick={() => navigate('/')} 
          className="bg-[#273A5A] text-white px-6 py-3 rounded-2xl font-bold text-xs shadow-lg hover:bg-[#1f2f4c] transition-all cursor-pointer border-none"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-['Montserrat'] text-[#273A5A] bg-slate-50/50 pb-20 pt-8 animate-fade-in">
      <div className="max-w-[1000px] mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#273A5A] transition-colors border-none bg-transparent cursor-pointer"
          >
            ← Kembali
          </button>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold mb-8 text-center tracking-tight text-[#273A5A]">
          Pengembalian <span className="text-[#EBB134] text-glow">Barang Hilang</span>
        </h1>

        <div className="bg-white rounded-[32px] shadow-xl shadow-[#273A5A]/5 overflow-hidden border border-slate-100/80">
          <div className="flex flex-col lg:flex-row">
            
            {/* Sisi Kiri: Foto Barang */}
            <div className="lg:w-1/2 h-[320px] sm:h-[400px] lg:h-[550px] relative overflow-hidden group bg-slate-100 shrink-0">
              <img 
                src={item.foto_barang ? `http://localhost:8000/storage/barang/${item.foto_barang}` : `https://via.placeholder.com/600x450?text=${item.nama_barang}`} 
                alt={item.nama_barang} 
                className="w-full h-full object-cover transition-transform duration-750 group-hover:scale-103"
              />
              <div className="absolute top-6 left-6 bg-[#C64747] text-white px-5 py-1.5 rounded-full text-[10px] font-bold shadow-lg uppercase tracking-wider">
                Barang Hilang
              </div>
            </div>

            {/* Sisi Kanan: Konten Informasi */}
            <div className="lg:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="bg-slate-100 text-[#273A5A] px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-slate-200/50">
                    {item.kategori?.nama_kategori || 'Kategori Umum'}
                  </span>
                  <span className="bg-[#273A5A] text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    Belum Ditemukan
                  </span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-6 leading-tight tracking-tight text-[#273A5A]">
                  {item.nama_barang}
                </h1>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#EBB134] border border-slate-100 shrink-0">
                      <HiOutlineOfficeBuilding size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Gedung / Lokasi Utama</p>
                      <span className="text-[#273A5A]">{item.laporan?.gedung?.nama_gedung || 'Vokasi Veteran'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#EBB134] border border-slate-100 shrink-0">
                      <IoLocationSharp size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Detail Lokasi</p>
                      <span className="text-[#273A5A]">{item.laporan?.lokasi_detail || 'Detail lokasi tidak tersedia'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#EBB134] border border-slate-100 shrink-0">
                      <IoCalendarClear size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Tanggal Dilaporkan</p>
                      <span className="text-[#273A5A]">{item.laporan?.tanggal_hilang || item.tanggal_lapor}</span>
                    </div>
                  </div>
                </div>

                {/* Deskripsi Barang */}
                <div className="mb-6">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Deskripsi dan Ciri-ciri</h3>
                  <p className="text-slate-600 text-xs sm:text-sm font-semibold leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100/80">
                    {item.deskripsi || "Tidak ada deskripsi tambahan."}
                  </p>
                </div>

                {/* Petunjuk Pengembalian ke Ruang Staff */}
                <div className="mb-8 bg-amber-50/40 border border-amber-200/40 rounded-2xl p-5">
                  <h3 className="text-xs sm:text-sm font-bold text-[#EBB134] uppercase tracking-wider mb-3">Petunjuk Pengembalian</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3.5 text-xs sm:text-sm font-medium text-slate-600">
                      <FaUsers className="text-[#EBB134] text-lg shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-[#273A5A] mb-0.5">Ruangan Staff Lost & Found</p>
                        <p className="text-slate-500 font-semibold">Gedung A, Lantai 1, Ruang 102 (Vokasi Veteran)</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 text-xs sm:text-sm font-medium text-slate-600">
                      <FaClock className="text-[#EBB134] text-lg shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-[#273A5A] mb-0.5">Jam Operasional Kerja</p>
                        <p className="text-slate-500 font-semibold">Senin - Jumat | 08:00 - 16:00 WIB</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 text-xs sm:text-sm font-medium text-slate-600">
                      <FaInfoCircle className="text-[#EBB134] text-lg shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-[#273A5A] mb-0.5">Instruksi Penting</p>
                        <p className="text-slate-500 font-semibold leading-relaxed">
                          Silakan bawa barang temuan ini langsung ke Ruang Staff. Petugas akan memproses verifikasi fisik, mencocokkan laporan kehilangan, dan memperbarui status barang di sistem agar pemilik dapat mengambilnya secara resmi.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tombol Aksi */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 shrink-0">
                <button 
                  onClick={() => navigate(-1)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-[#273A5A] font-extrabold py-4 px-6 rounded-2xl transition-all duration-200 text-xs cursor-pointer border-none text-center"
                >
                  Kembali ke Detail
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="flex-1 bg-[#273A5A] hover:bg-[#1a2944] text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-[#273A5A]/10 hover:shadow-xl hover:shadow-[#273A5A]/20 transition-all duration-300 text-xs cursor-pointer border-none text-center"
                >
                  Kembali ke Beranda
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PengembalianPage;