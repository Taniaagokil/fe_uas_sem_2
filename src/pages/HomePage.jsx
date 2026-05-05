import React from 'react'
import { Link } from 'react-router-dom'
import ItemCard from '../components/ItemCard'

function HomePage({ items }) {
  const lostItems = items.filter(item => item.status === 'lost').slice(0, 4)
  const foundItems = items.filter(item => item.status === 'found').slice(0, 4)

  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a, #2563eb)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '40px', marginBottom: '10px' }}>
          Selamat Datang di <span style={{ color: '#fbbf24' }}>VoksFind</span>
        </h1>
        <p style={{ fontSize: '18px', marginBottom: '30px' }}>
          Sistem Lost & Found Fakultas Vokasi UB
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <Link to="/lapor" style={{
            padding: '12px 30px',
            background: 'white',
            color: '#2563eb',
            textDecoration: 'none',
            borderRadius: '10px',
            fontWeight: 'bold'
          }}>
            Lapor Kehilangan
          </Link>
          <Link to="/barang-ditemukan" style={{
            padding: '12px 30px',
            background: 'transparent',
            color: 'white',
            border: '2px solid white',
            textDecoration: 'none',
            borderRadius: '10px',
            fontWeight: 'bold'
          }}>
            Cari Barang
          </Link>
        </div>
      </div>

      {/* Lost Items */}
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <h2>Barang Hilang</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {lostItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Found Items */}
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <h2>Barang Ditemukan</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {foundItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage