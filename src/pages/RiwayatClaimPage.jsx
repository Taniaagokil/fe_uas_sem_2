import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoLocationSharp, IoCalendarClear } from 'react-icons/io5';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; 
import { FaCheck, FaTimes } from 'react-icons/fa'; 
import { motion } from 'framer-motion'; 
import './RiwayatClaimPage.css'; // Import file CSS

const RiwayatClaimPage = () => {
  const navigate = useNavigate();

  const claimHistory = [
    {
      id: 1,
      nama: "Iphone 17 Pro Max",
      kategori: "Elektronik",
      lokasi: "Vokasi Veteran - Gedung BNI",
      detail: "Meja Vokantin",
      waktu: "1 Desember 2025 14:40",
      status: "Menunggu Verifikasi",
      statusColor: "#E2B053",
      icon: <AiOutlineLoading3Quarters className="animate-spin" style={{ fontSize: '12px' }} />,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    },
    {
      id: 2,
      nama: "Laptop Asus X441M",
      kategori: "Elektronik",
      lokasi: "Vokasi Veteran - Gedung BNI",
      detail: "Meja Vokantin Lantai 2",
      waktu: "1 Desember 2025 14:40",
      status: "Klaim Ditolak",
      statusColor: "#D9534F",
      icon: <FaTimes style={{ fontSize: '12px' }} />,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    },
    {
      id: 3,
      nama: "Earbuds Baseus",
      kategori: "Elektronik",
      lokasi: "Vokasi Veteran - Gedung BNI",
      detail: "Ruang 309",
      waktu: "1 Desember 2025 14:40",
      status: "Klaim Diterima",
      statusColor: "#5CB85C",
      icon: <FaCheck style={{ fontSize: '12px' }} />,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
      canPickup: true
    },
    {
      id: 4,
      nama: "Kotak Makan Kelinci",
      kategori: "Kotak Makan",
      lokasi: "Vokasi Veteran - Gedung Keubang",
      detail: "Lantai 2",
      waktu: "1 Desember 2025 14:40",
      status: "Barang Diterima",
      statusColor: "#5CB85C",
      icon: <FaCheck style={{ fontSize: '12px' }} />,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    }
  ];

  const yellowTheme = '#E2B053';

  // Varians Animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="riwayat-claim-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h2 
        className="riwayat-title"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        Pengajuan Klaim <span>Barang</span>
      </motion.h2>

      <motion.div 
        className="claim-list-wrapper"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {claimHistory.map((item) => (
          <motion.div 
            key={item.id} 
            className="claim-card"
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
          >
            {/* Foto Barang */}
            <div className="claim-image-wrapper">
              <img src={item.image} alt={item.nama} />
            </div>

            {/* Info Konten */}
            <div className="claim-content">
              <div className="claim-category">{item.kategori}</div>
              <h3 className="claim-name">{item.nama}</h3>

              <div className="claim-details">
                <div className="detail-row">
                  <HiOutlineOfficeBuilding style={{ color: yellowTheme, fontSize: '16px' }} />
                  <span>{item.lokasi}</span>
                </div>
                <div className="detail-row">
                  <IoLocationSharp style={{ color: yellowTheme, fontSize: '16px' }} />
                  <span>{item.detail}</span>
                </div>
                <div className="detail-row">
                  <IoCalendarClear style={{ color: yellowTheme, fontSize: '16px' }} />
                  <span>{item.waktu}</span>
                </div>
              </div>

              {item.canPickup && (
                <div style={{ display: 'flex' }}>
                  <motion.button 
                    className="btn-pickup"
                    onClick={() => navigate(`/pengambilan/${item.id}`)}
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ opacity: 0.9 }}
                  >
                    Pengambilan Barang
                  </motion.button>
                </div>
              )}
            </div>

            {/* Badge Status */}
            <motion.div 
              className="status-badge"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{ backgroundColor: item.statusColor }}
            >
              {item.icon}
              {item.status}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RiwayatClaimPage;