import React from 'react';
import './Footerstaff.css';

const FooterStaff = () => {
  return (
    <footer className="w-full py-6 px-4 md:px-8 bg-transparent border-t border-slate-100 mt-auto font-['Montserrat']">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-400 font-medium m-0">
          Copyright © | By VoksFind
        </p>
      </div>
    </footer>
  );
};

export default FooterStaff;