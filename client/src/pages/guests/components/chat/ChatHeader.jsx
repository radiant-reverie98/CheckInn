import React from 'react';
import { ChevronLeft, Calendar, ExternalLink, Circle, Waves } from 'lucide-react';

const ChatHeader = ({ 
  hotelName = "Azure Bay Sanctuary", 
  bookingId = "#BK12345", 
  checkIn = "Oct 12", 
  checkOut = "Oct 15", 
  status = "Active" 
}) => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-blue-50/50 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left Section: Identity & Navigation */}
          <div className="flex items-center gap-5 w-full md:w-auto">
            <button className="p-2 -ml-2 rounded-full hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-all duration-300">
              <ChevronLeft size={20} />
            </button>
            
            <div className="space-y-0.5">
              <h1 className="text-lg font-[800] text-slate-950 tracking-tight leading-none">
                {hotelName}
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                Concierge <span className="text-blue-200 mx-1">|</span> {bookingId}
              </p>
            </div>
          </div>

          {/* Center Section: Stay Context */}
          <div className="flex items-center gap-3 px-5 py-2 bg-slate-50/50 border border-blue-50/50 rounded-2xl shadow-sm">
            <Calendar size={14} className="text-blue-400" />
            <p className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">
              {checkIn} <span className="text-blue-200 mx-2">→</span> {checkOut}
            </p>
          </div>

          {/* Right Section: Status & Actions */}
          <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
            {/* Status Indicator */}
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center">
                <Circle size={8} className={`${status === 'Active' ? 'fill-teal-400 text-teal-400' : 'fill-slate-300 text-slate-300'}`} />
                {status === 'Active' && (
                  <Circle size={16} className="absolute fill-teal-400 text-teal-400 animate-ping opacity-20" />
                )}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${status === 'Active' ? 'text-teal-600' : 'text-slate-400'}`}>
                Chat {status}
              </span>
            </div>

            <div className="h-4 w-px bg-slate-100 hidden md:block"></div>

            <button className="flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:text-slate-950 transition-colors group">
              View Booking
              <ExternalLink size={12} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>
      </div>
      
      {/* Subtle Bottom Wave Accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-100/50 to-transparent"></div>
    </header>
  );
};

export default ChatHeader;