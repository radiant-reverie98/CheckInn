import React from 'react';
import { Briefcase, Waves } from 'lucide-react';

const MyBookingsHeader = () => {
  return (
    <header className="w-full bg-gradient-to-b from-blue-50/50 to-white border-b border-blue-50/50 pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          
          {/* Subtle Nautical Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-700">
            <Briefcase size={14} className="text-blue-500" />
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.3em]">
              Guest Portal
            </span>
          </div>

          {/* Main Identity */}
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-[800] text-slate-950 tracking-tight">
              My <span className="italic font-serif text-slate-500">Bookings</span>
            </h1>
            
            {/* Soft Ocean Accent Underline */}
            <div className="h-1 w-20 bg-gradient-to-r from-blue-400/60 to-transparent rounded-full mx-auto md:mx-0"></div>
          </div>

          {/* Reassuring Subtext */}
          <p className="text-slate-500 text-base md:text-lg font-medium max-w-xl leading-relaxed">
            Manage and review your upcoming and past stays. Your sanctuaries are waiting for your return.
          </p>

          {/* Decorative Wave Divider */}
          <div className="pt-4 opacity-20">
            <Waves size={32} className="text-blue-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MyBookingsHeader;