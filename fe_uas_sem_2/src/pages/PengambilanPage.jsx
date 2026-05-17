import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoLocationSharp, IoCalendarClear } from 'react-icons/io5';
import { FaLock, FaUsers, FaIdCard } from 'react-icons/fa';
import useFetch from '../hooks/useFetch';
import './PengambilanPage.css';

const PengambilanPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: klaim, loading, error } = useFetch(`/klaim/${id}`);

    const yellowTheme = '#E2B053';

    if (loading) return <div className="error-screen"><h2>Memuat...</h2></div>;
    if (error || !klaim) return <div className="error-screen"><h2>Klaim tidak ditemukan</h2></div>;

    const item = klaim.temuan?.barang;
    const temuan = klaim.temuan;

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
                    <img src={item?.foto_barang ? `http://localhost:8000/storage/barang/${item.foto_barang}` : `https://via.placeholder.com/500x350?text=${item?.nama_barang}`} alt={item?.nama_barang} />
                </div>

                <div className="item-info">
                    <div className="category-badge">{item?.kategori?.nama_kategori}</div>
                    <h3 className="item-name">{item?.nama_barang}</h3>
                    
                    <div className="info-row">
                        <HiOutlineOfficeBuilding style={{ color: yellowTheme, fontSize: '20px' }} />
                        <span>{temuan?.gedung?.nama_gedung || 'Vokasi Veteran'}</span>
                    </div>
                    <div className="info-row">
                        <IoLocationSharp style={{ color: yellowTheme, fontSize: '20px' }} />
                        <span>{temuan?.lokasi_detail || 'Detail tidak tersedia'}</span>
                    </div>
                    <div className="info-row">
                        <IoCalendarClear style={{ color: yellowTheme, fontSize: '20px' }} />
                        <span>{temuan?.tanggal_ditemukan}</span>
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
                    Kode Bukti <span>{klaim.klaim_id.toString().padStart(3, '0')}</span>
                </motion.div>

                <motion.div 
                    className="info-box highlight"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <FaUsers style={{ color: yellowTheme }} />
                    Ruangan Staff <span>Lost And Found - Vokasi Veteran</span>
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
                    onClick={() => navigate('/')}
                >
                    Kembali ke beranda
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