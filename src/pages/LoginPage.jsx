 import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';



function LoginPage({ onLogin }) {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);



  const handleLogin = (e) => {

    e.preventDefault();

    if (email === 'staff@ub.ac.id' && password === 'staff123') {

      onLogin({ email: email, nama: 'Staff', role: 'staff' });

      navigate('/');

      return;

    }

    if (email.endsWith('@student.ub.ac.id') && password === '12345') {

      const extractedName = email.split('@')[0];

      const formattedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);

      onLogin({ email: email, nama: formattedName, role: 'mahasiswa' });

      navigate('/');

    } else {

      alert('Login gagal!');

    }

  };



  return (

    <div className="page-container">

      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');



        .page-container {

            min-height: 100vh;

            background: #ffffff;

            font-family: 'Montserrat', sans-serif;

            margin: 0;

            display: flex;

            flex-direction: column;

        }



        /* Mengurangi jarak animasi muncul agar tidak terlihat 'jatuh' dari atas banget */

        @keyframes fadeInUp {

            0% { opacity: 0; transform: translateY(10px); }

            100% { opacity: 1; transform: translateY(0); }

        }



        .content-body {

            flex: 1;

            display: flex;

            justify-content: center;

            align-items: flex-start;

            /* UBAH DISINI: Gunakan angka pixel kecil untuk mepet ke navbar */

            padding-top: 15px;

            box-sizing: border-box;

        }



        .login-card {

            background: white;

            border-radius: 24px;

            /* Perkecil padding dalam agar frame lebih ramping secara vertikal */

            padding: 24px 32px;

            width: 100%;

            max-width: 360px;

            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);

            text-align: center;

            box-sizing: border-box;

            animation: fadeInUp 0.6s ease-out forwards;

            opacity: 0;

            border: 1px solid #f0f0f0;

        }



        .icon-header {

            background: #f8f9fa;

            width: 44px;

            height: 44px;

            border-radius: 12px;

            display: flex;

            align-items: center;

            justify-content: center;

            margin: 0 auto 12px;

        }



        h2 {

            font-size: 20px;

            font-weight: 800;

            margin-bottom: 6px;

            color: #17385d;

        }



        .subtitle {

            color: #52667d;

            font-size: 12px;

            font-weight: 500;

            margin-bottom: 20px;

            line-height: 1.4;

        }



        .input-group {

            position: relative;

            margin-bottom: 12px;

        }



        .input-group input {

            width: 100%;

            padding: 12px 12px 12px 46px;

            background: #f3f4f6;

            border: 2px solid transparent;

            border-radius: 12px;

            font-family: 'Montserrat', sans-serif;

            font-size: 14px;

            color: #1f2937;

            box-sizing: border-box;

            outline: none;

            transition: all 0.2s ease;

        }



        .input-group input:focus {

            background: white;

            border-color: #eab308;

        }



        .input-icon {

            position: absolute;

            left: 16px;

            top: 50%;

            transform: translateY(-50%);

            color: #9ca3af;

        }



        .eye-icon {

            position: absolute;

            right: 16px;

            top: 50%;

            transform: translateY(-50%);

            cursor: pointer;

            color: #9ca3af;

        }



        .btn-submit {

            width: 100%;

            padding: 12px;

            background: #eab308;

            color: white;

            border: none;

            border-radius: 12px;

            font-family: 'Montserrat', sans-serif;

            font-weight: 700;

            font-size: 15px;

            cursor: pointer;

            margin-top: 6px;

            transition: all 0.2s ease;

        }



        .btn-submit:hover {

            background: #ca8a04;

            transform: translateY(-1px);

        }



        .demo-text {

            margin-top: 20px;

            font-size: 11px;

            font-weight: 600;

            color: #9ca3af;

            text-align: center;

        }

      `}</style>



      <div className="content-body">

        <div className="login-card">

          <div className="icon-header">

            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#17385d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">

              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>

            </svg>

          </div>



          <h2>Masuk ke Akun</h2>

          <p className="subtitle">Gunakan email dan kata sandi terdaftar.</p>



          <form onSubmit={handleLogin}>

            <div className="input-group">

              <span className="input-icon">

                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>

              </span>

              <input type="email" placeholder="Email UB" value={email} onChange={(e) => setEmail(e.target.value)} required />

            </div>



            <div className="input-group">

              <span className="input-icon">

                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>

              </span>

              <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>

                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>

              </span>

            </div>



            <button type="submit" className="btn-submit">Masuk Sekarang</button>

          </form>



          <p className="demo-text">

            Demo: [nama]@student.ub.ac.id / 12345

          </p>

        </div>

      </div>

    </div>

  );

}



export default LoginPage;