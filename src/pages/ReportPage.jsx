import React, { useState } from 'react'

function ReportPage({ onAddItem }) {
  const [nama, setNama] = useState('')
  const [kategori, setKategori] = useState('')
  const [lokasi, setLokasi] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddItem({
      nama,
      kategori,
      lokasi,
      deskripsi: '-',
      status: 'lost',
      foto: 'https://picsum.photos/400/300',
      tanggal: new Date().toISOString().split('T')[0],
      pelapor: 'User'
    })
    alert('Laporan terkirim!')
    setNama('')
    setKategori('')
    setLokasi('')
  }

  return (
    <div style={{padding: 30, maxWidth: 500, margin: '0 auto'}}>
      <h1>Lapor Kehilangan</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nama Barang" value={nama} onChange={e => setNama(e.target.value)} required style={{width: '100%', padding: 10, marginBottom: 10}} />
        <select value={kategori} onChange={e => setKategori(e.target.value)} required style={{width: '100%', padding: 10, marginBottom: 10}}>
          <option value="">Kategori</option>
          <option>Elektronik</option>
          <option>Dokumen</option>
          <option>Dompet</option>
          <option>Lainnya</option>
        </select>
        <select value={lokasi} onChange={e => setLokasi(e.target.value)} required style={{width: '100%', padding: 10, marginBottom: 10}}>
          <option value="">Lokasi</option>
          <option>Gedung A</option>
          <option>Gedung B</option>
          <option>Gedung C</option>
        </select>
        <button type="submit" style={{width: '100%', padding: 10, background: '#2563eb', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer'}}>Kirim</button>
      </form>
    </div>
  )
}

export default ReportPage