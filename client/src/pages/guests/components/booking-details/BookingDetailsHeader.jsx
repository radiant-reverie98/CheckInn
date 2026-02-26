import React, { useState } from 'react';
import { Copy, Check, FileText, Waves } from 'lucide-react';

const BookingDetailsHeader = ({ reservationId = "#BK12345" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(reservationId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="w-full bg-gradient-to-b from-blue-50/40 to-white border-b border-blue-50 pt-28 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start space-y-4">
          
          {/* Official Document Icon */}
          <div className="w-12 h-12 rounded-2xl bg-white border border-blue-100 flex items-center justify-center text-blue-500 shadow-sm mb-2">
            <FileText size={24} strokeWidth={1.5} />
          </div>

          <div className="space-y-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-[800] text-slate-950 tracking-tight">
              Booking <span className="italic font-serif text-slate-500">Details</span>
            </h1>
            
            {/* Minimal Aqua Accent */}
            <div className="h-1 w-16 bg-blue-400/40 rounded-full mx-auto md:mx-0"></div>
          </div>

          {/* Reservation ID with Copy Interaction */}
          <div className="flex items-center gap-3 py-2 px-4 bg-slate-50 border border-slate-100 rounded-xl">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.25em]">
              Reservation ID: <span className="text-slate-600 ml-1">{reservationId}</span>
            </p>
            
            <button 
              onClick={handleCopy}
              className="p-1.5 rounded-lg hover:bg-white hover:text-blue-600 text-slate-300 transition-all duration-300 flex items-center gap-1 group"
              title="Copy ID"
            >
              {copied ? (
                <Check size={14} className="text-teal-500" />
              ) : (
                <Copy size={14} className="group-hover:scale-110" />
              )}
            </button>
          </div>

          {/* Subtle Decorative Element */}
          <div className="pt-2 opacity-10 hidden md:block">
            <Waves size={40} className="text-blue-900" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default BookingDetailsHeader;