import React, { useState } from 'react';

function LoginModal({ isOpen, onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e) => {
  e.preventDefault();

  if (email === 'staff@ub.ac.id' && password === 'staff123') {
    onLogin({ 
      email: email, 
      nama: 'Ir. Ahmad Syafiq, M.T.', 
      role: 'staff',
      idNumber: '198807122015031001', // Ini NIP
      prodi: 'Dosen Teknologi Informasi'
    });
  } else if (email.endsWith('@student.ub.ac.id') && password === '12345') {
    const name = email.split('@')[0];
    onLogin({ 
      email: email, 
      nama: name.charAt(0).toUpperCase() + name.slice(1), 
      role: 'mahasiswa',
      idNumber: '235150701111001', // Ini NIM
      prodi: 'D3 Teknologi Informasi' 
    });
  } else {
    alert('Login gagal! Gunakan akun dummy yang sesuai.');
  }
};
  return (
    <div className="modal-overlay" onClick={onClose}>
      <style>{`
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(8px);
          display: flex; justify-content: center; align-items: center; z-index: 10000;
          font-family: 'Montserrat', sans-serif;
        }
        .login-card-modal {
          background: white; border-radius: 28px; padding: 32px;
          width: 100%; max-width: 380px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
          text-align: center; position: relative; animation: modalSlideUp 0.4s ease-out;
        }
        @keyframes modalSlideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .close-btn-x { position: absolute; right: 25px; top: 25px; border: none; background: none; cursor: pointer; color: #9ca3af; font-size: 20px; }
        .login-header-icon { background: #f8f9fa; width: 50px; height: 50px; border-radius: 15px; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; }
        .modal-input-group { position: relative; margin-bottom: 15px; text-align: left; }
        .modal-input-group input { width: 100%; padding: 14px 15px 14px 50px; background: #f3f4f6; border: 2px solid transparent; border-radius: 15px; font-size: 14px; outline: none; transition: 0.2s; box-sizing: border-box; font-family: 'Montserrat', sans-serif; }
        .modal-input-group input:focus { background: white; border-color: #eab308; }
        .modal-icon-left { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); color: #9ca3af; }
        .modal-eye-right { position: absolute; right: 18px; top: 50%; transform: translateY(-50%); cursor: pointer; color: #9ca3af; }
        .modal-btn-submit { width: 100%; padding: 15px; background: #eab308; color: white; border: none; border-radius: 15px; font-weight: 700; cursor: pointer; transition: 0.3s; font-size: 15px; margin-top: 10px; }
        .modal-btn-submit:hover { background: #ca8a04; transform: translateY(-2px); }
      `}</style>

      <div className="login-card-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn-x" onClick={onClose}>✕</button>
        <div className="login-header-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#17385d" strokeWidth="2.5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
        </div>
        <h2 style={{fontSize:'22px', color:'#17385d', fontWeight:800, marginBottom: '8px'}}>Selamat Datang</h2>
        <p style={{fontSize:'13px', color:'#52667d', marginBottom:'25px'}}>Masuk untuk melapor dan klaim barang.</p>

        <form onSubmit={handleLogin}>
          <div className="modal-input-group">
            <span className="modal-icon-left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </span>
            <input type="email" placeholder="Email UB" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="modal-input-group">
            <span className="modal-icon-left">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </span>
            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <span className="modal-eye-right" onClick={() => setShowPassword(!showPassword)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </span>
          </div>
          <button type="submit" className="modal-btn-submit">Masuk Sekarang</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;