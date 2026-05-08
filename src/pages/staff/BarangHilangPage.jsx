import React from 'react';
import { motion } from 'framer-motion';
import ReusableTable from '../../components/staff/table';
import Footerstaff from '../../components/staff/Footerstaff';

const BarangHilangPage = () => {
  const columns = [
    { header: 'Kode', key: 'kode', width: '10%' },
    { header: 'Kategori', key: 'kategori', width: '20%' },
    { header: 'Nama Barang', key: 'nama_barang', width: '25%' },
    { header: 'Tanggal', key: 'tanggal', width: '20%' },
    { 
      header: 'Status', 
      key: 'status', 
      width: '15%',
      render: (row) => {
        // Logika warna berdasarkan status di gambar
        let bgColor = 'bg-[#CC7171]'; // Default merah (Belum Ditemukan)
        if (row.status === 'Di Unggah Temuan') {
          bgColor = 'bg-[#82B1E1]'; // Biru muda
        }

        return (
          <span className={`inline-block px-4 py-1.5 rounded-full text-white text-[11px] font-bold shadow-sm whitespace-nowrap ${bgColor}`}>
            {row.status}
          </span>
        );
      }
    },
    { 
      header: 'Aksi', 
      key: 'aksi', 
      width: '10%',
      render: (row) => (
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 bg-[#2D3E50] text-white rounded-lg shadow-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
        </motion.button>
      )
    },
  ];

  const data = [
    { 
      kode: '001', 
      kategori: 'Elektronik', 
      nama_barang: 'Kipas Angin', 
      tanggal: '15 Januari 2026', 
      status: 'Belum Ditemukan' 
    },
    { 
      kode: '005', 
      kategori: 'Elektronik', 
      nama_barang: 'Kipas Angin', 
      tanggal: '15 Januari 2026', 
      status: 'Di Unggah Temuan' 
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-screen font-['Montserrat'] bg-white"
    >
      <div className="p-10 flex-1">
        <motion.h1 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-[32px] font-bold text-[#2D3E50] mb-10"
        >
          Laporan Barang <span className="text-[#E9B82F]">Hilang</span>
        </motion.h1>

        <div className="flex justify-between items-center mb-8 gap-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-sm"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-3 bg-[#EDEDED] border-none rounded-xl focus:ring-1 focus:ring-[#D4B04C] outline-none text-sm"
              placeholder="Cari..."
            />
          </motion.div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#2D3E50] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md"
          >
            <span className="text-xl">+</span> Unggah Barang Hilang
          </motion.button>
        </div>

        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white rounded-2xl p-4 shadow-[0_0_20px_rgba(0,0,0,0.03)] border border-gray-50"
        >
          <ReusableTable columns={columns} data={data} />
        </motion.div>

        <motion.button 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          whileHover={{ scale: 1.2 }}
          className="fixed bottom-12 right-12 bg-[#D4B04C] p-4 rounded-full text-white shadow-xl z-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
        </motion.button>
      </div>

      <Footerstaff />
    </motion.div>
  );
};

export default BarangHilangPage;