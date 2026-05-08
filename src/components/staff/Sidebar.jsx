import React, { useState } from 'react'; // Import useState untuk dropdown
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import LogoVokasi from '../../img/vokasi.jpg'; // Pastikan path benar

// TAMBAHKAN { activePage } di dalam kurung parameter Sidebar
const Sidebar = ({ activePage }) => {
  const location = useLocation();
  // State untuk mengontrol apakah dropdown kategori terbuka atau tertutup
  const [isKategoriOpen, setIsKategoriOpen] = useState(false);

  // Fungsi untuk toggle dropdown
  const toggleDropdown = () => {
    setIsKategoriOpen(!isKategoriOpen);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img src={LogoVokasi} alt="Fakultas Vokasi UB" />
      </div>
      
      <div className="sidebar-menu">
        {/* MODIFIKASI KODE: Cek location.pathname ATAU activePage prop */}
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
        
        {/* Menu Dropdown Kelola Kategori */}
        <div 
          className={`menu-item dropdown-toggle ${isKategoriOpen ? 'active' : ''}`} 
          onClick={toggleDropdown}
          style={{ cursor: 'pointer' }}
        >
          <span>Kelola Kategori</span>
          <span className="arrow">{isKategoriOpen ? '▴' : '▾'}</span>
        </div>

        {/* Isi Dropdown (Hanya muncul jika isKategoriOpen bernilai true) */}
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
        <div className="user-profile">
          <span className="user-icon">👤</span>
          <span className="user-name">Staff Vok Veteran</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;