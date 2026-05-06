import React from 'react';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import './ProfilePage.css';

function ProfilePage({ user, onLogout }) {
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleLogoutAction = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="profile-page-wrapper">
      <div className="profile-container-card animate-open">
        {/* Header Profil */}
        <div className="profile-header">
          <div className="avatar-large">
            {user.nama ? user.nama.charAt(0) : 'U'}
          </div>
          <h1>{user.nama || 'Pengguna'}</h1>
          <p className="user-email-text">{user.email}</p>
          <span className={`role-badge ${user.role}`}>
            {user.role === 'staff' ? 'Dosen / Staff' : 'Mahasiswa'}
          </span>
        </div>

        {/* Detail Informasi */}
        <div className="profile-content-body">
          <div className="info-details-list">
            <div className="info-item-row">
              <label>Nama Lengkap</label>
              <p>{user.nama || '-'}</p>
            </div>

            <div className="info-item-row">
              <label>{user.role === 'staff' ? 'NIP / NIK' : 'NIM'}</label>
              <p>{user.idNumber || '-'}</p>
            </div>

            <div className="info-item-row">
              <label>{user.role === 'staff' ? 'Unit Kerja' : 'Program Studi'}</label>
              <p>{user.prodi || '-'}</p>
            </div>

            <div className="info-item-row">
              <label>Status Institusi</label>
              <p className="status-active">Aktif</p>
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="button-group-vertical">
            {/* Link dibuat display block dan width 100% agar kontainer tombol memanjang penuh */}
            <Link 
              to="/riwayat-claim" 
              style={{ textDecoration: 'none', width: '100%', display: 'block' }}
            >
              <button className="btn-action-outline" style={{ width: '100%' }}>
                Riwayat Klaim Barang
              </button>
            </Link>
            
            <button className="btn-action-logout" onClick={handleLogoutAction}>
              Keluar dari Akun
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;