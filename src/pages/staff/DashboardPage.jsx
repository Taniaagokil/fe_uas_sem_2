import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../../components/staff/Sidebar';
import StatCard from '../../components/staff/StatCard';
import FooterStaff from '../../components/staff/Footerstaff';
import useFetch from '../../hooks/useFetch';
import './DashboardPage.css';

const DashboardPage = () => {
  const { data: stats, loading } = useFetch('/admin/dashboard-stats');

  // Definisi varian animasi untuk container utama
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Jeda antar elemen (muncul satu-satu)
      },
    },
  };

  // Definisi varian animasi untuk item (Greeting & Cards)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  return (
    <div className="dashboard-container">
  

      <motion.div 
        className="main-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animasi Title */}
        <motion.h1 className="greeting" variants={itemVariants}>
          Halo, Selamat datang Staff Vokasi UB !
        </motion.h1>
        
        {/* Row Statistik */}
        <motion.div className="stats-row" variants={itemVariants}>
          <StatCard angka={loading ? '...' : (stats?.total_found || 0).toString()} teks="Barang Temuan" />
          <StatCard angka={loading ? '...' : (stats?.total_lost || 0).toString()} teks="Barang Hilang" />
          <StatCard angka={loading ? '...' : (stats?.pending_claims || 0).toString()} teks="Klaim Barang Hilang" />
        </motion.div>

        {/* Footer juga ikut muncul pelan-pelan */}
        <motion.div 
          style={{ marginTop: 'auto', width: '100%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >

        </motion.div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;