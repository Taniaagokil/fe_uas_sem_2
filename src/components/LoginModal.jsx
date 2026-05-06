import React, { useState } from 'react';

import { LogIn, X, Mail, Lock, Eye, EyeOff } from 'lucide-react';



function LoginModal({ isOpen, onClose, onLogin }) {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);



  if (!isOpen) return null;



  const handleLogin = (e) => {

    e.preventDefault();

    // Logika login kamu

    if (email === 'staff@ub.ac.id' && password === 'staff123') {

      onLogin({ email, nama: 'Staff', role: 'staff' });

      onClose();

    } else if (email.endsWith('@student.ub.ac.id') && password === '12345') {

      const name = email.split('@')[0];

      onLogin({ email, nama: name.charAt(0).toUpperCase() + name.slice(1), role: 'mahasiswa' });

      onClose();

    } else {

      alert('Login gagal!');

    }

  };



  return (

    // OVERLAY: Menutup seluruh layar, posisi fixed (tidak hilang saat scroll)

    <div

      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"

      onClick={onClose}

    >

      {/* CARD LOGIN */}

      <div

        className="bg-white w-full max-w-[400px] rounded-[28px] p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300"

        onClick={(e) => e.stopPropagation()} // Supaya klik di kartu gak nutup modal

      >

        {/* Tombol Close */}

        <button

          onClick={onClose}

          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"

        >

          <X size={24} strokeWidth={2.5} />

        </button>



        {/* Header */}

        <div className="flex flex-col items-center mb-8">

          <div className="bg-gray-50 p-3 rounded-2xl mb-4">

            <LogIn className="text-[#17385d]" size={28} strokeWidth={2.5} />

          </div>

          <h2 className="text-[#17385d] text-2xl font-extrabold tracking-tight">Masuk ke Akun</h2>

          <p className="text-gray-500 text-sm font-medium mt-1 text-center">

            Gunakan email dan kata sandi terdaftar.

          </p>

        </div>



        {/* Form */}

        <form onSubmit={handleLogin} className="space-y-4">

          <div className="relative">

            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />

            <input

              type="email"

              placeholder="Email UB"

              className="w-full bg-gray-100 border-2 border-transparent focus:border-[#eab308] focus:bg-white rounded-2xl py-3.5 pl-12 pr-4 outline-none transition-all text-sm font-medium"

              value={email}

              onChange={(e) => setEmail(e.target.value)}

              required

            />

          </div>



          <div className="relative">

            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />

            <input

              type={showPassword ? "text" : "password"}

              placeholder="Password"

              className="w-full bg-gray-100 border-2 border-transparent focus:border-[#eab308] focus:bg-white rounded-2xl py-3.5 pl-12 pr-12 outline-none transition-all text-sm font-medium"

              value={password}

              onChange={(e) => setPassword(e.target.value)}

              required

            />

            <button

              type="button"

              onClick={() => setShowPassword(!showPassword)}

              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"

            >

              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}

            </button>

          </div>



          <button

            type="submit"

            className="w-full bg-[#eab308] hover:bg-[#ca8a04] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-yellow-500/20 active:scale-[0.98]"

          >

            Masuk Sekarang

          </button>

        </form>



        <p className="text-center text-[11px] font-semibold text-gray-400 mt-6 uppercase tracking-wider">

          Demo: [nama]@student.ub.ac.id / 12345

        </p>

      </div>

    </div>

  );

}

export default LoginModal;