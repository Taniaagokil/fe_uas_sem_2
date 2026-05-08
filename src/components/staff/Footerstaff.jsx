import React from 'react';
import './Footerstaff.css';

// Pastikan nama variabel ini ADA dan SAMA dengan yang di export default
const FooterStaff = () => {
  return (
    <footer className="dashboard-footer" style={{ marginTop: 'auto', padding: '20px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ color: '#a0aabf', fontSize: '14px', margin: 0 }}>
          Copyright © | By VoksFind
        </p>
        
      </div>
    </footer>
  );
};

export default FooterStaff;