import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoLocationSharp, IoCalendarClear } from 'react-icons/io5';
import './HilangDetailPage.css'; // Pastikan path import benar

function HilangDetailPage({ items }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mencari item berdasarkan ID
  const item = items.find((i) => i.id === parseInt(id)) || items.find((i) => i.id === id);

  if (!item) {
    return <div style={{ padding: '100px', textAlign: 'center' }}>Barang tidak ditemukan.</div>;
  }

  return (
    <div className="detail-page-wrapper">
      {/* Judul Halaman */}
      <h2 className="detail-title">
        Pengembalian Barang <span>Hilang</span>
      </h2>

      <div className="detail-grid">
        
        {/* Sisi Kiri - Gambar */}
        <div className="image-container">
          <img 
            src={item.foto || item.image || "https://via.placeholder.com/600x450"} 
            alt={item.nama} 
          />
        </div>

        {/* Sisi Kanan - Info Detail */}
        <div>
          <div className="badge-container">
            <span className="badge-item">Belum ditemukan</span>
          </div>

          <h1 className="item-name">{item.nama}</h1>

          <div className="info-list">
            <div className="info-item">
              <HiOutlineOfficeBuilding className="info-icon" />
              <span>{item.lokasi || 'Vokasi Veteran - Gedung BNI'}</span>
            </div>
            <div className="info-item">
              <IoLocationSharp className="info-icon" />
              <span>{item.lokasiDetail || 'Meja Vokantin'}</span>
            </div>
            <div className="info-item">
              <IoCalendarClear className="info-icon" />
              <span>{item.tanggal}</span>
            </div>
          </div>

          <div className="description-section">
            <h4>Deskripsi dan ciri ciri</h4>
            <p className="description-text">
              {item.deskripsi || "Tidak ada deskripsi tambahan untuk barang ini."}
            </p>
          </div>

          <div className="action-buttons">
            <button className="btn-back" onClick={() => navigate(-1)}>
              Kembali ke beranda
            </button>
            <button 
            className="btn-return" 
            onClick={() => navigate(`/pengembalian/${item.id}`)}
            >
            Kembalikan Barang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HilangDetailPage;