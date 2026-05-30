import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const StatusDropdown = ({ value, onChange, options, statusStyles }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className="relative inline-block w-full max-w-[170px]" ref={dropdownRef}>
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between text-xs font-bold rounded-full px-4 py-2 cursor-pointer shadow-sm uppercase tracking-wider transition-all duration-200 ${statusStyles(value)}`}
      >
        <span className="flex-1 text-center truncate">{selectedOption?.label}</span>
        <FiChevronDown className={`ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} shrink-0`} size={14} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 z-[90] mt-1.5 w-full bg-white rounded-xl shadow-lg border border-slate-100 py-1 overflow-hidden"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full text-center px-4 py-2.5 text-xs font-bold uppercase transition-colors duration-150 cursor-pointer ${
                  opt.value === value 
                    ? 'bg-slate-100 text-[#263959]' 
                    : 'text-[#263959]/75 hover:bg-slate-50 hover:text-[#263959]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatusDropdown;
