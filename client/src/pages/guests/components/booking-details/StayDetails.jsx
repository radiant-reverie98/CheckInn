import React from 'react';
import { Calendar, Users, Moon, Edit2, Waves } from 'lucide-react';

const StayDetailsCard = ({ 
  checkIn = "Oct 12, 2026", 
  checkOut = "Oct 15, 2026", 
  nights = 3, 
  guests = "2 Adults, 1 Child",
  canEdit = true 
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 mb-8">
      <div className="bg-white rounded-[2.5rem] border border-blue-50 p-8 md:p-10 shadow-[0_20px_50px_rgba(30,58,138,0.04)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(30,58,138,0.08)]">
        
        {/* Header with optional Edit action */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-blue-400 rounded-full"></div>
            <h2 className="text-xl font-[800] text-slate-950 tracking-tight uppercase">
              Stay <span className="italic font-serif text-slate-500 lowercase">Details</span>
            </h2>
          </div>
          
          {canEdit && (
            <button className="flex items-center gap-2 text-[10px] font-bold text-blue-500 uppercase tracking-widest hover:text-slate-950 transition-colors group">
              <Edit2 size={12} className="group-hover:-rotate-12 transition-transform" />
              Edit Stay
            </button>
          )}
        </div>

        {/* Date Section: Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
          {/* Check-In */}
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
              <Calendar size={22} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Check-In</p>
              <p className="text-xl font-bold text-slate-950 tracking-tight">{checkIn}</p>
              <p className="text-xs text-slate-400 mt-1 font-medium italic text-balance">After 3:00 PM</p>
            </div>
          </div>

          {/* Check-Out */}
          <div className="flex items-start gap-5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
              <Calendar size={22} strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Check-Out</p>
              <p className="text-xl font-bold text-slate-950 tracking-tight">{checkOut}</p>
              <p className="text-xs text-slate-400 mt-1 font-medium italic">Before 11:00 AM</p>
            </div>
          </div>

          {/* Subtle Vertical Divider (Desktop Only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-50 to-transparent"></div>
        </div>

        {/* Horizontal Divider: Subtle Aqua Line */}
        <div className="my-10 relative">
          <div className="h-px w-full bg-blue-50"></div>
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6">
            <div className="flex items-center gap-2 py-1.5 px-4 bg-blue-50/50 rounded-full border border-blue-50">
              <Moon size={12} className="text-blue-400" />
              <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{nights} Nights</span>
            </div>
          </div>
        </div>

        {/* Guest Information Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-5">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
            <Users size={22} strokeWidth={1.5} />
          </div>
          <div className="text-center md:text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Guest Information</p>
            <p className="text-lg font-bold text-slate-950 tracking-tight">{guests}</p>
            <p className="text-xs text-slate-400 mt-1 font-medium leading-relaxed">
              Breakfast included for all registered guests as per resort sanctuary policy.
            </p>
          </div>
        </div>

        {/* Decorative Wave Detail */}
        <div className="absolute bottom-4 right-8 opacity-5 pointer-events-none">
          <Waves size={60} className="text-blue-900" />
        </div>
      </div>
    </div>
  );
};

export default StayDetailsCard;