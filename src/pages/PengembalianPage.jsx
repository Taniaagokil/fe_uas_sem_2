import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoLocationSharp, IoCalendarClear, IoPeople } from 'react-icons/io5';
import './PengembalianPage.css';

function PengembalianPage({ items }) {
    const { id } = useParams();
    const navigate = useNavigate();

    // Cari item berdasarkan ID
    const item = items.find((i) => i.id === parseInt(id)) || items.find((i) => i.id === id);

    if (!item) return <div style={{ textAlign: 'center', padding: '100px' }}>Data tidak ditemukan</div>;

    return (
        <div className="pengembalian-wrapper">
            <h2 className="title-header">
                Pengembalian Barang <span>Hilang</span>
            </h2>

            {/* Info Item Card */}
            <div className="info-card-main">
                <img 
                    src={item.foto || item.image || "https://via.placeholder.com/200"} 
                    alt={item.nama} 
                    className="img-preview-small"
                />
                <div>
                   
                    <h1 className="item-title-small">{item.nama}</h1>
                    
                    <div className="detail-row-small">
                        <HiOutlineOfficeBuilding className="icon-gold" />
                        <span>{item.lokasi || 'Vokasi Veteran - Gedung BNI'}</span>
                    </div>
                    <div className="detail-row-small">
                        <IoLocationSharp className="icon-gold" />
                        <span>{item.lokasiDetail || 'Meja Vokantin'}</span>
                    </div>
                    <div className="detail-row-small">
                        <IoCalendarClear className="icon-gold" />
                        <span>{item.tanggal}</span>
                    </div>
                </div>
            </div>

            {/* Ruangan Staff Info */}
            <div className="staff-room-box">
                <IoPeople style={{ color: '#E2B053', fontSize: '30px' }} />
                <div>
                    Ruangan Staff <span>Lost And Found - Vokasi Veteran</span>
                </div>
            </div>

            {/* Action Button */}
            <button className="btn-full-back" onClick={() => navigate('/')}>
                Kembali ke beranda
            </button>
        </div>
    );
}

export default PengembalianPage;