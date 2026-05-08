import React from 'react';
import ReusableTable from '../../components/staff/table'; // Sesuaikan path ini
import { Search, PencilLine } from 'lucide-react';

const LaporanKlaimPage = () => {
  // Data dummy sesuai dengan foto yang kamu kirim
  const dataKlaim = [
    { id: '034', nama: 'Seila Salsabiela', barang: 'Iphone 17 Promax', tanggal: '15 Januari 2026', status: 'Menunggu Verifikasi' },
    { id: '032', nama: 'Tania Hertawan', barang: 'Earbuds Baseus', tanggal: '15 Januari 2026', status: 'Ditolak' },
    { id: '050', nama: 'Tania Hertawan', barang: 'Tas It Is Yours', tanggal: '15 Januari 2026', status: 'Disetujui' },
    { id: '050', nama: 'Tania Hertawan', barang: 'Iphone 14 Promax', tanggal: '15 Januari 2026', status: 'Arsip' },
  ];

  // Fungsi untuk menentukan warna background status
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Menunggu Verifikasi':
        return 'bg-[#FFE492] text-[#B8860B]'; // Kuning Muda
      case 'Ditolak':
        return 'bg-[#E35D5D] text-white';      // Merah
      case 'Disetujui':
        return 'bg-[#91FF75] text-[#2D5A27]'; // Hijau Muda
      case 'Arsip':
        return 'bg-[#BDBDBD] text-white';      // Abu-abu
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  const columns = [
    { header: 'Kode', key: 'id', width: '10%' },
    { header: 'Nama Klaim', key: 'nama', width: '25%' },
    { header: 'Barang', key: 'barang', width: '20%' },
    { header: 'Tanggal', key: 'tanggal', width: '20%' },
    { 
      header: 'Status', 
      width: '15%',
      render: (row) => (
        <div className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${getStatusStyle(row.status)}`}>
          {row.status}
        </div>
      )
    },
    {
      header: 'Aksi',
      width: '10%',
      render: (row) => (
        <button 
          onClick={() => console.log("Edit klaim:", row.id)}
          className="p-2 bg-[#2D3E50] text-white rounded-md hover:bg-opacity-80 transition-all shadow-sm"
        >
          <PencilLine size={18} />
        </button>
      ),
    },
  ];

  return (
    <div className="p-8 bg-white min-h-screen font-['Montserrat']">
      {/* Judul Halaman */}
      <h1 className="text-2xl font-bold text-[#2D3E50] mb-8">Laporan Klaim Barang</h1>

      {/* Search Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <Search size={20} />
          </span>
          <input
            type="text"
            placeholder="Cari..."
            className="w-full pl-11 pr-4 py-2.5 bg-[#F1F3F5] rounded-lg border-none focus:ring-2 focus:ring-[#D4B04C] transition-all outline-none text-sm"
          />
        </div>
      </div>

      {/* Tabel */}
      <div className="mt-4">
        <ReusableTable columns={columns} data={dataKlaim} />
      </div>
    </div>
  );
};

export default LaporanKlaimPage;