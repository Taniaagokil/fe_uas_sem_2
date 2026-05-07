import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'
import HomePage from './pages/HomePage'
import LostItemsPage from './pages/LostItemsPage'
import FoundItemsPage from './pages/FoundItemsPage'
import ReportPage from './pages/ReportPage'
import TemuanDetailPage from './pages/TemuanDetailPage'
import ProfilePage from './pages/ProfilePage'
import RiwayatClaimPage from './pages/RiwayatClaimPage'
import KlaimBarangPage from './pages/KlaimBarangPage';
import HilangDetailPage from './pages/HilangDetailPage';
import PengembalianPage from './pages/PengembalianPage';
import PengambilanPage from './pages/PengambilanPage';
import ScrollToTop from './components/ScrollToTop'
import { itemsData } from './data/dummyData'

function App() {
  const [user, setUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [items, setItems] = useState(itemsData)

  const handleLogin = (userData) => {
    setUser(userData)
    setIsModalOpen(false) 
  }

  const handleLogout = () => {
    setUser(null)
  }

  const handleAddItem = (newItem) => {
    setItems([...items, { ...newItem, id: Date.now() }])
  }

  return (
    <div>
      {/* Taruh ScrollToTop di sini agar bekerja di semua halaman */}
      <ScrollToTop />
      
      <Navbar 
        user={user} 
        onOpenLogin={() => setIsModalOpen(true)} 
      />
      
      <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onLogin={handleLogin} 
      />
      
      <div style={{ paddingTop: '70px', minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<HomePage items={items} />} />
          <Route path="/barang-hilang" element={<LostItemsPage items={items} />} />
          <Route path="/barang-ditemukan" element={<FoundItemsPage items={items} />} />
          <Route path="/lapor" element={<ReportPage onAddItem={handleAddItem} />} />
          <Route path="/barang/:id" element={<TemuanDetailPage items={items} />} />
          <Route path="/profile" element={<ProfilePage user={user} onLogout={handleLogout} />} />

          <Route path="/riwayat-claim" element={<RiwayatClaimPage />} />

          <Route path="/barang/:id" element={<TemuanDetailPage items={items} />} />
          <Route path="/riwayat-claim" element={<RiwayatClaimPage />} />
          <Route path="/klaim/:id" element={<KlaimBarangPage items={items} />} />
          <Route path="/barang-hilang/:id" element={<HilangDetailPage items={items} />} />
          <Route path="/pengembalian/:id" element={<PengembalianPage items={items} />} />
          <Route path="/pengambilan/:id" element={<PengambilanPage items={items} />} />
        </Routes>
      </div>
      
      <Footer />
    </div>
  )
}

export default App