import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [confirm, setConfirm] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null
  });

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const hideToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showConfirm = useCallback(({ title, message, onConfirm, onCancel }) => {
    setConfirm({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        if (onConfirm) onConfirm();
        setConfirm((prev) => ({ ...prev, isOpen: false }));
      },
      onCancel: () => {
        if (onCancel) onCancel();
        setConfirm((prev) => ({ ...prev, isOpen: false }));
      }
    });
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, showConfirm }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full font-['Montserrat']">
        {toasts.map((toast) => {
          let bgClass = 'bg-white text-slate-800 border-slate-100';
          let Icon = Info;
          let iconColor = 'text-blue-500';

          if (toast.type === 'success') {
            bgClass = 'bg-emerald-50 text-emerald-800 border-emerald-200/50';
            Icon = CheckCircle;
            iconColor = 'text-emerald-500';
          } else if (toast.type === 'error') {
            bgClass = 'bg-red-50 text-red-800 border-red-200/50';
            Icon = AlertCircle;
            iconColor = 'text-red-500';
          } else if (toast.type === 'info') {
            bgClass = 'bg-amber-50 text-amber-800 border-amber-200/50';
            Icon = Info;
            iconColor = 'text-[#EBB134]';
          }

          return (
            <div
              key={toast.id}
              className={`flex items-start gap-3 p-4 rounded-2xl border shadow-lg animate-slide-in transition-all duration-300 ${bgClass}`}
            >
              <Icon className={`${iconColor} shrink-0 mt-0.5`} size={18} />
              <div className="flex-1 text-xs font-semibold leading-relaxed">
                {toast.message}
              </div>
              <button
                onClick={() => hideToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 transition-colors border-none bg-transparent cursor-pointer shrink-0"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Confirm Modal */}
      {confirm.isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 font-['Montserrat']">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={confirm.onCancel}
          />
          
          {/* Card */}
          <div className="relative bg-white w-full max-w-md rounded-[28px] shadow-2xl p-6 border border-slate-100 transform scale-100 transition-transform duration-300 animate-scale-up z-10">
            <h3 className="text-[#273A5A] font-extrabold text-base mb-2">
              {confirm.title || 'Konfirmasi Tindakan'}
            </h3>
            <p className="text-slate-500 font-semibold text-xs sm:text-sm leading-relaxed mb-6">
              {confirm.message}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={confirm.onCancel}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#273A5A] rounded-xl font-bold text-xs cursor-pointer border-none transition-all duration-200"
              >
                Batal
              </button>
              <button
                onClick={confirm.onConfirm}
                className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-xs cursor-pointer border-none shadow-md shadow-red-500/10 hover:shadow-lg transition-all duration-200"
              >
                Ya, Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
