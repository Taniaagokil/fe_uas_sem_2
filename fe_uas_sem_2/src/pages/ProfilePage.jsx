import React, { useContext } from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../contexts/AuthContext';
import './ProfilePage.css';

function ProfilePage() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleLogoutAction = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen font-['Montserrat'] text-[#273A5A] pb-20 pt-10 bg-gray-50 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 w-full max-w-lg"
      >
        {/* Header Profil */}
        <div className="bg-[#273A5A] p-10 text-center relative overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 bg-[#EBB134] rounded-[30px] flex items-center justify-center text-3xl font-extrabold text-white shadow-xl shadow-[#EBB134]/30 mb-6 border-4 border-white/20">
              {user.nama ? user.nama.charAt(0) : 'U'}
            </div>
            <h1 className="text-2xl font-extrabold text-white mb-2">{user.nama || 'Pengguna'}</h1>
            <p className="text-white/60 text-sm font-medium mb-4">{user.email}</p>
            <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              user.role === 'staff' ? 'bg-[#EBB134] text-white' : 'bg-white/20 text-white'
            }`}>
              {user.role === 'staff' ? 'Dosen / Staff' : 'Mahasiswa'}
            </span>
          </div>
        </div>

        {/* Detail Informasi */}
        <div className="p-8 md:p-12">
          <div className="space-y-6 mb-10">
            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Nama Lengkap</label>
              <p className="font-extrabold text-sm">{user.nama || '-'}</p>
            </div>

            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                {user.role === 'staff' ? 'NIP / NIK' : 'NIM'}
              </label>
              <p className="font-extrabold text-sm">{user.nim_nip || '-'}</p>
            </div>

            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                {user.role === 'staff' ? 'Jabatan' : 'Program Studi'}
              </label>
              <p className="font-extrabold text-sm text-right max-w-[200px] leading-tight">{user.prodi_jabatan || '-'}</p>
            </div>

            <div className="flex justify-between items-center border-b border-gray-50 pb-4">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status Institusi</label>
              <p className="text-[#5CB85C] font-extrabold text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-[#5CB85C] rounded-full animate-pulse"></span>
                Aktif
              </p>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="space-y-4">
            <Link 
              to="/riwayat-claim" 
              className="block w-full"
            >
              <button className="w-full bg-[#273A5A] text-white font-bold py-4 rounded-2xl shadow-xl shadow-[#273A5A]/20 hover:bg-[#1a2944] transition-all text-sm">
                Riwayat Klaim Barang
              </button>
            </Link>
            
            <button 
              className="w-full bg-white text-[#D9534F] border-2 border-[#D9534F] font-bold py-4 rounded-2xl hover:bg-[#D9534F] hover:text-white transition-all text-sm" 
              onClick={handleLogoutAction}
            >
              Keluar dari Akun
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProfilePage;