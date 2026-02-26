import React, { useEffect } from 'react';
import { X, AlertCircle, Calendar, Waves } from 'lucide-react';

const CancelBookingModal = ({ isOpen, onClose, onConfirm, booking }) => {
  
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
      {/* 1. Backdrop with Sea-Glass Blur */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-500"
        onClick={onClose}
      ></div>

      {/* 2. Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(15,23,42,0.15)] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
        
        {/* Subtle Decorative Wave at top */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-100 to-transparent"></div>

        <div className="p-10 text-center md:text-left">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-400">
              <AlertCircle size={32} />
            </div>
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <h2 className="text-3xl font-[800] text-slate-950 tracking-tight mb-3">
            Cancel Your <span className="italic font-serif text-slate-500">Booking?</span>
          </h2>

          <p className="text-slate-500 text-lg font-medium leading-relaxed mb-8">
            Are you sure you want to cancel your stay at <span className="text-slate-900 font-bold">{booking?.hotelName || 'the resort'}</span>?
          </p>

          {/* Stay Recap - Mist Style */}
          <div className="bg-slate-50/50 border border-blue-50 rounded-3xl p-6 mb-8 flex items-center gap-6 justify-center md:justify-start">
            <div className="flex items-center gap-3 text-sm font-bold text-slate-700">
              <Calendar size={18} className="text-blue-400" />
              {booking?.checkIn} — {booking?.checkOut}
            </div>
            <div className="h-4 w-px bg-slate-200"></div>
            <div className="flex items-center gap-1.5 text-blue-600 text-[10px] font-[800] uppercase tracking-widest">
              <Waves size={14} />
              Ref: {booking?.id}
            </div>
          </div>

          {/* Warning Note */}
          <div className="flex items-start gap-3 mb-10 px-2">
            <p className="text-xs text-slate-400 font-medium leading-relaxed italic">
              <span className="text-red-400 font-bold mr-1">Note:</span> 
              This action cannot be undone. Cancellation fees may apply according to the resort's policy.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row-reverse gap-4">
            <button 
              onClick={onConfirm}
              className="flex-1 py-5 rounded-2xl bg-white border border-red-100 text-red-400 font-bold text-xs tracking-[0.3em] uppercase transition-all duration-500 hover:bg-red-50 hover:border-red-200 active:scale-95"
            >
              Yes, Cancel Booking
            </button>
            
            <button 
              onClick={onClose}
              className="flex-1 py-5 rounded-2xl bg-blue-600 text-white font-bold text-xs tracking-[0.3em] uppercase transition-all duration-500 shadow-xl shadow-blue-100 hover:bg-slate-950 hover:-translate-y-1 active:scale-95"
            >
              Keep My Booking
            </button>
          </div>
        </div>

        {/* Brand Footer */}
        <div className="py-4 bg-slate-50 border-t border-slate-100 flex justify-center">
          <p className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.5em]">
            CheckInn Sanctuary Services
          </p>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;