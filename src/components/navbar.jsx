import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import './navbar.css' // <--- PASTIKAN BARIS INI ADA



function Navbar({ user, onLogout }) {
  const location = useLocation()

  // Helper untuk mengecek path aktif
  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        {/* Logo - Sisi Kiri */}
        <Link to="/" className="navbar-logo">
          <img 
            src="/src/img/vokasi.jpg" 
            alt="Logo Vokasi" 
          />
        </Link>

        {/* Menu Navigasi - Sisi Tengah */}
        <div className="navbar-links">
          <Link to="/" className={isActive('/') ? 'active' : ''}>
            Lihat Barang
          </Link>
          <Link to="/lapor" className={isActive('/lapor') ? 'active' : ''}>
            Lapor kehilangan
          </Link>
        </div>

        {/* Tombol Auth - Sisi Kanan */}
        <div className="navbar-auth">
          {user ? (
            <div className="user-profile">
              <span className="user-name">👤 {user.nama}</span>
              <button onClick={onLogout} className="btn-logout">
                Keluar
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-login">
              Masuk
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar