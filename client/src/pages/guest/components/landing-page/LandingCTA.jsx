import React from 'react';
import { ArrowRight, Waves, Hotel } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingCTA = () => {
  return (
    <section className="py-24 px-6 bg-white">
      {/* 1. Light-Themed Coastal Container */}
      <div className="max-w-6xl mx-auto relative overflow-hidden rounded-[3.5rem] bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 border border-blue-50 p-12 md:p-24 text-center shadow-[0_40px_100px_-20px_rgba(30,58,138,0.05)]">
        
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none -translate-y-1/3 translate-x-1/4">
          <Waves size={500} strokeWidth={0.5} className="text-blue-400" />
        </div>
        
        {/* 2. Content Layer */}
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-blue-100 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">
              The Journey Begins
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-[900] text-slate-950 tracking-tighter leading-[1.1]">
            Ready to Find Your <br />
            <span className="italic font-serif text-slate-500 font-light">Perfect Stay?</span>
          </h2>

          <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed max-w-lg mx-auto">
            Explore our curated collection of coastal sanctuaries and book your next escape in minutes.
          </p>

          {/* 3. Action Buttons - Corrected to match UI Brand Colors */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
            
            {/* Primary Action: Signature Sanctuary Blue */}
            <Link 
              to="/hotels"
              className="w-full sm:w-auto px-12 py-5 bg-blue-600 text-white rounded-2xl font-bold text-xs tracking-[0.2em] uppercase shadow-xl shadow-blue-100 hover:bg-slate-950 hover:-translate-y-1 transition-all duration-500 flex items-center justify-center gap-3 group"
            >
              Explore Hotels
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Secondary Action: Mist-White Glass */}
            <Link 
              to="/list-property"
              className="w-full sm:w-auto px-10 py-5 bg-white border border-blue-100 text-slate-900 rounded-2xl font-bold text-xs tracking-[0.2em] uppercase hover:bg-blue-50 hover:border-blue-200 transition-all duration-500 flex items-center justify-center gap-2"
            >
              <Hotel size={16} strokeWidth={1.5} className="text-blue-400" />
              List Your Property
            </Link>

          </div>
        </div>

        {/* 4. Trust Footer */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px w-8 bg-blue-100"></div>
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400">
            Verified by CheckInn
          </p>
          <div className="h-px w-8 bg-blue-100"></div>
        </div>

      </div>
    </section>
  );
};

export default LandingCTA;