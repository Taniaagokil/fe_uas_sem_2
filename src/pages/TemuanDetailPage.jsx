import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoLocationSharp, IoCalendarClear } from 'react-icons/io5';
import './TemuanDetailPage.css';

function TemuanDetailPage({ items }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mencari data item berdasarkan ID
  const item = items.find((target) => target.id.toString() === id.toString());

  if (!item) {
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

  return (
    <div className="temuan-detail-container animate-fade-in">
      <div className="temuan-detail-card">
        
        {/* Header Judul */}
        <h2 className="temuan-title-header">
          Barang Temuan <span className="text-yellow">Found</span>
        </h2>

        <div className="temuan-grid-layout">
          {/* Sisi Kiri: Foto Barang */}
          <div className="temuan-image-wrapper animate-slide-up">
            <img 
              src={item.foto || item.image || `https://via.placeholder.com/600x450?text=${item.nama}`} 
              alt={item.nama} 
              className="temuan-img-fluid"
            />
          </div>

          {/* Sisi Kanan: Konten Informasi */}
          <div className="temuan-info-wrapper animate-slide-up-delayed">
            <div className="temuan-badge-category">
              {item.kategori || 'Elektronik'}
            </div>
            
            <h1 className="temuan-item-name">{item.nama}</h1>

            <div className="temuan-meta-data">
              <div className="meta-item">
                <HiOutlineOfficeBuilding className="meta-icon-styled" style={{ color: themeColor }} />
                <span>{item.lokasi || 'Vokasi Veteran - Gedung BNI'}</span>
              </div>
              <div className="meta-item">
                <IoLocationSharp className="meta-icon-styled" style={{ color: themeColor }} />
                <span>{item.lokasiDetail || 'Meja Vokantin'}</span>
              </div>
              <div className="meta-item">
                <IoCalendarClear className="meta-icon-styled" style={{ color: themeColor }} />
                <span>{item.tanggal || '1 Desember 2025 14:40'}</span>
              </div>
            </div>

            <div className="temuan-description-box">
              <h3>Deskripsi dan ciri ciri</h3>
              <p>
                {item.deskripsi || `Sebuah ${item.nama} ditemukan di area tersebut. Bagi yang merasa memiliki, silakan klik tombol ajukan klaim di bawah untuk proses verifikasi lebih lanjut.`}
              </p>
            </div>

            {/* Tombol Navigasi & Aksi */}
            <div className="temuan-btn-group">
              <button className="btn-navy-back" onClick={() => navigate('/')}>
                Kembali ke beranda
              </button>
              <button 
  className="btn-yellow-claim" 
  onClick={() => navigate(`/klaim/${item.id}`)}
>
  Ajukan Klaim
</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemuanDetailPage;