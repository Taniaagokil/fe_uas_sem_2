import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar({ user, onLogout }) {
  const location = useLocation()

  // Style untuk link aktif
  const linkStyle = (path) => ({
    padding: '8px 16px',
    textDecoration: 'none',
    color: location.pathname === path ? 'white' : '#333',
    background: location.pathname === path ? '#2563eb' : 'transparent',
    borderRadius: '8px',
    fontWeight: '500'
  })

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'white',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 1000,
      padding: '0 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '70px'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img 
            src="/src/img/vokasi.jpg" 
            alt="Logo Vokasi" 
            style={{
              height: '50px',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </Link>

        {/* Menu */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Link to="/" style={linkStyle('/')}>Beranda</Link>
          <Link to="/barang-hilang" style={linkStyle('/barang-hilang')}>Barang Hilang</Link>
          <Link to="/barang-ditemukan" style={linkStyle('/barang-ditemukan')}>Barang Ditemukan</Link>
          <Link to="/lapor" style={linkStyle('/lapor')}>Lapor</Link>
          
          {/* Tombol Login/Logout */}
          {user ? (
            <>
              <span style={{ fontSize: '14px', color: '#666' }}>
                👤 {user.nama}
              </span>
              <button 
                onClick={onLogout}
                style={{
                  padding: '8px 16px',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" style={linkStyle('/login')}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar