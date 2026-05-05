import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineOfficeBuilding } from 'react-icons/hi'
import { IoLocationSharp, IoCalendarClear } from 'react-icons/io5'

function ItemCard({ item }) {
  const themeColor = '#E2B053' 
  const darkBlue = '#273A5A' // Font warna baru sesuai request kamu

  return (
    <>
      <style>
        {`
          .item-card {
            transition: all 0.3s ease-in-out;
            cursor: pointer;
          }
          .item-card:hover {
            transform: translateY(-10px); /* Kartu naik sedikit */
            box-shadow: 0 12px 25px rgba(39, 58, 90, 0.15) !important;
          }
          .item-card:hover .card-image {
            transform: scale(1.1); /* Gambar nge-zoom dikit */
          }
          .item-card:hover .detail-btn {
            background-color: #273A5A !important; /* Tombol ganti warna pas hover */
            box-shadow: 0 4px 12px rgba(39, 58, 90, 0.3) !important;
          }
        `}
      </style>

      <div className="item-card" style={{
        background: '#F8F9FA',
        borderRadius: '20px', 
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        fontFamily: "'Montserrat', sans-serif",
        padding: '10px', 
        maxWidth: '280px',
        position: 'relative'
      }}>
        
        {/* Container Gambar dengan Animasi Zoom */}
        <div style={{ borderRadius: '16px', overflow: 'hidden', height: '150px' }}>
          <img 
            className="card-image"
            src={item.foto} 
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
          
          {/* Detail List - Warna font sudah #273A5A */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
            <div style={{...detailRowStyle, color: darkBlue}}>
              <HiOutlineOfficeBuilding style={{ color: themeColor, fontSize: '15px' }} />
              <span style={{ opacity: 0.8 }}>{item.instansi || 'Vokasi Veteran'}</span>
            </div>
            <div style={{...detailRowStyle, color: darkBlue}}>
              <IoLocationSharp style={{ color: themeColor, fontSize: '15px' }} />
              <span style={{ opacity: 0.8 }}>{item.lokasi}</span>
            </div>
            <div style={{...detailRowStyle, color: darkBlue}}>
              <IoCalendarClear style={{ color: themeColor, fontSize: '15px' }} />
              <span style={{ opacity: 0.8 }}>{item.tanggal}</span>
            </div>
          </div>

          {/* Tombol Detail dengan Animasi Hover */}
          <Link 
            to={`/barang/${item.id}`} 
            className="detail-btn"
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
              boxShadow: `0 4px 8px ${themeColor}33`
            }}
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </>
  )
}

const detailRowStyle = {
  display: 'flex', 
  alignItems: 'center', 
  gap: '8px', 
  fontSize: '11px', 
  fontWeight: '600'
}

export default ItemCard