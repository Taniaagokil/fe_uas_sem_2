import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoLocationSharp, IoCalendarClear } from 'react-icons/io5';
import './CardTemuan.css'; // Pastikan mengimpor file CSS-nya di sini

function CardTemuan({ item, isNew }) {
  const themeColor = '#E2B053'; // Untuk warna icon yang dinamis

  return (
    <div className="card-temuan">
      
      {/* Label Baru Ditemukan */}
      {isNew && (
        <div className="label-baru">
          Baru Ditemukan
        </div>
      )}

      {/* Container Gambar */}
      <div className="image-container-temuan">
        <img 
          className="card-img-temuan"
          src={item.foto || item.image || `https://via.placeholder.com/400x300?text=${item.nama}`} 
          alt={item.nama}
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/400x300?text=${item.nama}`
          }}
        />
      </div>

      {/* Info Content */}
      <div className="info-content-temuan">
        {/* Badge Kategori */}
        <div className="badge-kategori-temuan">
          {item.kategori}
        </div>

        {/* Nama Barang */}
        <h3 className="nama-barang-temuan">
          {item.nama}
        </h3>
        
        {/* Detail List */}
        <div className="detail-list-temuan">
          <div className="detail-row-temuan">
            <HiOutlineOfficeBuilding style={{ color: themeColor, fontSize: '15px' }} />
            <span>{item.lokasi || item.instansi || 'Vokasi Veteran'}</span>
          </div>
          <div className="detail-row-temuan">
            <IoLocationSharp style={{ color: themeColor, fontSize: '15px' }} />
            <span>{item.lokasiDetail || item.lokasi}</span>
          </div>
          <div className="detail-row-temuan">
            <IoCalendarClear style={{ color: themeColor, fontSize: '15px' }} />
            <span>{item.tanggal}</span>
          </div>
        </div>

        {/* Tombol Kuning - Lihat Detail */}
        <Link to={`/barang/${item.id}`} className="detail-btn-temuan">
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}

export default CardTemuan;