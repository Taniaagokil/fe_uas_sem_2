import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoLocationSharp, IoCalendarClear } from 'react-icons/io5';
import useFetch from '../hooks/useFetch';
import axiosClient from '../api/axiosClient';
import './PengembalianPage.css';

function PengembalianPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: item, loading, error } = useFetch(`/barang/${id}`);

  const handleKembalikan = async () => {
    if (!window.confirm('Apakah barang sudah dikembalikan kepada pemiliknya?')) return;
    setIsSubmitting(true);
    try {
      await axiosClient.put(`/admin/barang/${id}/status`, { status: 'dikembalikan' });
      alert('Status barang berhasil diperbarui menjadi dikembalikan.');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal memperbarui status barang.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}><h2>Memuat...</h2></div>;
  if (error || !item) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', fontFamily: "'Montserrat', sans-serif" }}>
        <h2>Ups! Data tidak ditemukan.</h2>
        <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#E2B053', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const themeColor = '#E2B053';
  const mainColor = '#273A5A';

  return (
    <div className="pengembalian-wrapper animate-fade-in" style={{ padding: '40px 20px', fontFamily: "'Montserrat', sans-serif", backgroundColor: '#ffffff', minHeight: '80vh', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: '1000px', width: '100%', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Header Judul */}
        <h2 style={{ color: mainColor, fontSize: '26px', fontWeight: 'bold', margin: '0 0 10px 0', textAlign: 'left' }}>
          Pengembalian Barang <span style={{ color: themeColor }}>Hilang</span>
        </h2>

        {/* Card Main */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 450px) 1fr', gap: '40px', alignItems: 'stretch' }}>
          
          {/* Sisi Kiri: Foto Barang */}
          <div style={{ width: '100%', height: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
            <img 
              src={item.foto_barang ? `http://localhost:8000/storage/barang/${item.foto_barang}` : `https://via.placeholder.com/600x450?text=${item.nama_barang}`} 
              alt={item.nama_barang} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Sisi Kanan: Konten Informasi */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '10px 0' }}>
            <div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                <div style={{ backgroundColor: mainColor, color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
                  {item.kategori?.nama_kategori || 'Elektronik'}
                </div>
                <div style={{ backgroundColor: mainColor, color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
                  Belum ditemukan
                </div>
              </div>
              
              <h1 style={{ color: mainColor, fontSize: '28px', fontWeight: 'bold', marginBottom: '15px' }}>{item.nama_barang}</h1>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: mainColor, fontWeight: '600', fontSize: '14px' }}>
                  <HiOutlineOfficeBuilding style={{ color: themeColor, fontSize: '20px', marginRight: '10px' }} />
                  <span>{item.laporan?.gedung?.nama_gedung || 'Vokasi Veteran'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: mainColor, fontWeight: '600', fontSize: '14px' }}>
                  <IoLocationSharp style={{ color: themeColor, fontSize: '20px', marginRight: '10px' }} />
                  <span>{item.laporan?.lokasi_detail || 'Detail tidak tersedia'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: mainColor, fontWeight: '600', fontSize: '14px' }}>
                  <IoCalendarClear style={{ color: themeColor, fontSize: '20px', marginRight: '10px' }} />
                  <span>{item.laporan?.tanggal_hilang || item.tanggal_lapor}</span>
                </div>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ color: mainColor, fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Deskripsi dan ciri ciri</h3>
                <p style={{ color: '#4B5563', fontSize: '14px', lineHeight: '1.6' }}>
                  {item.deskripsi || "Tidak ada deskripsi tambahan."}
                </p>
              </div>
            </div>

            {/* Tombol Navigasi & Aksi */}
            <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
              <button 
                onClick={() => navigate('/')}
                style={{ width: '100%', padding: '14px', backgroundColor: mainColor, color: 'white', borderRadius: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s' }}
              >
                Kembali ke beranda
              </button>
              <button 
                onClick={handleKembalikan}
                disabled={isSubmitting}
                style={{ width: '100%', padding: '14px', backgroundColor: themeColor, color: 'white', borderRadius: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'background-color 0.2s', opacity: isSubmitting ? 0.6 : 1 }}
              >
                {isSubmitting ? 'Memproses...' : 'Kembalikan Barang'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PengembalianPage;