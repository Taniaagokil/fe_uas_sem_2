import React from 'react'

function LostItemsPage({ items }) {
  const lost = items.filter(i => i.status === 'lost')
  
  return (
    <div style={{padding: 30, maxWidth: 1200, margin: '0 auto'}}>
      <h1 style={{textAlign: 'center'}}>Barang Hilang ({lost.length})</h1>
      {lost.map(item => (
        <div key={item.id} style={{border: '1px solid #ddd', padding: 15, margin: 10, borderRadius: 8}}>
          <h3>{item.nama}</h3>
          <p>{item.kategori} - {item.lokasi}</p>
          <p>{item.deskripsi}</p>
        </div>
      ))}
    </div>
  )
}

export default LostItemsPage