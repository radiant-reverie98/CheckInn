import React, { useState } from 'react';
import { Users, ArrowRight, Calendar } from 'lucide-react';

const HeroSection = () => {
  const today = new Date().toISOString().split('T')[0];
  
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const getMinCheckOut = () => {
    if (!checkIn) return today;
    const nextDay = new Date(checkIn);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split('T')[0];
  };

  const handleCheckInChange = (e) => {
    const newDate = e.target.value;
    setCheckIn(newDate);
    if (checkOut && newDate >= checkOut) {
      setCheckOut('');
    }
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-center px-6 overflow-hidden bg-slate-50">
      
      {/* Ocean Mist Visual Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2000" 
          alt="Serene Ocean" 
          className="w-full h-full object-cover opacity-30 grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/20 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl mb-16">
          <span className="text-blue-600/70 text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
            Escape to the Coast
          </span>
          <h1 className="text-5xl md:text-7xl font-[600] text-slate-900 leading-tight tracking-tight mb-6">
            Where the blue <br />
            meets <span className="italic font-serif text-slate-500">endless luxury.</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-lg leading-relaxed">
            Discover a curated collection of stays designed for those who seek the rhythm of the tide.
          </p>
        </div>

        {/* Minimalist Floating Booking Card */}
        <div className="bg-white/40 backdrop-blur-2xl border border-slate-200/50 rounded-[2.5rem] p-2 shadow-xl shadow-blue-900/5 inline-block w-full max-w-5xl">
          <div className="bg-white rounded-[2rem] p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
              
              {/* Check-In */}
              <div className="flex flex-col group">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1 flex items-center gap-2">
                  <Calendar size={12} className="text-blue-400" /> Check In
                </label>
                <input 
                  type="date" 
                  min={today}
                  value={checkIn}
                  onChange={handleCheckInChange}
                  className="text-sm font-semibold text-slate-800 outline-none cursor-pointer bg-transparent focus:text-blue-600 transition-colors"
                />
              </div>

              {/* Check-Out */}
              <div className="flex flex-col border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Check Out</label>
                <input 
                  type="date" 
                  min={getMinCheckOut()}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  disabled={!checkIn}
                  className={`text-sm font-semibold outline-none cursor-pointer bg-transparent focus:text-blue-600 transition-colors ${!checkIn ? 'text-slate-300 cursor-not-allowed' : 'text-slate-800'}`}
                />
              </div>

              {/* Guests */}
              <div className="flex flex-col border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Guests</label>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Users size={16} className="text-blue-500" />
                  <select className="bg-transparent outline-none cursor-pointer appearance-none pr-8 w-full">
                    <option>2 Adults</option>
                    <option>1 Adult</option>
                    <option>Family Suite</option>
                  </select>
                </div>
              </div>

              {/* Action Button */}
              <button className="bg-blue-600 text-white rounded-2xl px-6 py-5 font-bold text-sm hover:bg-slate-900 transition-all duration-500 flex items-center justify-center gap-3 group shadow-lg shadow-blue-200">
                FIND YOUR SANCTUARY
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;