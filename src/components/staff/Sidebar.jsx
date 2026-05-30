import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, User, Home, ChevronDown } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';
import './Sidebar.css';
import LogoVokasi from '../../img/vokasi.jpg';

const Sidebar = ({ activePage }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  
  const [isKategoriOpen, setIsKategoriOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsKategoriOpen(!isKategoriOpen);
  };
 
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };
 
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
 
  const handleLogout = async () => {
    await logout();
    navigate('/staff');
  };
 
  return (
    <>
      {/* Hamburger Button for Mobile */}
      <button 
        className="fixed top-4 right-4 z-50 flex md:hidden flex-col gap-1.5 justify-center items-center w-12 h-12 bg-white text-[#263959] rounded-xl shadow-md border border-slate-200/80 cursor-pointer hover:bg-slate-50 transition-all"
        onClick={toggleMobileMenu}
      >
        <span className={`w-5 h-0.5 bg-[#263959] transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}></span>
        <span className={`w-5 h-0.5 bg-[#263959] transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`w-5 h-0.5 bg-[#263959] transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}></span>
      </button>

      {/* Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300" 
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Sidebar Drawer */}
      <div className={`fixed inset-y-0 left-0 z-45 w-72 bg-slate-50/80 backdrop-blur-lg border-r border-slate-200/80 text-[#263959] flex flex-col justify-between p-6 shadow-lg transition-transform duration-300 md:translate-x-0 md:static md:h-screen md:sticky md:top-0 font-['Montserrat'] ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        <div className="flex flex-col gap-8">
          {/* Logo Container */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
            <img src={LogoVokasi} alt="Fakultas Vokasi UB" className="h-12 w-auto object-contain" />
          </div>
          
          {/* Menu Items */}
          <div className="flex flex-col gap-2">
            <Link 
              to="/" 
              className="flex items-center gap-3 px-5 py-3.5 rounded-xl text-base font-bold text-slate-500 hover:text-[#263959] hover:bg-slate-200/50 transition-all duration-200 no-underline"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home size={18} className="stroke-[2.5]" />
              <span>Halaman Utama</span>
            </Link>
            
            <div className="h-px bg-slate-200/60 my-1 mx-2"></div>

            <Link 
              to="/staff/dashboard" 
              className={`flex items-center px-5 py-3.5 rounded-xl text-base font-bold transition-all duration-200 no-underline ${location.pathname === '/staff/dashboard' || activePage === 'dashboard' ? 'text-slate-900 bg-amber-400 shadow-md shadow-amber-400/20 hover:bg-amber-300' : 'text-slate-500 hover:text-[#263959] hover:bg-slate-200/50'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/staff/barang-temuan" 
              className={`flex items-center px-5 py-3.5 rounded-xl text-base font-bold transition-all duration-200 no-underline ${location.pathname === '/staff/barang-temuan' || activePage === 'barang-temuan' ? 'text-slate-900 bg-amber-400 shadow-md shadow-amber-400/20 hover:bg-amber-300' : 'text-slate-500 hover:text-[#263959] hover:bg-slate-200/50'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Barang Temuan
            </Link>
            <Link 
              to="/staff/barang-hilang" 
              className={`flex items-center px-5 py-3.5 rounded-xl text-base font-bold transition-all duration-200 no-underline ${location.pathname === '/staff/barang-hilang' || activePage === 'barang-hilang' ? 'text-slate-900 bg-amber-400 shadow-md shadow-amber-400/20 hover:bg-amber-300' : 'text-slate-500 hover:text-[#263959] hover:bg-slate-200/50'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Barang Hilang
            </Link>
            
            {/* Dropdown Toggle */}
            <div 
              className={`flex items-center justify-between px-5 py-3.5 rounded-xl text-base font-bold transition-all duration-200 cursor-pointer ${isKategoriOpen ? 'text-[#263959] bg-slate-200/50' : 'text-slate-500 hover:text-[#263959] hover:bg-slate-200/50'}`} 
              onClick={toggleDropdown}
            >
              <span>Kelola Kategori</span>
              <span className="text-xs transition-transform duration-200">{isKategoriOpen ? '▴' : '▾'}</span>
            </div>

            {/* Submenu Dropdown */}
            {isKategoriOpen && (
              <div className="flex flex-col gap-1.5 pl-8 mt-1 animate-in slide-in-from-top-2 duration-200">
                <Link 
                  to="/staff/kategori/barang" 
                  className={`flex items-center px-5 py-3 rounded-lg text-sm font-bold transition-all duration-200 no-underline ${location.pathname === '/staff/kategori/barang' || activePage === 'kategori-barang' ? 'text-amber-600 bg-amber-400/20 font-bold' : 'text-slate-500 hover:text-[#263959] hover:bg-slate-200/30'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Barang
                </Link>
                <Link 
                  to="/staff/kategori/gedung" 
                  className={`flex items-center px-5 py-3 rounded-lg text-sm font-bold transition-all duration-200 no-underline ${location.pathname === '/staff/kategori/gedung' || activePage === 'kategori-gedung' ? 'text-amber-600 bg-amber-400/20 font-bold' : 'text-slate-500 hover:text-[#263959] hover:bg-slate-200/30'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Gedung
                </Link>
              </div>
            )}
            
            <Link 
              to="/staff/laporan-klaim" 
              className={`flex items-center px-5 py-3.5 rounded-xl text-base font-bold transition-all duration-200 no-underline ${location.pathname === '/staff/laporan-klaim' || activePage === 'laporan-klaim' ? 'text-slate-900 bg-amber-400 shadow-md shadow-amber-400/20 hover:bg-amber-300' : 'text-slate-500 hover:text-[#263959] hover:bg-slate-200/50'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Laporan Klaim Barang
            </Link>
          </div>
        </div>

        {/* Sidebar Footer (Profile and Logout) */}
        <div className="border-t border-slate-200/60 pt-6 mt-auto relative flex flex-col gap-3">
          {/* Logout Popup */}
          {isProfileOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-3 bg-white border border-slate-200 p-2 rounded-2xl shadow-xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <button onClick={handleLogout} className="flex items-center gap-2.5 w-full px-4 py-3 rounded-lg text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all border-none bg-transparent cursor-pointer text-left">
                <LogOut size={18} />
                <span>Keluar Akun</span>
              </button>
            </div>
          )}

          {/* User Profile Card */}
          <div 
            className={`flex items-center justify-between bg-white border border-slate-200 hover:border-amber-400 hover:bg-slate-100/50 px-4 py-3 rounded-2xl transition-all duration-200 cursor-pointer ${isProfileOpen ? 'ring-2 ring-amber-400/35 border-amber-400' : ''}`} 
            onClick={toggleProfile}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-[#263959]/10 text-[#263959] flex items-center justify-center shrink-0">
                <User size={20} className="stroke-[2.5]" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider leading-none mb-1">Aktivitas Akun</span>
                <span className="text-sm font-extrabold text-[#263959] truncate max-w-[140px] leading-tight">{user?.nama || 'Staff Vok Veteran'}</span>
              </div>
            </div>
            <ChevronDown size={18} className={`text-slate-400 transition-transform duration-200 flex-shrink-0 ${isProfileOpen ? 'rotate-180 text-amber-500' : ''}`} />
          </div>
        </div>

      </div>
    </>
  );
};

export default Sidebar;