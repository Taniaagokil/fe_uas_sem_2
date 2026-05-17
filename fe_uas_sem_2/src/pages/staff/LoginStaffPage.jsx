import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, X } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';

const LoginStaffPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      // Optional: Check if user.role is staff
      navigate('/staff/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login gagal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md p-8 rounded-[40px] shadow-2xl relative mx-4">
        {/* Close Button */}
        <button className="absolute top-6 right-8 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        {/* Icon Header */}
        <div className="flex justify-center mb-6">
          <div className="bg-slate-50 p-4 rounded-2xl">
            <LogIn className="text-[#273A5A]" size={32} />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-[28px] font-extrabold text-[#273A5A] mb-2">Selamat Datang</h1>
          <p className="text-gray-500 font-medium">Masuk untuk menuju dashboard staff.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="text-gray-400" size={20} />
            </div>
            <input
              type="email"
              placeholder="staff@gmail.com"
              className="w-full pl-12 pr-4 py-4 bg-[#EBF2FF] border-none rounded-2xl text-[#273A5A] focus:ring-2 focus:ring-[#E2B053] outline-none font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="text-gray-400" size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="•••••"
              className="w-full pl-12 pr-12 py-4 bg-[#EBF2FF] border-none rounded-2xl text-[#273A5A] focus:ring-2 focus:ring-[#E2B053] outline-none font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#273A5A]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#E2B053] hover:bg-[#d1a248] text-white font-extrabold py-4 rounded-2xl mt-4 transition-all duration-300 shadow-lg shadow-yellow-500/30 text-lg disabled:opacity-50"
          >
            {isLoading ? 'Memuat...' : 'Masuk Sekarang'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginStaffPage;