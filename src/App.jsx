import React, { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
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

// --- IMPORT HALAMAN STAFF ---
import DashboardPage from './pages/staff/DashboardPage';
import Sidebar from './components/staff/Sidebar';
import BarangTemuanPage from './pages/staff/BarangTemuanPage';
import BarangHilangPage from './pages/staff/BarangHilangPage'; 
import BarangKategoriPage from './pages/staff/kategori/BarangPage';
import GedungPage from './pages/staff/kategori/GedungPage'; // <--- IMPORT GEDUNG PAGE

function App() {
  const [user, setUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [items, setItems] = useState(itemsData)
  
  const location = useLocation();

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
    <div className={isStaffPage ? "flex bg-white min-h-screen" : ""}>
      <ScrollToTop />
      
      {/* Sidebar khusus Staff */}
      {isStaffPage && <Sidebar />}

      <div className={isStaffPage ? "flex-1 flex flex-col overflow-hidden" : "w-full"}>
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
        
        {/* Main Content Area */}
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

            {/* --- ROUTE STAFF --- */}
            <Route path="/staff/dashboard" element={<DashboardPage />} />
            <Route path="/staff/barang-temuan" element={<BarangTemuanPage />} />
            <Route path="/staff/barang-hilang" element={<BarangHilangPage />} /> 
            
            {/* Route Kelola Kategori */}
            <Route path="/staff/kategori/barang" element={<BarangKategoriPage />} />
            <Route path="/staff/kategori/gedung" element={<GedungPage />} /> {/* <--- TAMBAHKAN INI */}
            
            {/* Tambahkan route lain di sini seperti laporan-klaim */}
          </Routes>
        </div>

        {/* Footer User biasa */}
        {!isStaffPage && <Footer />}
      </div>
    </div>
  )
}

export default App