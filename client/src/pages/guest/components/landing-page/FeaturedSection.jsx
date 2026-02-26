import React from 'react';
import { MapPin, Star, ArrowUpRight, Waves, Heart, ChevronRight } from 'lucide-react';
import { useHotel } from '../../context/HotelContext';

const FeaturedSection = () => {
  const { hotels} = useHotel();

  
  if (!hotels || hotels.length === 0) return null;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Subtle Wave */}
      <div className="absolute top-10 right-0 text-blue-50/30 pointer-events-none">
        <Waves size={240} strokeWidth={1} />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">
              Handpicked
            </p>
            <h2 className="text-3xl font-[900] text-slate-950 tracking-tighter">
              Featured <span className="italic font-serif text-slate-500">Sanctuaries</span>
            </h2>
          </div>
          <button className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors group">
            Top Rated <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Dynamic Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {hotels.map((hotel) => {
            // Formatting the rating for the UI
            const displayRating = parseFloat(hotel.avg_rating) > 0 
              ? parseFloat(hotel.avg_rating).toFixed(1) 
              : "New";

            return (
              <div key={hotel.id} className="group cursor-pointer max-w-sm mx-auto w-full">
                {/* Image Container */}
                <div className="relative aspect-[1.1/1] overflow-hidden rounded-[2rem] mb-5 shadow-lg shadow-blue-900/5 transition-all duration-500 hover:shadow-xl">
                  <img 
                    src={hotel.photo_url} 
                    alt={hotel.hotel_name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Heart Action */}
                  <button className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all duration-300">
                    <Heart size={16} />
                  </button>

                  {/* Price Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-lg font-[900] tracking-tighter">
                      ₹{Number(hotel.starting_price).toLocaleString()}
                      <span className="text-[10px] font-normal opacity-80 ml-1">/ night</span>
                    </p>
                  </div>
                </div>

                {/* Text Info */}
                <div className="space-y-2 px-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate pr-2">
                      {hotel.hotel_name}
                    </h3>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star size={12} className="fill-blue-500 text-blue-500" />
                      <span className="text-[11px] font-bold text-slate-900">{displayRating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <MapPin size={12} className="text-blue-400" />
                    <span className="text-xs font-medium truncate">
                      {hotel.city}, {hotel.state}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Button */}
        <div className="mt-20 flex justify-center">
          <button className="group relative flex items-center gap-4 px-12 py-5 bg-white border border-blue-50 rounded-2xl shadow-sm transition-all duration-500 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-950">
              Browse All Sanctuaries
            </span>
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
              <ChevronRight size={16} />
            </div>
          </button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedSection;