import React from 'react';
import { FaInstagram, FaTwitter, FaFacebook, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-[#273A5A] text-white font-['Montserrat'] pt-16 pb-8 px-4">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
        {/* Kolom 1: Branding */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold">
            Voks<span className="text-[#E2B053]">Find</span>
          </h2>
          <p className="text-sm leading-relaxed text-white/70 max-w-sm">
            Platform resmi Lost & Found Fakultas Vokasi Universitas Brawijaya. 
            Membantu mahasiswa menemukan kembali barang berharga mereka dengan sistem yang transparan dan efisien.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#E2B053] hover:text-white transition-all cursor-pointer">
              <FaInstagram size={20} />
            </div>
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#E2B053] hover:text-white transition-all cursor-pointer">
              <FaTwitter size={20} />
            </div>
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#E2B053] hover:text-white transition-all cursor-pointer">
              <FaFacebook size={20} />
            </div>
          </div>
        </div>

        {/* Kolom 2: Tautan Cepat */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold border-l-4 border-[#E2B053] pl-4 uppercase tracking-wider">Tautan Cepat</h3>
          <ul className="space-y-4 text-sm font-medium text-white/70">
            <li><a href="/" className="hover:text-[#E2B053] transition-colors">Beranda</a></li>
            <li><a href="/barang-hilang" className="hover:text-[#E2B053] transition-colors">Barang Hilang</a></li>
            <li><a href="/barang-ditemukan" className="hover:text-[#E2B053] transition-colors">Barang Temuan</a></li>
            <li><a href="/lapor" className="hover:text-[#E2B053] transition-colors">Lapor Kehilangan</a></li>
          </ul>
        </div>

        {/* Kolom 3: Kontak */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold border-l-4 border-[#E2B053] pl-4 uppercase tracking-wider">Hubungi Kami</h3>
          <div className="space-y-4 text-sm font-medium">
            <div className="flex items-start gap-3 text-white/70">
              <FaEnvelope className="text-[#E2B053] mt-1 shrink-0" />
              <span>vokasi@ub.ac.id</span>
            </div>
            <div className="flex items-start gap-3 text-white/70">
              <FaMapMarkerAlt className="text-[#E2B053] mt-1 shrink-0" />
              <span className="leading-relaxed">Jl. Veteran No.12-14, Ketawanggede, Kec. Lowokwaru, Kota Malang</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center pt-8 text-[11px] md:text-xs text-white/30 font-bold uppercase tracking-[0.2em]">
        © 2026 VoksFind UB. Designed for Excellence.
      </div>
    </footer>
  );
}

export default Footer;