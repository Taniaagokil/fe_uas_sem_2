import React from 'react'
import { Link } from 'react-router-dom'

function ItemCard({ item }) {
  // Warna badge sesuai status
  const statusColor = {
    lost: '#ef4444',      // Merah
    found: '#22c55e',     // Hijau
    claimed: '#eab308',   // Kuning
    returned: '#3b82f6'   // Biru
  }

  const statusText = {
    lost: 'Hilang',
    found: 'Ditemukan',
    claimed: 'Diklaim',
    returned: 'Dikembalikan'
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s'
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      {/* Gambar */}
      <div style={{ position: 'relative', height: '200px', background: '#e5e7eb' }}>
        <img 
          src={item.foto} 
          alt={item.nama}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x300?text=${item.nama}`
          }}
        />
        {/* Badge Status */}
        <span style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: statusColor[item.status],
          color: 'white',
          padding: '5px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {statusText[item.status]}
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: '15px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>
          {item.nama}
        </h3>
        
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
          📂 {item.kategori}
        </div>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
          📍 {item.lokasi}
        </div>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
          📅 {item.tanggal}
        </div>

        <Link to={`/barang/${item.id}`} style={{
          display: 'block',
          textAlign: 'center',
          padding: '10px',
          background: '#2563eb',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '8px',
          fontWeight: '500'
        }}>
          Lihat Detail
        </Link>
      </div>
    </div>
  )
}

export default ItemCard