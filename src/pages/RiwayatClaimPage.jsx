import React from 'react';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoLocationSharp, IoCalendarClear } from 'react-icons/io5';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; 
import { FaCheck, FaTimes } from 'react-icons/fa'; 
// 1. Install framer-motion (npm install framer-motion)
import { motion } from 'framer-motion'; 

const RiwayatClaimPage = () => {
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
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
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

  const darkBlue = '#273A5A';
  const yellowTheme = '#E2B053';

  // Varians untuk animasi list
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ maxWidth: '900px', margin: '40px auto', padding: '0 20px', fontFamily: "'Montserrat', sans-serif" }}
    >
      <motion.h2 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{ fontSize: '24px', fontWeight: '800', color: darkBlue, marginBottom: '25px' }}
      >
        Pengajuan Klaim <span style={{ color: yellowTheme }}>Barang</span>
      </motion.h2>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        {claimHistory.map((item) => (
          <motion.div 
            key={item.id} 
            variants={itemVariants}
            whileHover={{ scale: 1.01 }} // Animasi sedikit membesar saat kursor di atasnya
            style={{
              display: 'flex',
              backgroundColor: '#F8F9FA',
              borderRadius: '20px',
              padding: '18px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              position: 'relative',
              gap: '20px',
              alignItems: 'flex-start'
            }}
          >
            
            {/* Foto Barang */}
            <div style={{ width: '160px', height: '140px', borderRadius: '15px', overflow: 'hidden', flexShrink: 0 }}>
              <img src={item.image} alt={item.nama} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Info Konten */}
            <div style={{ flex: 1, paddingRight: '140px' }}>
              <div style={{ 
                display: 'inline-block', 
                backgroundColor: darkBlue, 
                color: 'white', 
                padding: '4px 12px', 
                borderRadius: '8px', 
                fontSize: '10px', 
                fontWeight: '700',
                marginBottom: '8px'
              }}>
                {item.kategori}
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: '800', color: darkBlue, margin: '0 0 12px 0' }}>
                {item.nama}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={detailRowStyle}>
                  <HiOutlineOfficeBuilding style={{ color: yellowTheme, fontSize: '16px' }} />
                  <span style={{ color: darkBlue, fontWeight: '600', fontSize: '13px' }}>{item.lokasi}</span>
                </div>
                <div style={detailRowStyle}>
                  <IoLocationSharp style={{ color: yellowTheme, fontSize: '16px' }} />
                  <span style={{ color: darkBlue, fontWeight: '600', fontSize: '13px' }}>{item.detail}</span>
                </div>
                <div style={detailRowStyle}>
                  <IoCalendarClear style={{ color: yellowTheme, fontSize: '16px' }} />
                  <span style={{ color: darkBlue, fontWeight: '600', fontSize: '13px' }}>{item.waktu}</span>
                </div>
              </div>

              {item.canPickup && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <motion.button 
                    whileTap={{ scale: 0.95 }} // Efek saat tombol ditekan
                    style={{
                      marginTop: '15px',
                      backgroundColor: yellowTheme,
                      color: 'white',
                      border: 'none',
                      padding: '8px 25px', 
                      borderRadius: '12px',
                      fontWeight: '700',
                      fontSize: '12px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 10px rgba(226, 176, 83, 0.3)',
                      width: 'fit-content',
                      minWidth: '220px' 
                    }}>
                    Pengambilan Barang
                  </motion.button>
                </div>
              )}
            </div>

            {/* Badge Status */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                backgroundColor: item.statusColor,
                color: 'white',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
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

const detailRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
};

export default RiwayatClaimPage;