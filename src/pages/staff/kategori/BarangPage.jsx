import React from 'react';
import ReusableTable from '../../../components/staff/table';
import { FiSearch, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

const BarangPage = () => {
  // Data dummy sesuai di gambar
  const data = [
    { id: 1, kategori: 'Elektronik' },
    { id: 2, kategori: 'Aksesoris' },
  ];

  // Definisi kolom menyesuaikan dengan props table.jsx kamu
  const columns = [
    { header: 'No', key: 'id', width: '10%' },
    { header: 'Kategori Barang', key: 'kategori', width: '70%' },
    { 
      header: 'Aksi', 
      key: 'aksi', 
      width: '20%',
      render: (row) => (
        <div className="flex gap-3 justify-center">
          {/* Tombol Edit */}
          <button className="p-2 bg-[#2D3E5E] text-white rounded-md hover:scale-110 transition-transform">
            <FiEdit size={18} />
          </button>
          {/* Tombol Delete */}
          <button className="p-2 bg-[#C64747] text-white rounded-md hover:scale-110 transition-transform">
            <FiTrash2 size={18} />
          </button>
        </div>
      )
    },
  ];

  return (
    <div className="p-8 w-full min-h-screen bg-white font-['Montserrat']">
      {/* Header Judul */}
      <h1 className="text-3xl font-bold text-[#2D3E5E] mb-8">Kelola Kategori</h1>

      {/* Baris Search dan Tambah */}
      <div className="flex justify-between items-center mb-6">
        {/* Search Input */}
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
            <FiSearch size={20} />
          </span>
          <input
            type="text"
            placeholder="Cari..."
            className="w-full pl-12 pr-4 py-3 bg-[#EDEDED] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4B04C] transition-all"
          />
        </div>

        {/* Tombol Tambah */}
        <button className="flex items-center gap-2 bg-[#2D3E5E] text-white px-5 py-3 rounded-xl font-bold hover:bg-[#1a2538] transition-colors shadow-md">
          <FiPlus size={20} strokeWidth={3} />
          <span>Tambah Kategori Barang</span>
        </button>
      </div>

      {/* Tabel */}
      <div className="mt-4">
        <ReusableTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default BarangPage;