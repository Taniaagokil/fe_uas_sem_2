import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

function Navbar({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    
    <nav className="navbar-container">
      <div className="navbar-content">
        {/* Logo Sisi Kiri */}
        <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          <img src="/src/img/vokasi.jpg" alt="Logo Vokasi" />
        </Link>

        {/* Hamburger Icon (Hanya muncul di Mobile) */}
        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        {/* Wrapper Menu (Desktop: Ke Kanan | Mobile: Dropdown) */}
        <div className={`nav-menu-wrapper ${isOpen ? 'open' : ''}`}>
          <div className="navbar-links">
            <Link 
              to="/" 
              className={isActive('/') ? 'active' : ''} 
              onClick={() => setIsOpen(false)}
            >
              Lihat Barang
            </Link>
            <Link 
              to="/lapor" 
              className={isActive('/lapor') ? 'active' : ''} 
              onClick={() => setIsOpen(false)}
            >
              Lapor kehilangan
            </Link>
          </div>

          <div className="navbar-auth">
            {user ? (
              <div className="user-profile">
                <span className="user-name">👤 {user.nama}</span>
                <button 
                  onClick={() => { onLogout(); setIsOpen(false); }} 
                  className="btn-logout"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-login" onClick={() => setIsOpen(false)}>
                Masuk
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;