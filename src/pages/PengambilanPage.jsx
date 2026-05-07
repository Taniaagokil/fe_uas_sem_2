import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoLocationSharp, IoCalendarClear } from 'react-icons/io5';
import { FaLock, FaUsers, FaIdCard } from 'react-icons/fa';
import './PengambilanPage.css';

const PengambilanPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Data sesuai dengan tampilan yang Anda minta
    const itemData = {
        nama: "Earbuds Baseus",
        kategori: "Elektronik",
        lokasi: "Vokasi Veteran - Gedung BNI",
        ruang: "Ruang 309",
        waktu: "1 Desember 2025 14:40",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500", 
        kodeBukti: "002",
        ruangStaff: "Lost And Found - Vokasi Veteran"
    };

    const yellowTheme = '#E2B053';

    return (
        <motion.div 
            className="pengambilan-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <h2 className="pengambilan-title">
                Bukti Pengambilan <span>Barang</span>
            </h2>

            {/* Card Detail Barang */}
            <motion.div 
                className="item-card-detail"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="item-image-wrapper">
                    <img src={itemData.image} alt={itemData.nama} />
                </div>

                <div className="item-info">
                    <div className="category-badge">{itemData.kategori}</div>
                    <h3 className="item-name">{itemData.nama}</h3>
                    
                    <div className="info-row">
                        <HiOutlineOfficeBuilding style={{ color: yellowTheme, fontSize: '20px' }} />
                        <span>{itemData.lokasi}</span>
                    </div>
                    <div className="info-row">
                        <IoLocationSharp style={{ color: yellowTheme, fontSize: '20px' }} />
                        <span>{itemData.ruang}</span>
                    </div>
                    <div className="info-row">
                        <IoCalendarClear style={{ color: yellowTheme, fontSize: '20px' }} />
                        <span>{itemData.waktu}</span>
                    </div>
                </div>
            </motion.div>

            {/* Info Bukti Section */}
            <div className="info-box-container">
                <motion.div 
                    className="info-box highlight"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <FaLock style={{ color: yellowTheme }} />
                    Kode Bukti <span>{itemData.kodeBukti}</span>
                </motion.div>

                <motion.div 
                    className="info-box highlight"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <FaUsers style={{ color: yellowTheme }} />
                    Ruangan Staff <span>{itemData.ruangStaff}</span>
                </motion.div>

                <motion.div 
                    className="info-box"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <FaIdCard style={{ color: yellowTheme }} />
                    Wajib melampirkan KTM untuk pengambilan barang
                </motion.div>
            </div>

            {/* Button Group */}
            <motion.div 
                className="button-group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <button 
                    className="btn-back" 
                    onClick={() => navigate('/riwayat-claim')}
                >
                    Kembali ke Riwayat Klaim
                </button>
                <button 
                    className="btn-print"
                    onClick={() => window.print()}
                >
                    Cetak Bukti
                </button>
            </motion.div>
        </motion.div>
    );
};

export default PengambilanPage;