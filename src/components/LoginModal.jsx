import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nama, setNama] = useState('');
  const [nim, setNim] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [step, setStep] = useState(1); // 1: Cek NIM, 2: Isi Data

  const { login, register, checkNim, loading } = useContext(AuthContext);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleCheckNim = async (e) => {
    e.preventDefault();
    const result = await checkNim(nim);
    if (result.success) {
      setStep(2);
    } else {
      showToast(result.message || 'NIM tidak valid!', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      if (step === 1) {
        handleCheckNim(e);
        return;
      }
      if (password !== passwordConfirm) {
        showToast('Konfirmasi password tidak cocok!', 'error');
        return;
      }
      const result = await register({
        nama,
        nim,
        email,
        password,
        password_confirmation: passwordConfirm
      });
      if (result.success) {
        showToast('Registrasi berhasil! Silakan login.', 'success');
        setIsRegister(false);
        setStep(1);
      } else {
        showToast(result.message || 'Registrasi gagal!', 'error');
      }
    } else {
      const result = await login(email, password);
      if (result.success) {
        onClose();
      } else {
        showToast(result.message || 'Login gagal! Periksa email dan password Anda.', 'error');
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex justify-center items-center z-[10000] p-4 transition-all duration-300 font-['Montserrat']"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-[380px] shadow-2xl relative animate-in fade-in slide-in-from-bottom-4 duration-300 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="absolute right-6 top-6 border-none bg-transparent cursor-pointer text-slate-400 hover:text-slate-650 transition-colors text-lg focus:outline-none"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#17385d" strokeWidth="2.5">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10 17 15 12 10 7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
          </svg>
        </div>

        <h2 className="text-[22px] text-[#17385d] font-extrabold mb-2">
          {isRegister ? 'Daftar Akun' : 'Selamat Datang'}
        </h2>
        
        <p className="text-xs text-slate-500 mb-6 text-center leading-relaxed">
          {isRegister 
            ? (step === 1 ? 'Masukkan NIM Anda untuk verifikasi.' : 'Lengkapi data diri Anda.') 
            : 'Masuk untuk melapor dan klaim barang.'}
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          {isRegister && step === 1 && (
            <div className="relative mb-4 w-full text-left">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Masukkan NIM (15 Digit)" 
                value={nim} 
                onChange={(e) => setNim(e.target.value)} 
                required 
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100/70 border-2 border-transparent rounded-2xl text-sm text-slate-800 outline-none transition-all focus:bg-white focus:border-amber-500"
              />
            </div>
          )}

          {isRegister && step === 2 && (
            <>
              <div className="relative mb-4 w-full text-left">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <input 
                  type="text" 
                  placeholder="Nama Lengkap" 
                  value={nama} 
                  onChange={(e) => setNama(e.target.value)} 
                  required 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100/70 border-2 border-transparent rounded-2xl text-sm text-slate-800 outline-none transition-all focus:bg-white focus:border-amber-500"
                />
              </div>
              <div className="relative mb-4 w-full text-left">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input 
                  type="email" 
                  placeholder="Email (Contoh: dylan@student.ub.ac.id)" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100/70 border-2 border-transparent rounded-2xl text-sm text-slate-800 outline-none transition-all focus:bg-white focus:border-amber-500"
                />
              </div>
            </>
          )}

          {(!isRegister || step === 2) && (
            <>
              {!isRegister && (
                <div className="relative mb-4 w-full text-left">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </span>
                  <input 
                    type="email" 
                    placeholder="Email UB" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100/70 border-2 border-transparent rounded-2xl text-sm text-slate-800 outline-none transition-all focus:bg-white focus:border-amber-500"
                  />
                </div>
              )}
              <div className="relative mb-4 w-full text-left">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder={isRegister ? "Buat Password" : "Password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="w-full pl-12 pr-8 py-3.5 bg-slate-50 hover:bg-slate-100/70 border-2 border-transparent rounded-2xl text-sm text-slate-800 outline-none transition-all focus:bg-white focus:border-amber-500"
                />
                <span 
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-650 transition-colors" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </span>
              </div>
            </>
          )}

          {isRegister && step === 2 && (
            <div className="relative mb-4 w-full text-left">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Konfirmasi Password" 
                value={passwordConfirm} 
                onChange={(e) => setPasswordConfirm(e.target.value)} 
                required 
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 hover:bg-slate-100/70 border-2 border-transparent rounded-2xl text-sm text-slate-800 outline-none transition-all focus:bg-white focus:border-amber-500"
              />
            </div>
          )}

          <button 
            type="submit" 
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white border-none rounded-2xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 cursor-pointer text-sm md:text-base mt-2 disabled:bg-slate-350 disabled:cursor-not-allowed" 
            disabled={loading}
          >
            {loading ? 'Memproses...' : (isRegister ? (step === 1 ? 'Verifikasi NIM' : 'Daftar Sekarang') : 'Masuk Sekarang')}
          </button>
        </form>

        <p className="text-xs text-slate-500 mt-6 text-center">
          {isRegister ? 'Sudah punya akun?' : 'Belum punya akun?'}
          <span 
            className="text-amber-500 font-bold cursor-pointer hover:underline ml-1"
            onClick={() => {
              setIsRegister(!isRegister);
              setStep(1);
            }}
          >
            {isRegister ? 'Masuk di sini' : 'Daftar di sini'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginModal;