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
    <div className="min-h-screen font-['Montserrat'] text-[#273A5A] pb-24 pt-8 bg-slate-50/50 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        className="bg-white rounded-[32px] shadow-2xl overflow-hidden border border-slate-100/80 w-full max-w-md shadow-[#273A5A]/5"
      >
        {/* Header Profil */}
        <div className="bg-[#273A5A] p-8 sm:p-10 text-center relative overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-[#EBB134] rounded-[24px] flex items-center justify-center text-3xl font-extrabold text-white shadow-xl shadow-[#EBB134]/30 mb-4 border-4 border-white/20">
              {user.nama ? user.nama.charAt(0) : 'U'}
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white mb-1.5 leading-tight">{user.nama || 'Pengguna'}</h1>
            <p className="text-white/60 text-xs sm:text-sm font-semibold mb-4">{user.email}</p>
            <span className={`inline-block px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
              user.role === 'staff' ? 'bg-[#EBB134] text-white shadow-md shadow-[#EBB134]/20' : 'bg-white/20 text-white'
            }`}>
              {user.role === 'staff' ? 'Dosen / Staff' : 'Mahasiswa'}
            </span>
          </div>
        </div>

        {/* Detail Informasi */}
        <div className="p-6 sm:p-8">
          <div className="space-y-5 mb-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nama Lengkap</label>
              <p className="font-extrabold text-xs sm:text-sm text-[#273A5A]">{user.nama || '-'}</p>
            </div>

            <div className="flex justify-between items-center border-b border-slate-100 pb-3.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {user.role === 'staff' ? 'NIP / NIK' : 'NIM'}
              </label>
              <p className="font-extrabold text-xs sm:text-sm text-[#273A5A]">{user.nim_nip || '-'}</p>
            </div>

            <div className="flex justify-between items-center border-b border-slate-100 pb-3.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {user.role === 'staff' ? 'Jabatan' : 'Program Studi'}
              </label>
              <p className="font-extrabold text-xs sm:text-sm text-[#273A5A] text-right max-w-[200px] leading-tight">{user.prodi_jabatan || '-'}</p>
            </div>

            <div className="flex justify-between items-center pb-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status Institusi</label>
              <p className="text-emerald-500 font-extrabold text-xs sm:text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Aktif
              </p>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="space-y-3.5">
            <Link 
              to="/riwayat-claim" 
              className="block w-full"
            >
              <button className="w-full bg-[#273A5A] hover:bg-[#1a2944] text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-[#273A5A]/15 hover:shadow-xl hover:shadow-[#273A5A]/25 transition-all text-xs cursor-pointer border-none">
                Riwayat Klaim Barang
              </button>
            </Link>
            
            <button 
              className="w-full bg-white text-[#D9534F] border-2 border-dashed border-[#D9534F]/30 hover:border-[#D9534F] hover:bg-red-50/20 font-extrabold py-4 px-6 rounded-2xl transition-all text-xs cursor-pointer"
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