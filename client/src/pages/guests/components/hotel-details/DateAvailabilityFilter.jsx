import React from 'react';
import { Calendar, Search, ArrowRight, Compass } from 'lucide-react';


const DateAvailabilityFilter = ({ checkIn, checkOut, onDateChange, onSearch }) => {
  
  const today = new Date().toISOString().split('T')[0];

  const handleCheckInChange = (e) => {
    const newIn = e.target.value;
    onDateChange('checkIn', newIn);
    
    if (checkOut && newIn >= checkOut) {
      onDateChange('checkOut', '');
    }
  };

  const getMinCheckOut = () => {
    if (!checkIn) return today;
    const nextDay = new Date(checkIn);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split('T')[0];
  };

  const isFormValid = checkIn && checkOut;

  return (
    <div className="max-w-7xl mx-auto px-6 mb-16">
      {/* Sea-Glass Filter Container */}
      <div className="bg-white/60 backdrop-blur-2xl border border-blue-50/50 rounded-[2.5rem] p-3 shadow-[0_20px_50px_rgba(30,58,138,0.04)]">
        <div className="flex flex-col md:flex-row items-center gap-4">
          
          {/* Arrival Field */}
          <div className="flex-1 w-full group">
            <div className="relative flex items-center bg-slate-50/50 border border-transparent group-hover:border-blue-100 group-focus-within:border-blue-200 group-focus-within:bg-white rounded-[1.8rem] px-6 py-4 transition-all duration-500">
              <Calendar className="text-blue-500 mr-4" size={20} />
              <div className="flex flex-col flex-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none mb-2">
                  Arrival
                </label>
                <input 
                  type="date" 
                  min={today}
                  value={checkIn}
                  onChange={handleCheckInChange}
                  className="bg-transparent text-slate-900 font-bold text-sm outline-none w-full cursor-pointer appearance-none"
                />
              </div>
            </div>
          </div>

          {/* Separator - Nautical Compass/Arrow */}
          <div className="hidden md:block text-blue-100">
            <ArrowRight size={20} />
          </div>

          {/* Departure Field */}
          <div className="flex-1 w-full group">
            <div className={`relative flex items-center bg-slate-50/50 border border-transparent group-hover:border-blue-100 group-focus-within:border-blue-200 group-focus-within:bg-white rounded-[1.8rem] px-6 py-4 transition-all duration-500 ${!checkIn && 'opacity-40 cursor-not-allowed'}`}>
              <Calendar className="text-blue-500 mr-4" size={20} />
              <div className="flex flex-col flex-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none mb-2">
                  Departure
                </label>
                <input 
                  type="date" 
                  min={getMinCheckOut()}
                  value={checkOut}
                  disabled={!checkIn}
                  onChange={(e) => onDateChange('checkOut', e.target.value)}
                  className="bg-transparent text-slate-900 font-bold text-sm outline-none w-full cursor-pointer appearance-none disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Action Button - Deep Water Style */}
          <button 
            onClick={onSearch}
            className={`w-full md:w-auto px-10 py-5 rounded-[1.8rem] font-bold text-[13px] tracking-widest uppercase shadow-xl transition-all duration-500 flex items-center justify-center gap-3
              ${isFormValid 
                ? 'bg-slate-950 text-white shadow-blue-900/10 hover:bg-blue-600 hover:-translate-y-1 active:scale-95' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
              }`}
          >
            <Compass size={18} className={isFormValid ? 'animate-spin-slow' : ''} />
            Search Stays
          </button>
        </div>
      </div>

      {/* Subtle Navigation Message */}
      {!isFormValid && (
        <div className="mt-5 flex items-center justify-center gap-2 text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] animate-pulse">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]"></div>
          Plot your journey to discover availability
        </div>
      )}
    </div>
  );
};

export default DateAvailabilityFilter;