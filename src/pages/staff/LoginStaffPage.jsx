import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, X } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

const LoginStaffPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      // Optional: Check if user.role is staff
      navigate('/staff/dashboard');
    } catch (err) {
      showToast(err.response?.data?.message || 'Login gagal', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 p-4 md:p-8 font-['Montserrat']">
      <div className="bg-white w-full max-w-md p-8 md:p-10 rounded-3xl md:rounded-[32px] shadow-sm border border-slate-100 relative">
        {/* Close Button */}
        <button 
          onClick={() => navigate('/')}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <X size={24} />
        </button>

        {/* Icon Header */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#273A5A]/5 p-5 rounded-2xl">
            <LogIn className="text-[#273A5A]" size={32} />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#273A5A] mb-2 tracking-tight">Selamat Datang</h1>
          <p className="text-slate-500 font-semibold text-sm">Masuk untuk menuju dashboard staff.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="text-slate-400" size={20} />
            </div>
            <input
              type="email"
              placeholder="staff@gmail.com"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200/60 rounded-2xl text-[#273A5A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E2B053] focus:border-transparent font-semibold transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="text-slate-400" size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="•••••"
              className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200/60 rounded-2xl text-[#273A5A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E2B053] focus:border-transparent font-semibold transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#273A5A] transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#E2B053] hover:bg-[#d49f3e] text-white font-extrabold py-4 rounded-2xl mt-4 transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] text-base md:text-lg disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? 'Memuat...' : 'Masuk Sekarang'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginStaffPage;