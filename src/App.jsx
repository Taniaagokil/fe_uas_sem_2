import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'
import Filterbar from './components/Filterbar'
import HomePage from './pages/HomePage'
import LostItemsPage from './pages/LostItemsPage'
import FoundItemsPage from './pages/FoundItemsPage'
import ReportPage from './pages/ReportPage'
import ItemDetailPage from './pages/ItemDetailPage'
import LoginPage from './pages/LoginPage'
import { itemsData } from './data/dummyData' // Import data dummy

function App() {
  // State untuk menyimpan user yang login
  const [user, setUser] = useState(null)
  
  // State untuk menyimpan data barang
  const [items, setItems] = useState(itemsData)

  // Fungsi login
  const handleLogin = (userData) => {
    setUser(userData)
  }

  // Fungsi logout
  const handleLogout = () => {
    setUser(null)
  }

  // Fungsi tambah barang baru
  const handleAddItem = (newItem) => {
    setItems([...items, { ...newItem, id: Date.now() }])
  }

  return (
    <div>
      {/* Navbar selalu muncul di semua halaman */}
      <Navbar user={user} onLogout={handleLogout} />
      
      {/* Konten halaman berubah sesuai URL */}
      <div style={{ paddingTop: '70px', minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<HomePage items={items} />} />
          <Route path="/barang-hilang" element={<LostItemsPage items={items} />} />
          <Route path="/barang-ditemukan" element={<FoundItemsPage items={items} />} />
          <Route path="/lapor" element={<ReportPage onAddItem={handleAddItem} />} />
          <Route path="/barang/:id" element={<ItemDetailPage items={items} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        </Routes>
      </div>
      
      {/* Footer selalu muncul di semua halaman */}
      <Footer />
    </div>
  )
}

export default App