import React from 'react'
import { useParams } from 'react-router-dom'

function ItemDetailPage({ items }) {
  const { id } = useParams()
  const item = items.find(i => i.id === parseInt(id))

  if (!item) return <div style={{textAlign: 'center', padding: 50}}>Barang tidak ditemukan</div>

  return (
    <div style={{padding: 30, maxWidth: 800, margin: '0 auto'}}>
      <h1>{item.nama}</h1>
      <p>Kategori: {item.kategori}</p>
      <p>Lokasi: {item.lokasi}</p>
      <p>Status: {item.status}</p>
      <p>Tanggal: {item.tanggal}</p>
      <p>Pelapor: {item.pelapor}</p>
    </div>
  )
}

export default ItemDetailPage