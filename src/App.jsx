import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom' // Tambahkan useLocation
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

// --- IMPORT HALAMAN STAFF BARU ---
import DashboardPage from './pages/staff/DashboardPage';
import Footerstaff from './components/staff/Footerstaff';

function App() {
  const [user, setUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [items, setItems] = useState(itemsData)
  
  const location = useLocation(); // Mendeteksi URL saat ini

  // Cek apakah halaman saat ini adalah halaman staff
  const isStaffPage = location.pathname.startsWith('/staff');

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
      <ScrollToTop />
      
      {/* Navbar HANYA muncul jika BUKAN halaman staff */}
      {!isStaffPage && (
        <Navbar 
          user={user} 
          onOpenLogin={() => setIsModalOpen(true)} 
        />
      )}
      
      <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onLogin={handleLogin} 
      />
      
      {/* Padding top 70px HANYA untuk halaman user biasa agar tidak tertutup Navbar */}
      <div style={{ paddingTop: isStaffPage ? '0px' : '70px', minHeight: '80vh' }}>
        <Routes>
          {/* --- ROUTE USER BIASA --- */}
          <Route path="/" element={<HomePage items={items} />} />
          <Route path="/barang-hilang" element={<LostItemsPage items={items} />} />
          <Route path="/barang-ditemukan" element={<FoundItemsPage items={items} />} />
          <Route path="/lapor" element={<ReportPage onAddItem={handleAddItem} />} />
          <Route path="/barang/:id" element={<TemuanDetailPage items={items} />} />
          <Route path="/profile" element={<ProfilePage user={user} onLogout={handleLogout} />} />
          <Route path="/riwayat-claim" element={<RiwayatClaimPage />} />
          <Route path="/klaim/:id" element={<KlaimBarangPage items={items} />} />
          <Route path="/barang-hilang/:id" element={<HilangDetailPage items={items} />} />
          <Route path="/pengembalian/:id" element={<PengembalianPage items={items} />} />
          <Route path="/pengambilan/:id" element={<PengambilanPage items={items} />} />

          {/* --- ROUTE STAFF (BARU) --- */}
          <Route path="/staff/dashboard" element={<DashboardPage />} />
          <Route path="/staff/footerstaff" element={<Footerstaff />} />
        </Routes>
      </div>
      
      {/* Footer HANYA muncul jika BUKAN halaman staff */}
      {!isStaffPage && <Footer />}
    </div>
  )
}

export default App