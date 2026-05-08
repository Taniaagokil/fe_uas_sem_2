import React from 'react';
import Sidebar from '../../components/staff/Sidebar';
import StatCard from '../../components/staff/StatCard';
import FooterStaff from '../../components/staff/Footerstaff';
import './DashboardPage.css';

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      
      {/* Kanan: Konten Utama */}
      <div className="main-content">
        <h1 className="greeting">Halo, Selamat datang Staff Vokasi UB !</h1>
        
        <div className="stats-row">
          <StatCard angka="67" teks="Barang Temuan" />
          <StatCard angka="15" teks="Barang Hilang" />
          <StatCard angka="10" teks="Klaim Barang Hilang" />
        </div>

         <FooterStaff />  
      </div>
    </div>
  );
};

export default DashboardPage;