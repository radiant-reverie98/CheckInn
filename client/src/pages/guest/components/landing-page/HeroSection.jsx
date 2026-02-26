import React, { useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

const HeroSection = () => {
  const { checkIn, setCheckIn, checkOut, setCheckOut } = useHotel();
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (checkIn && (!checkOut || checkOut <= checkIn)) {
      const nextDay = new Date(checkIn);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(nextDay.toISOString().split('T')[0]);
    }
  }, [checkIn, checkOut, setCheckOut]);

  return (
    <section className="relative w-full h-[110vh] bg-slate-950 overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=2000&q=80" 
          className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
          alt="Dark Coastal Sanctuary"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950"></div>
      </div>

      <div className="relative z-10 text-center px-6 w-full max-w-4xl">
        <div className="overflow-hidden mb-6">
          <p className="text-blue-400 font-black uppercase tracking-[0.6em] text-[10px] md:text-[12px] animate-reveal">
            The Art of Disappearing
          </p>
        </div>

        <h1 className="text-7xl md:text-[11rem] font-[900] text-white tracking-tighter leading-[0.8] mb-16 select-none drop-shadow-2xl">
          CHCK<span 
            className="italic font-serif font-light text-transparent"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.6)' }}
          >
            INN
          </span>
        </h1>

        <div className="max-w-xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
          
          <div className="relative w-full bg-white/5 backdrop-blur-3xl border border-white/10 rounded-full p-2 flex flex-col md:flex-row items-center transition-all duration-500 group-hover:border-white/20">
            
            <div className="flex-1 flex items-center gap-4 px-10 py-4 w-full md:w-auto">
              <Calendar size={18} className="text-blue-400 shrink-0" />
              <div className="flex flex-col items-start">
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-400/60">Check In</span>
                <input 
                  type="date" 
                  min={today}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="bg-transparent text-sm font-bold text-white outline-none [color-scheme:dark] cursor-pointer w-full"
                />
              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-white/10"></div>

            <div className="flex-1 flex items-center gap-4 px-10 py-4 w-full md:w-auto">
              <Calendar size={18} className="text-blue-400 shrink-0" />
              <div className="flex flex-col items-start">
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-400/60">Check Out</span>
                <input 
                  type="date" 
                  min={checkIn ? new Date(new Date(checkIn).getTime() + 86400000).toISOString().split('T')[0] : today}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="bg-transparent text-sm font-bold text-white outline-none [color-scheme:dark] cursor-pointer w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-6">
        <span className="text-[9px] font-black uppercase tracking-[0.5em] [writing-mode:vertical-lr] animate-pulse">
          Scroll
        </span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-blue-600 via-blue-400 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white animate-scroll-line"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;