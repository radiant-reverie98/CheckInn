import React from 'react';
import { MapPin, Star, ExternalLink, Navigation, Waves } from 'lucide-react';

const HotelOverviewCard = ({ 
  hotelName = "Azure Bay Sanctuary", 
  location = "Maldives, Indian Ocean", 
  rating = 4.9, 
  image = "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&w=800&q=80" 
}) => {
  return (
    <div className="group relative max-w-7xl mx-auto px-6 mb-12">
      <div className="bg-white rounded-[2.5rem] border border-blue-50 p-6 md:p-8 shadow-[0_20px_50px_rgba(30,58,138,0.04)] transition-all duration-700 hover:shadow-[0_40px_80px_rgba(30,58,138,0.08)] hover:-translate-y-1 hover:border-blue-100 flex flex-col md:flex-row gap-8 items-center">
        
        {/* 1. Hotel Image - The Window to the Coast */}
        <div className="relative w-full md:w-72 h-48 md:h-48 flex-shrink-0 overflow-hidden rounded-[1.8rem] shadow-md">
          <img 
            src={image} 
            alt={hotelName} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
        </div>

        {/* 2. Hotel Identity & Info */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start gap-1.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={12} 
                  className={`${i < Math.floor(rating) ? 'text-blue-500 fill-blue-500' : 'text-slate-200'}`} 
                />
              ))}
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                {rating} Boutique Rating
              </span>
            </div>
            
            <h2 className="text-3xl font-[800] text-slate-950 tracking-tight leading-tight">
              {hotelName}
            </h2>
            
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500">
              <MapPin size={16} className="text-blue-400" />
              <span className="text-sm font-medium tracking-wide">
                {location}
              </span>
            </div>
          </div>

          {/* 3. Quick Actions - Coastal Interaction */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4 border-t border-slate-50">
            <button className="flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] hover:text-slate-950 transition-colors group/link">
              <ExternalLink size={14} className="group-hover/link:-translate-y-0.5 transition-transform" />
              View Hotel Page
            </button>
            <div className="h-4 w-px bg-slate-100 hidden md:block"></div>
            <button className="flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] hover:text-slate-950 transition-colors group/map">
              <Navigation size={14} className="group-hover/map:translate-x-0.5 transition-transform" />
              Open in Google Maps
            </button>
          </div>
        </div>

        {/* Decorative Internal Wave Pattern */}
        <div className="absolute bottom-6 right-8 opacity-[0.03] pointer-events-none hidden lg:block">
          <Waves size={80} className="text-blue-900" />
        </div>
      </div>
    </div>
  );
};

export default HotelOverviewCard;