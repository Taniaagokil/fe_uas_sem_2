import React from 'react';
import { Package, HelpCircle, ClipboardCheck } from 'lucide-react';
import './StatCard.css';

const StatCard = ({ angka, teks }) => {
  // Determine icon based on the card text
  let Icon = Package;
  const gradientClass = "from-[#E6B331] to-[#d49f3e]"; // Unified Brand Yellow/Gold gradient

  if (teks === "Barang Hilang") {
    Icon = HelpCircle;
  } else if (teks === "Klaim Barang Hilang") {
    Icon = ClipboardCheck;
  }

  return (
    <div className={`bg-gradient-to-br ${gradientClass} text-white p-6 rounded-3xl shadow-md flex items-center justify-between w-full h-[120px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl font-['Montserrat'] cursor-pointer group`}>
      <div className="flex flex-col justify-center">
        <h2 className="text-4xl font-extrabold m-0 leading-none tracking-tight">{angka}</h2>
        <p className="text-xs md:text-sm font-bold mt-2.5 mb-0 tracking-wide opacity-90">{teks}</p>
      </div>
      <div className="p-2.5 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
        <Icon className="text-white w-7 h-7 stroke-[2]" />
      </div>
    </div>
  );
};

export default StatCard;