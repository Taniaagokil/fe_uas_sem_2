import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

function Navbar({ user, onOpenLogin }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          <img src="/src/img/vokasi.jpg" alt="Logo Vokasi" />
        </Link>

        <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className={`nav-menu-wrapper ${isOpen ? 'open' : ''}`}>
          <div className="navbar-links">
            <Link to="/" className={isActive('/') ? 'active' : ''} onClick={() => setIsOpen(false)}>
              Lihat Barang
            </Link>
            <Link to="/lapor" className={isActive('/lapor') ? 'active' : ''} onClick={() => setIsOpen(false)}>
              Lapor kehilangan
            </Link>
          </div>

          <div className="navbar-auth">
            {user ? (
              <Link to="/profile" className="btn-profile-nav" onClick={() => setIsOpen(false)}>
                <div className="profile-info-wrapper">
                  <span className="profile-label">Profile Saya</span>
                  <span className="profile-user-name">{user.nama}</span>
                </div>
                <div className="profile-icon-nav">👤</div>
              </Link>
            ) : (
              <button 
                className="btn-login" 
                onClick={() => { onOpenLogin(); setIsOpen(false); }}
              >
                Masuk
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;