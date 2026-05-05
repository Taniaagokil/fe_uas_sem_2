import React from 'react'
import { Link } from 'react-router-dom'

function BarangTemuanFound() {
  // Data barang temuan
  const barangTemuan = [
    {
      id: 1,
      kategori: 'Elektronik',
      nama: 'Iphone 17 Pro Max',
      lokasi: 'Vokasi Veteran - Gedung BNI',
      lokasiDetail: 'Meja Vokantin',
      tanggal: '1 Desember 2025',
      status: 'found'
    },
    {
      id: 2,
      kategori: 'Botol',
      nama: 'Tumblr Tuku KAI',
      lokasi: 'Vokasi Veteran - Gedung Perbankan',
      lokasiDetail: 'Lt. 2',
      tanggal: '29 November 2025',
      status: 'found'
    },
    {
      id: 3,
      kategori: 'Boneka',
      nama: 'Labubu',
      lokasi: 'Vokasi Veteran - Gedung BNI',
      lokasiDetail: 'Toilet Adbis',
      tanggal: '29 November 2025',
      status: 'found'
    },
    {
      id: 4,
      kategori: 'Elektronik',
      nama: 'i watch',
      lokasi: 'Vokasi Dieng',
      lokasiDetail: 'Vocafe',
      tanggal: '28 November',
      status: 'found'
    }
  ]

  // Konfigurasi ikon berdasarkan kategori
  const kategoriIcons = {
    elektronik: '📱',
    botol: '🍶',
    boneka: '🧸'
  }

  const styles = {
    container: {
      maxWidth: '420px',
      margin: '0 auto',
      background: 'white',
      borderRadius: '20px',
      padding: '24px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      boxShadow: '0 2px 20px rgba(0,0,0,0.08)'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '24px'
    },
    headerIcon: {
      width: '44px',
      height: '44px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #4A90D9, #357ABD)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '22px',
      color: 'white'
    },
    headerTitle: {
      fontSize: '22px',
      fontWeight: '700',
      color: '#1a1a1a',
      margin: 0
    },
    headerHighlight: {
      color: '#4A90D9'
    },
    sectionLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '16px'
    },
    sectionBar: {
      width: '4px',
      height: '20px',
      background: '#4A90D9',
      borderRadius: '2px'
    },
    sectionText: {
      fontSize: '16px',
      fontWeight: '700',
      color: '#1a1a1a',
      margin: 0
    },
    cardList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    card: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px',
      border: '1.5px solid #e8e8e8',
      borderRadius: '14px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      background: 'white'
    },
    cardIcon: {
      width: '46px',
      height: '46px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '22px',
      flexShrink: 0
    },
    cardContent: {
      flex: 1,
      minWidth: 0
    },
    kategoriBadge: {
      display: 'inline-block',
      fontSize: '10px',
      fontWeight: '600',
      padding: '3px 8px',
      borderRadius: '20px',
      marginBottom: '4px',
      letterSpacing: '0.3px'
    },
    namaBarang: {
      fontSize: '15px',
      fontWeight: '700',
      color: '#1a1a1a',
      margin: '0 0 3px 0'
    },
    infoText: {
      fontSize: '12px',
      color: '#999',
      margin: '0 0 1px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    detailLink: {
      fontSize: '12px',
      fontWeight: '600',
      color: '#4A90D9',
      textDecoration: 'none',
      marginTop: '4px',
      display: 'inline-block',
      cursor: 'pointer'
    },
    arrowIcon: {
      fontSize: '18px',
      color: '#ccc',
      flexShrink: 0
    }
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerIcon}>📦</div>
        <h1 style={styles.headerTitle}>
          Barang Temuan <span style={styles.headerHighlight}>Found</span>
        </h1>
      </div>

      {/* Section: Baru Ditemukan */}
      <div style={styles.sectionLabel}>
        <div style={styles.sectionBar}></div>
        <h2 style={styles.sectionText}>Baru Ditemukan</h2>
      </div>

      {/* List Card */}
      <div style={styles.cardList}>
        {barangTemuan.map((item) => {
          const kat = item.kategori.toLowerCase()
          const icon = kategoriIcons[kat] || '📦'
          
          // Warna berdasarkan kategori
          const colors = {
            elektronik: { bg: '#E8F0FE', text: '#4A90D9', badgeBg: '#E8F0FE', badgeText: '#4A90D9' },
            botol: { bg: '#E8F8F0', text: '#2ECC71', badgeBg: '#E8F8F0', badgeText: '#2ECC71' },
            boneka: { bg: '#FFF0F0', text: '#E74C3C', badgeBg: '#FFF0F0', badgeText: '#E74C3C' }
          }
          const color = colors[kat] || { bg: '#F0F0F0', text: '#666', badgeBg: '#F0F0F0', badgeText: '#666' }

          return (
            <div 
              key={item.id}
              style={styles.card}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#4A90D9'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(74, 144, 217, 0.1)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e8e8e8'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Ikon Kategori */}
              <div style={{
                ...styles.cardIcon,
                backgroundColor: color.bg,
                color: color.text
              }}>
                {icon}
              </div>

              {/* Konten */}
              <div style={styles.cardContent}>
                {/* Badge Kategori */}
                <span style={{
                  ...styles.kategoriBadge,
                  backgroundColor: color.badgeBg,
                  color: color.badgeText
                }}>
                  {item.kategori}
                </span>
                
                {/* Nama Barang */}
                <h3 style={styles.namaBarang}>{item.nama}</h3>
                
                {/* Lokasi */}
                <p style={styles.infoText}>📍 {item.lokasi}</p>
                
                {/* Lokasi Detail */}
                <p style={styles.infoText}>📍 {item.lokasiDetail}</p>
                
                {/* Tanggal */}
                <p style={styles.infoText}>📅 {item.tanggal}</p>
                
                {/* Link Detail */}
                <Link 
                  to={`/barang/${item.id}`} 
                  style={styles.detailLink}
                  onMouseEnter={(e) => e.target.style.color = '#2a6db5'}
                  onMouseLeave={(e) => e.target.style.color = '#4A90D9'}
                >
                  Lihat Detail
                </Link>
              </div>

              {/* Arrow */}
              <span style={styles.arrowIcon}>›</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BarangTemuanFound