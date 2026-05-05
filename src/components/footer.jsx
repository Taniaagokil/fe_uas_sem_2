import React from 'react';
import { FaInstagram, FaTwitter, FaFacebook, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  const mainColor = '#273A5A';
  const accentGold = '#E2B053';

  const footerStyle = {
    backgroundColor: mainColor,
    color: 'white',
    fontFamily: "'Montserrat', sans-serif",
    padding: '60px 20px 20px 20px',
    marginTop: '80px',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    paddingBottom: '40px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  };

  const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const linkStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    fontSize: '14px',
    transition: '0.3s',
  };

  const socialIconStyle = {
    fontSize: '20px',
    color: 'white',
    marginRight: '15px',
    transition: '0.3s',
    cursor: 'pointer'
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        {/* Kolom 1: Branding */}
        <div style={columnStyle}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
            Voks<span style={{ color: accentGold }}>Find</span>
          </h2>
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.7)' }}>
            Platform resmi Lost & Found Fakultas Vokasi Universitas Brawijaya. 
            Membantu mahasiswa menemukan kembali barang berharga mereka.
          </p>
          
        </div>

        {/* Kolom 2: Tautan Cepat */}
        <div style={columnStyle}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '5px' }}>Tautan Cepat</h3>
          <a href="#" style={linkStyle}>Beranda</a>
          <a href="#" style={linkStyle}>Barang Hilang</a>
          <a href="#" style={linkStyle}>Barang Temuan</a>
          <a href="#" style={linkStyle}>Lapor Kehilangan</a>
        </div>

        {/* Kolom 3: Kontak */}
        <div style={columnStyle}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '5px' }}>Hubungi Kami</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
            <FaEnvelope style={{ color: accentGold }} />
            <span>vokasi@ub.ac.id</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'start', gap: '10px', fontSize: '14px' }}>
            <FaMapMarkerAlt style={{ color: accentGold, marginTop: '4px' }} />
            <span>Jl. Veteran No.12-14, Ketawanggede, Kec. Lowokwaru, Kota Malang</span>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div style={{ 
        textAlign: 'center', 
        paddingTop: '20px', 
        fontSize: '13px', 
        color: 'rgba(255, 255, 255, 0.5)',
        fontWeight: 500
      }}>
        © 2026 VoksFind. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;