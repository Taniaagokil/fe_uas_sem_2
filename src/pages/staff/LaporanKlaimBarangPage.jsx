import React, { useState } from 'react';
import ReusableTable from '../../components/staff/Table';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Check, X, User, MapPin, FileText, Calendar, Image as ImageIcon } from 'lucide-react';
import { FiEye, FiX } from 'react-icons/fi';
import useFetch from '../../hooks/useFetch';
import axiosClient from '../../api/axiosClient';

const LaporanKlaimBarangPage = () => {
  const { data: dataKlaim, loading, error, reFetch } = useFetch('/admin/klaim');
  const [selectedKlaim, setSelectedKlaim] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredKlaim = Array.isArray(dataKlaim)
    ? dataKlaim.filter(k =>
        k.user?.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        k.temuan?.barang?.nama_barang?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const openDetail = (klaim) => {
    setSelectedKlaim(klaim);
    setIsModalOpen(true);
  };

  const handleVerify = async (id, status) => {
    if (!window.confirm(`Apakah Anda yakin ingin ${status === 'disetujui' ? 'menyetujui' : 'menolak'} klaim ini?`)) return;
    
    try {
      await axiosClient.put(`/admin/klaim/${id}/verify`, { status });
      alert('Status klaim berhasil diperbarui');
      reFetch();
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal memperbarui status');
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'menunggu': return 'Menunggu Verifikasi';
      case 'ditolak': return 'Ditolak';
      case 'disetujui': return 'Disetujui';
      default: return status;
    }
  };

  const columns = [
    { 
      header: 'No', 
      width: '50px',
      render: (_, index) => <span className="text-[#2D3E50] font-bold">{String(index + 1).padStart(3, '0')}</span>
    },
    { 
      header: 'Informasi User', 
      align: 'left',
      width: '200px',
      render: (row) => (
        <div className="flex flex-col items-start px-4">
          <p className="font-bold text-[#2D3E50] text-sm">{row.user?.nama || '-'}</p>
          <p className="text-[10px] text-gray-400">{row.user?.email || '-'}</p>
        </div>
      )
    },
    { 
      header: 'Barang Yang Diklaim', 
      align: 'left',
      width: '200px',
      render: (row) => (
        <div className="flex flex-col items-start px-4">
          <p className="font-bold text-[#2D3E50] text-sm">{row.temuan?.barang?.nama_barang || '-'}</p>
          <p className="text-[10px] text-[#D4B04C] font-bold">Kode: {row.temuan?.barang?.kode_barang || '-'}</p>
        </div>
      )
    },
    { 
      header: 'Tanggal Klaim', 
      width: '120px',
      render: (row) => (
        <p className="text-[13px] text-gray-600 font-medium">{row.tanggal_klaim}</p>
      )
    },
    { 
      header: 'Status Verifikasi', 
      width: '150px',
      render: (row) => {
        const getStatusStyles = (status) => {
          switch (status) {
            case 'menunggu': return 'bg-[#FFF9E6] text-[#D4A017] border-[#FFEBB3]';
            case 'ditolak': return 'bg-[#FFF0F0] text-[#CC7171] border-[#FFDEDE]';
            case 'disetujui': return 'bg-[#F0FFF4] text-[#38A169] border-[#C6F6D5]';
            default: return 'bg-gray-100 text-gray-600 border-gray-200';
          }
        };

        return (
          <div className="px-2">
            <div className={`px-2 py-1.5 rounded-xl text-[10px] font-extrabold border text-center shadow-sm ${getStatusStyles(row.status)}`}>
              {getStatusLabel(row.status).toUpperCase()}
            </div>
          </div>
        )
      }
    },
    {
      header: 'Tindakan',
      width: '150px',
      render: (row) => (
        <div className="flex gap-2 justify-center">
          {row.status === 'menunggu' && (
            <>
              <button 
                onClick={() => handleVerify(row.klaim_id, 'disetujui')}
                className="w-8 h-8 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-sm flex items-center justify-center"
                title="Setujui"
              >
                <Check size={16} />
              </button>
              <button 
                onClick={() => handleVerify(row.klaim_id, 'ditolak')}
                className="w-8 h-8 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm flex items-center justify-center"
                title="Tolak"
              >
                <X size={16} />
              </button>
            </>
          )}
          <button 
            onClick={() => openDetail(row)}
            className="w-8 h-8 bg-[#2D3E50] text-white rounded-lg hover:bg-[#1a2538] transition-all shadow-sm flex items-center justify-center"
            title="Lihat Detail Bukti"
          >
            <FiEye size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white min-h-screen font-['Montserrat']">
      <h1 className="text-xl md:text-2xl font-bold text-[#2D3E50] mb-6 md:mb-8">Laporan Klaim Barang</h1>

      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-6 gap-4">
        <div className="relative w-full max-w-full sm:max-w-md">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-1 focus:ring-[#D4B04C] outline-none text-sm transition-all"
            placeholder="Cari..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <ReusableTable columns={columns} data={filteredKlaim} />
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && selectedKlaim && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row"
            >
              <div className="md:w-1/2 h-80 md:h-auto bg-gray-100 relative group">
                {selectedKlaim.bukti_foto ? (
                  <img 
                    src={`http://localhost:8000/storage/bukti_klaim/${selectedKlaim.bukti_foto}`} 
                    alt="Bukti Kepemilikan"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                    <ImageIcon size={48} />
                    <span className="font-bold">TIDAK ADA FOTO BUKTI</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-[#D4B04C] text-white px-4 py-1.5 rounded-full text-[10px] font-bold shadow-lg">
                  BUKTI KEPEMILIKAN
                </div>
              </div>

              <div className="md:w-1/2 p-8 relative flex flex-col max-h-[90vh] overflow-y-auto">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiX size={24} />
                </button>

                <h2 className="text-2xl font-bold text-[#2D3E50] mb-1">Detail Pengajuan Klaim</h2>
                <p className="text-gray-400 text-xs mb-6">ID Klaim: #{selectedKlaim.klaim_id}</p>

                <div className="space-y-6 flex-1">
                  <div className="bg-[#F8F9FA] p-4 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3 text-[#2D3E50]">
                      <User size={18} className="text-[#D4B04C]" />
                      <h3 className="font-bold text-sm">Informasi Pemohon</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 uppercase">Nama Lengkap</label>
                        <p className="text-xs font-semibold text-[#2D3E50]">{selectedKlaim.user?.nama || '-'}</p>
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-gray-400 uppercase">NIM / Email</label>
                        <p className="text-xs font-semibold text-[#2D3E50]">{selectedKlaim.user?.nim || selectedKlaim.user?.email || '-'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F8F9FA] p-4 rounded-2xl">
                    <div className="flex items-center gap-3 mb-3 text-[#2D3E50]">
                      <ImageIcon size={18} className="text-[#D4B04C]" />
                      <h3 className="font-bold text-sm">Barang yang Diklaim</h3>
                    </div>
                    <p className="text-xs font-semibold text-[#2D3E50] mb-1">{selectedKlaim.temuan?.barang?.nama_barang}</p>
                    <p className="text-[10px] text-[#D4B04C] font-bold mb-2">Kode: {selectedKlaim.temuan?.barang?.kode_barang}</p>
                    <p className="text-[10px] text-gray-500">{selectedKlaim.temuan?.barang?.deskripsi}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-[#2D3E50]">
                        <MapPin size={16} className="text-[#D4B04C]" />
                        <label className="text-[10px] font-bold uppercase tracking-wider">Tempat Kehilangan</label>
                      </div>
                      <p className="text-gray-600 text-xs bg-white border border-gray-100 p-3 rounded-xl leading-relaxed">
                        {selectedKlaim.tempat_kehilangan || 'Tidak diisi.'}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2 text-[#2D3E50]">
                        <FileText size={16} className="text-[#D4B04C]" />
                        <label className="text-[10px] font-bold uppercase tracking-wider">Verifikasi Kepemilikan</label>
                      </div>
                      <p className="text-gray-600 text-xs bg-white border border-gray-100 p-3 rounded-xl leading-relaxed italic">
                        "{selectedKlaim.verifikasi_kepemilikan || 'Tidak ada deskripsi bukti.'}"
                      </p>
                    </div>
                  </div>
                </div>

                {selectedKlaim.status === 'menunggu' && (
                  <div className="pt-6 mt-6 border-t border-gray-100 flex gap-3">
                    <button 
                      onClick={() => {
                        handleVerify(selectedKlaim.klaim_id, 'ditolak');
                        setIsModalOpen(false);
                      }}
                      className="flex-1 bg-red-50 text-red-500 font-bold py-3 rounded-xl hover:bg-red-100 transition-all text-xs flex items-center justify-center gap-2"
                    >
                      <X size={16} /> Tolak Klaim
                    </button>
                    <button 
                      onClick={() => {
                        handleVerify(selectedKlaim.klaim_id, 'disetujui');
                        setIsModalOpen(false);
                      }}
                      className="flex-1 bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 transition-all text-xs shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
                    >
                      <Check size={16} /> Setujui Klaim
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LaporanKlaimBarangPage;