import React, { useState, useContext } from 'react'
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
import { AuthContext } from './contexts/AuthContext'

// --- IMPORT HALAMAN STAFF ---
import DashboardPage from './pages/staff/DashboardPage';
import Sidebar from './components/staff/Sidebar';
import BarangTemuanPage from './pages/staff/BarangTemuanPage';
import BarangHilangPage from './pages/staff/BarangHilangPage'; 
import BarangKategoriPage from './pages/staff/kategori/BarangPage';
import GedungPage from './pages/staff/kategori/GedungPage';
import LaporanKlaimBarangPage from './pages/staff/LaporanKlaimBarangPage';
import LoginStaffPage from './pages/staff/LoginStaffPage'; // <--- IMPORT LOGIN STAFF

function App() {
  const { user, logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const location = useLocation();

  // Cek apakah halaman saat ini adalah halaman dashboard staff (bukan login staff)
  const isStaffDashboard = location.pathname.startsWith('/staff') && location.pathname !== '/staff';
  const isStaffPage = location.pathname.startsWith('/staff');

  return (
    <div className={isStaffDashboard ? "flex flex-col md:flex-row bg-white min-h-screen" : ""}>
      <ScrollToTop />
      
      {/* Sidebar HANYA muncul jika di dashboard staff (BUKAN di login staff) */}
      {isStaffDashboard && <Sidebar />}

      <div className={isStaffDashboard ? "flex-1 flex flex-col overflow-hidden" : "w-full"}>
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
        />
        
        {/* Main Content Area */}
        <div style={{ paddingTop: isStaffDashboard ? '0px' : (isStaffPage ? '0px' : '70px'), minHeight: '80vh' }}>
          <Routes>
            {/* --- ROUTE USER BIASA --- */}
            <Route path="/" element={<HomePage />} />
            <Route path="/barang-hilang" element={<LostItemsPage />} />
            <Route path="/barang-ditemukan" element={<FoundItemsPage />} />
            <Route path="/lapor" element={<ReportPage />} />
            <Route path="/barang/:id" element={<TemuanDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/riwayat-claim" element={<RiwayatClaimPage />} />
            <Route path="/klaim/:id" element={<KlaimBarangPage />} />
            <Route path="/barang-hilang/:id" element={<HilangDetailPage />} />
            <Route path="/pengembalian/:id" element={<PengembalianPage />} />
            <Route path="/pengambilan/:id" element={<PengambilanPage />} />

            {/* --- ROUTE STAFF --- */}
            <Route path="/staff" element={<LoginStaffPage />} /> {/* <--- ROUTE LOGIN STAFF */}
            <Route path="/staff/dashboard" element={<DashboardPage />} />
            <Route path="/staff/barang-temuan" element={<BarangTemuanPage />} />
            <Route path="/staff/barang-hilang" element={<BarangHilangPage />} /> 
            <Route path="/staff/kategori/barang" element={<BarangKategoriPage />} />
            <Route path="/staff/kategori/gedung" element={<GedungPage />} /> 
            <Route path="/staff/laporan-klaim" element={<LaporanKlaimBarangPage />} />
            <Route path="/staff/login-staff" element={<LoginStaffPage />} />
          </Routes>
        </div>

        {/* Footer User biasa */}
        {!isStaffPage && <Footer />}
      </div>
    </div>
  )
}

export default App