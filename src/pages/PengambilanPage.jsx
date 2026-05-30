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

    if (loading) return <div className="min-h-[60vh] flex items-center justify-center font-['Montserrat']"><h2 className="text-[#273A5A] text-xl font-bold animate-pulse">Memuat...</h2></div>;
    if (error || !klaim) return <div className="min-h-[60vh] flex items-center justify-center font-['Montserrat']"><h2 className="text-red-500 text-xl font-bold">Klaim tidak ditemukan</h2></div>;

    const item = klaim.temuan?.barang;
    const temuan = klaim.temuan;

    return (
        <motion.div 
            className="max-w-4xl mx-auto px-4 py-8 md:py-12 font-['Montserrat'] min-h-screen bg-slate-50/30"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#273A5A] mb-8 tracking-tight text-center md:text-left">
                Bukti Pengambilan <span className="text-[#E2B053]">Barang</span>
            </h2>

            {/* Card Detail Barang */}
            <motion.div 
                className="flex flex-col md:flex-row bg-white rounded-3xl md:rounded-[32px] border border-slate-100 p-6 md:p-8 gap-6 md:gap-8 items-center md:items-start shadow-sm mb-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="w-full md:w-56 h-48 md:h-44 rounded-2xl md:rounded-[24px] overflow-hidden flex-shrink-0 shadow-inner bg-slate-50">
                    <img 
                        className="w-full h-full object-cover" 
                        src={item?.foto_barang ? `http://localhost:8000/storage/barang/${item.foto_barang}` : `https://via.placeholder.com/500x350?text=${item?.nama_barang}`} 
                        alt={item?.nama_barang} 
                    />
                </div>

                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left w-full">
                    <div className="inline-block bg-[#273A5A]/15 text-[#273A5A] px-4 py-1.5 rounded-full text-xs font-semibold mb-3 capitalize tracking-wider">
                        {item?.kategori?.nama_kategori}
                    </div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-[#273A5A] mb-4">
                        {item?.nama_barang}
                    </h3>
                    
                    <div className="space-y-3 w-full">
                        <div className="flex items-center justify-center md:justify-start gap-3 text-slate-600 font-semibold text-sm md:text-base">
                            <HiOutlineOfficeBuilding className="text-[#E2B053] text-xl flex-shrink-0" />
                            <span>{temuan?.gedung?.nama_gedung || 'Vokasi Veteran'}</span>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-3 text-slate-600 font-semibold text-sm md:text-base">
                            <IoLocationSharp className="text-[#E2B053] text-xl flex-shrink-0" />
                            <span>{temuan?.lokasi_detail || 'Detail tidak tersedia'}</span>
                        </div>
                        <div className="flex items-center justify-center md:justify-start gap-3 text-slate-600 font-semibold text-sm md:text-base">
                            <IoCalendarClear className="text-[#E2B053] text-xl flex-shrink-0" />
                            <span>{temuan?.tanggal_ditemukan}</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Info Bukti Section */}
            <div className="flex flex-col gap-4 mt-8">
                <motion.div 
                    className="flex flex-col sm:flex-row items-center gap-4 bg-[#273A5A]/5 border border-[#273A5A]/10 p-5 rounded-2xl md:rounded-[24px] text-[#273A5A] font-bold text-sm md:text-base"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <FaLock className="text-[#E2B053] text-xl flex-shrink-0" />
                    <span>Kode Bukti <span className="text-[#E2B053] ml-1.5 font-extrabold text-lg">{klaim.klaim_id.toString().padStart(3, '0')}</span></span>
                </motion.div>

                <motion.div 
                    className="flex flex-col sm:flex-row items-center gap-4 bg-[#273A5A]/5 border border-[#273A5A]/10 p-5 rounded-2xl md:rounded-[24px] text-[#273A5A] font-bold text-sm md:text-base"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <FaUsers className="text-[#E2B053] text-xl flex-shrink-0" />
                    <span>Ruangan Staff <span className="text-[#273A5A] ml-1.5 font-extrabold">Lost And Found - Vokasi Veteran</span></span>
                </motion.div>

                <motion.div 
                    className="flex flex-col sm:flex-row items-center gap-4 bg-amber-50 border border-amber-200/60 p-5 rounded-2xl md:rounded-[24px] text-[#273A5A] font-bold text-sm md:text-base"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <FaIdCard className="text-[#E2B053] text-xl flex-shrink-0" />
                    <span>Wajib melampirkan KTM untuk pengambilan barang</span>
                </motion.div>
            </div>

            {/* Button Group */}
            <motion.div 
                className="flex flex-col sm:flex-row gap-4 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                <button 
                    className="flex-1 bg-[#273A5A] hover:bg-[#1f2e47] text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 shadow-md cursor-pointer hover:shadow-lg active:scale-[0.98]"
                    onClick={() => navigate('/')}
                >
                    Kembali ke beranda
                </button>
                <button 
                    className="flex-1 bg-[#E2B053] hover:bg-[#d49f3e] text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 shadow-md cursor-pointer hover:shadow-lg active:scale-[0.98]"
                    onClick={() => window.print()}
                >
                    Cetak Bukti
                </button>
            </motion.div>
        </motion.div>
    );
};

export default PengambilanPage;