import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoLocationSharp, IoCalendarClear } from 'react-icons/io5';

function ItemCard({ item }) {
  const navigate = useNavigate();
  const themeColor = '#E2B053'; 
  const darkBlue = '#273A5A'; 

  return (
    <>
      <style>
        {`
          .item-card-hilang {
            transition: all 0.3s ease-in-out;
            cursor: pointer;
          }
          .item-card-hilang:hover {
            transform: translateY(-10px);
            box-shadow: 0 12px 25px rgba(39, 58, 90, 0.15) !important;
          }
          .item-card-hilang:hover .card-img-hilang {
            transform: scale(1.1);
          }
          .item-card-hilang:hover .detail-btn-hilang {
            background-color: #1c2b45 !important;
            box-shadow: 0 4px 12px rgba(39, 58, 90, 0.4) !important;
          }
        `}
      </style>

      <div className="item-card-hilang" 
        onClick={() => navigate(`/barang-hilang/${item.id}`)} // Navigasi saat kartu diklik
        style={{
          background: '#F8F9FA',
          borderRadius: '20px', 
          overflow: 'hidden',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          fontFamily: "'Montserrat', sans-serif",
          padding: '10px', 
          maxWidth: '280px',
          position: 'relative'
        }}>
        
        <div style={{ borderRadius: '16px', overflow: 'hidden', height: '150px' }}>
          <img 
            className="card-img-hilang"
            src={item.foto || item.image || `https://via.placeholder.com/400x300?text=${item.nama}`} 
            alt={item.nama}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          />
        </div>

        <div style={{ padding: '12px 6px 4px 6px' }}>
          <h3 style={{ 
            margin: '0 0 10px 0', fontSize: '16px', fontWeight: '800', color: darkBlue,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' 
          }}>
            {item.nama}
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
            <div style={{...detailRowStyle, color: darkBlue}}>
              <HiOutlineOfficeBuilding style={{ color: themeColor, fontSize: '15px' }} />
              <span style={{ opacity: 0.8 }}>{item.lokasi || 'Vokasi Veteran'}</span>
            </div>
            <div style={{...detailRowStyle, color: darkBlue}}>
              <IoLocationSharp style={{ color: themeColor, fontSize: '15px' }} />
              <span style={{ opacity: 0.8 }}>{item.lokasiDetail || item.lokasi}</span>
            </div>
            <div style={{...detailRowStyle, color: darkBlue}}>
              <IoCalendarClear style={{ color: themeColor, fontSize: '15px' }} />
              <span style={{ opacity: 0.8 }}>{item.tanggal}</span>
            </div>
          </div>

          <button 
            className="detail-btn-hilang"
            style={{
              width: '100%', padding: '10px', background: darkBlue, color: 'white',
              border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '14px', 
            }}
          >
            Hubungi Staff
          </button>
        </div>
      </div>
    </>
  );
}

const detailRowStyle = { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: '600' };

export default ItemCard;