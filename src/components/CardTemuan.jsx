import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoLocationSharp, IoCalendarClear } from 'react-icons/io5';

function CardTemuan({ item, isNew }) {
  const themeColor = '#E2B053'; // Kuning gold
  const darkBlue = '#273A5A'; // Biru gelap

  return (
    <>
      <style>
        {`
          .card-temuan {
            transition: all 0.3s ease-in-out;
            cursor: pointer;
          }
          .card-temuan:hover {
            transform: translateY(-10px);
            box-shadow: 0 12px 25px rgba(39, 58, 90, 0.15) !important;
          }
          .card-temuan:hover .card-img-temuan {
            transform: scale(1.1);
          }
          .card-temuan:hover .detail-btn-temuan {
            background-color: #d19f42 !important; /* Kuning lebih gelap saat hover */
            box-shadow: 0 4px 12px rgba(226, 176, 83, 0.4) !important;
          }
        `}
      </style>

      <div className="card-temuan" style={{
        background: '#F8F9FA',
        borderRadius: '20px', 
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        fontFamily: "'Montserrat', sans-serif",
        padding: '10px', 
        maxWidth: '280px',
        position: 'relative'
      }}>
        
        {/* Label Baru Ditemukan (Opsional, muncul jika props isNew = true) */}
        {isNew && (
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            background: '#E74C3C', // Warna merah sesuai foto
            color: 'white',
            padding: '4px 12px',
            borderRadius: '12px 0 12px 0',
            fontSize: '10px',
            fontWeight: 'bold',
            zIndex: 10
          }}>
            Baru Ditemukan
          </div>
        )}

        {/* Container Gambar */}
        <div style={{ borderRadius: '16px', overflow: 'hidden', height: '150px', position: 'relative' }}>
          <img 
            className="card-img-temuan"
            src={item.foto || item.image || `https://via.placeholder.com/400x300?text=${item.nama}`} 
            alt={item.nama}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transition: 'transform 0.5s ease' 
            }}
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400x300?text=${item.nama}`
            }}
          />
        </div>

        {/* Info Content */}
        <div style={{ padding: '12px 6px 4px 6px' }}>
          {/* Badge Kategori */}
          <div style={{
            display: 'inline-block',
            background: darkBlue,
            color: 'white',
            padding: '4px 14px',
            borderRadius: '20px',
            fontSize: '11px', 
            fontWeight: '700',
            marginBottom: '8px'
          }}>
            {item.kategori}
          </div>

          {/* Nama Barang */}
          <h3 style={{ 
            margin: '0 0 10px 0', 
            fontSize: '16px', 
            fontWeight: '800', 
            color: darkBlue,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis' 
          }}>
            {item.nama}
          </h3>
          
          {/* Detail List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
            <div style={{...detailRowStyle, color: darkBlue}}>
              <HiOutlineOfficeBuilding style={{ color: themeColor, fontSize: '15px' }} />
              <span style={{ opacity: 0.8 }}>{item.lokasi || item.instansi || 'Vokasi Veteran'}</span>
            </div>
            <div style={{...detailRowStyle, color: darkBlue}}>
              <IoLocationSharp style={{ color: themeColor, fontSize: '15px' }} />
              <span style={{ opacity: 0.8 }}>{item.lokasiDetail || item.lokasi}</span>
            </div>
            <div style={{...detailRowStyle, color: darkBlue}}>
              <IoCalendarClear style={{ color: themeColor, fontSize: '15px' }} />
              <span style={{ opacity: 0.8 }}>{item.tanggal}</span>
            </div>
          </div>

          {/* Tombol Kuning - Lihat Detail */}
          <Link 
            to={`/barang/${item.id}`} 
            className="detail-btn-temuan"
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '10px',
              background: themeColor,
              color: 'white',
              textDecoration: 'none',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '14px', 
              transition: 'all 0.3s ease',
            }}
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </>
  );
}

const detailRowStyle = {
  display: 'flex', 
  alignItems: 'center', 
  gap: '8px', 
  fontSize: '11px', 
  fontWeight: '600'
};

export default CardTemuan;