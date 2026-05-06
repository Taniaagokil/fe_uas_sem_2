import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { IoLocationSharp, IoCalendarClear, IoCloudUploadOutline } from 'react-icons/io5';
import './KlaimBarangPage.css';

function KlaimBarangPage({ items = [] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Samakan logika pencarian dengan TemuanDetailPage
  const item = items.find((target) => target.id.toString() === id.toString());

  if (!item) {
    return (
      <div className="error-screen">
        <h2 className="text-bold">Ups! Detail barang tidak ditemukan.</h2>
        <button onClick={() => navigate('/')} className="btn-gold-klaim">Kembali ke Beranda</button>
      </div>
    );
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) setSelectedFile(e.target.files[0].name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setShowPopup(true);
      setIsSubmitting(false);
      setTimeout(() => {
        setShowPopup(false);
        navigate('/riwayat-claim'); 
      }, 2300);
    }, 600);
  };

  return (
    <div className="klaim-page-container animate-fade-in-page">
      <div className="klaim-wrapper">
        <h1 className="klaim-header-text text-extra-bold">
          Klaim <span className="text-yellow">Barang</span>
        </h1>

        {/* Card Info Barang - Diambil dari data yang sama dengan Detail Page */}
        <div className="klaim-preview-card">
          <div className="klaim-image-box">
            <img src={item.foto || item.image} alt={item.nama} />
          </div>
          <div className="klaim-info-box">
            <div className="klaim-badge-cat text-bold">{item.kategori || 'Elektronik'}</div>
            <h2 className="item-title-name text-extra-bold">{item.nama}</h2>
            <div className="item-metadata">
              <div className="meta-line text-bold">
                <HiOutlineOfficeBuilding className="icon-gold-style" /> 
                <span>{item.lokasi || 'Vokasi Veteran - Gedung BNI'}</span>
              </div>
              <div className="meta-line text-bold">
                <IoLocationSharp className="icon-gold-style" /> 
                <span>{item.lokasiDetail || 'Meja Vokantin'}</span>
              </div>
              <div className="meta-line text-bold">
                <IoCalendarClear className="icon-gold-style" /> 
                <span>{item.tanggal || '1 Desember 2025'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Klaim */}
        <form onSubmit={handleSubmit} className="klaim-form-body">
          <div className="form-input-group">
            <label className="text-extra-bold">Bukti Foto Kepemilikan <span className="text-danger">*</span></label>
            <div className="upload-container klik-bounce" onClick={() => document.getElementById('fileInput').click()}>
              <div className="upload-inner-content">
                <IoCloudUploadOutline className="icon-upload-center" />
                <span className="text-bold">{selectedFile ? selectedFile : 'Upload Foto Barang'}</span>
              </div>
              <input type="file" id="fileInput" hidden onChange={handleFileChange} required />
            </div>
          </div>

          <div className="form-input-group">
            <label className="text-extra-bold">Verifikasi Kepemilikan Barang <span className="text-danger">*</span></label>
            <input type="text" className="klaim-input text-regular" placeholder="Contoh: Kode Ponsel, Baret Khas" required />
          </div>

          <div className="form-input-group">
            <label className="text-extra-bold">Tempat Kehilangan Terakhir <span className="text-danger">*</span></label>
            <textarea className="klaim-input text-regular" placeholder="Deskripsikan tempat..." rows="3" required />
          </div>

          <div className="klaim-btn-row">
            <button type="button" className="btn-back-navy text-bold klik-bounce" onClick={() => navigate(-1)}>Kembali</button>
            <button type="submit" className={`btn-submit-gold text-bold ${isSubmitting ? 'loading' : 'klik-bounce'}`}>
              {isSubmitting ? 'Mengirim...' : 'Klaim Barang'}
            </button>
          </div>
        </form>
      </div>

      {/* SUCCESS POPUP WITH BOUNCE ANIMATION */}
      {showPopup && (
        <div className="modal-overlay">
          <div className="modal-card animate-bounce-in">
            <div className="check-circle">✓</div>
            <h3 className="text-extra-bold">Berhasil Diajukan!</h3>
            <p className="text-regular">Mengarahkan ke halaman riwayat...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default KlaimBarangPage;