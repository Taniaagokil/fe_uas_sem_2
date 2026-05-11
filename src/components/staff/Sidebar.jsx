import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react'; // Ambil icon logout saja
import './Sidebar.css';
import LogoVokasi from '../../img/vokasi.jpg';

const Sidebar = ({ activePage }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isKategoriOpen, setIsKategoriOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleDropdown = () => {
    setIsKategoriOpen(!isKategoriOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    navigate('/staff');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={LogoVokasi} alt="Fakultas Vokasi UB" />
      </div>
      
      <div className="sidebar-menu">
        <Link 
          to="/staff/dashboard" 
          className={`menu-item ${location.pathname === '/staff/dashboard' || activePage === 'dashboard' ? 'active' : ''}`}
        >
          Dashboard
        </Link>
        <Link 
          to="/staff/barang-temuan" 
          className={`menu-item ${location.pathname === '/staff/barang-temuan' || activePage === 'barang-temuan' ? 'active' : ''}`}
        >
          Barang Temuan
        </Link>
        <Link 
          to="/staff/barang-hilang" 
          className={`menu-item ${location.pathname === '/staff/barang-hilang' || activePage === 'barang-hilang' ? 'active' : ''}`}
        >
          Barang Hilang
        </Link>
        
        <div 
          className={`menu-item dropdown-toggle ${isKategoriOpen ? 'active' : ''}`} 
          onClick={toggleDropdown}
          style={{ cursor: 'pointer' }}
        >
          <span>Kelola Kategori</span>
          <span className="arrow">{isKategoriOpen ? '▴' : '▾'}</span>
        </div>

        {isKategoriOpen && (
          <div className="submenu">
            <Link 
              to="/staff/kategori/barang" 
              className={`submenu-item ${location.pathname === '/staff/kategori/barang' || activePage === 'kategori-barang' ? 'active-sub' : ''}`}
            >
              Barang
            </Link>
            <Link 
              to="/staff/kategori/gedung" 
              className={`submenu-item ${location.pathname === '/staff/kategori/gedung' || activePage === 'kategori-gedung' ? 'active-sub' : ''}`}
            >
              Gedung
            </Link>
          </div>
        )}
        
        <Link 
          to="/staff/laporan-klaim" 
          className={`menu-item ${location.pathname === '/staff/laporan-klaim' || activePage === 'laporan-klaim' ? 'active' : ''}`}
        >
          Laporan Klaim Barang
        </Link>
      </div>

      <div className="sidebar-footer">
  {/* POPUP LOGOUT (Hanya Teks & Icon) */}
  {isProfileOpen && (
    <div className="logout-popup-clean">
      <button onClick={handleLogout} className="logout-button-clean">
        <LogOut size={16} />
        <span>Keluar Akun</span>
      </button>
    </div>
  )}

  {/* KONTAINER PROFIL STAFF */}
  <div className="user-profile" onClick={toggleProfile} style={{ cursor: 'pointer' }}>
    <span className="user-icon">👤</span>
    <span className="user-name">Staff Vok Veteran</span>
  </div>
</div>
        </div>


  );
};

export default Sidebar;