import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './navbar.css';

function Navbar({ onOpenLogin }) {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 left-0 right-0 w-full z-50 transition-all duration-300 py-3 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm font-['Montserrat']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center shrink-0" onClick={() => setIsOpen(false)}>
          <img src="/src/img/vokasi.jpg" alt="Logo Vokasi" className="h-10 w-auto hover:opacity-90 transition-opacity rounded" />
        </Link>

        {/* Hamburger Menu Button */}
        <button 
          className="flex flex-col gap-1.5 md:hidden justify-center items-center w-10 h-10 rounded-lg hover:bg-slate-100/80 transition-all focus:outline-none border-none cursor-pointer"
          onClick={toggleMenu}
        >
          <span className={`w-6 h-0.5 bg-[#213349] transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[#213349] transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[#213349] transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
        </button>

        {/* Links and Actions */}
        <div className={`absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-6 shadow-xl transition-all duration-300 md:relative md:top-auto md:left-auto md:right-auto md:bg-transparent md:border-none md:p-0 md:flex-row md:items-center md:gap-8 md:shadow-none md:ml-auto ${isOpen ? 'flex' : 'hidden md:flex'}`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <Link 
              to="/" 
              className={`text-sm font-bold transition-all duration-200 px-3 py-2 rounded-lg ${isActive('/') ? 'text-amber-500 bg-amber-50/50 md:bg-transparent' : 'text-slate-700 hover:text-amber-500 hover:bg-slate-50 md:hover:bg-transparent'}`} 
              onClick={() => setIsOpen(false)}
            >
              Lihat Barang
            </Link>
            <Link 
              to="/lapor" 
              className={`text-sm font-bold transition-all duration-200 px-3 py-2 rounded-lg ${isActive('/lapor') ? 'text-amber-500 bg-amber-50/50 md:bg-transparent' : 'text-slate-700 hover:text-amber-500 hover:bg-slate-50 md:hover:bg-transparent'}`} 
              onClick={() => setIsOpen(false)}
            >
              Lapor Kehilangan
            </Link>
          </div>

          <div className="flex items-center gap-4 mt-2 md:mt-0 border-t border-slate-100 pt-4 md:border-t-0 md:pt-0">
            {user ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto">
                {user.role === 'staff' && (
                  <Link 
                    to="/staff/dashboard" 
                    className="bg-[#2D3E5E] hover:bg-[#1e2a40] text-white text-center text-sm font-bold px-5 py-2.5 rounded-full transition-all duration-300 shadow-md shadow-[#2D3E5E]/10 hover:shadow-lg whitespace-nowrap"
                  >
                    Dashboard Staff
                  </Link>
                )}
                <Link 
                  to="/profile" 
                  className="flex items-center justify-between md:justify-start gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-150 px-4 py-2 rounded-full transition-all duration-300 hover:shadow-sm w-full md:w-auto" 
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Profile Saya</span>
                    <span className="text-xs font-bold text-slate-800">{user.nama}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-base text-slate-600">👤</div>
                </Link>
              </div>
            ) : (
              <button 
                className="bg-amber-500 hover:bg-amber-600 text-white text-center text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-300 shadow-md shadow-amber-500/10 hover:shadow-lg hover:shadow-amber-500/20 w-full md:w-auto border-none cursor-pointer" 
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