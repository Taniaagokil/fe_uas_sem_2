import React from 'react'

function Footer() {
  return (
    <footer style={{
      background: '#1f2937',
      color: 'white',
      padding: '40px 20px',
      marginTop: '50px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h3>VoksFind</h3>
        <p style={{ color: '#9ca3af' }}>
          Sistem Lost & Found Fakultas Vokasi UB
        </p>
        <p style={{ color: '#6b7280', marginTop: '20px', fontSize: '14px' }}>
          © 2026 VoksFind. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer