import React from 'react';
import { MapPin, Star, ArrowUpRight, Waves, Heart } from 'lucide-react';

const FEATURED_HOTELS = [
  {
    id: 1,
    name: "Azure Bay Sanctuary",
    location: "Maldives, Indian Ocean",
    price: 12500,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Coral Reef Retreat",
    location: "Bora Bora, Polynesia",
    price: 18200,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Horizon Edge Villa",
    location: "Santorini, Greece",
    price: 9800,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
  }
];

const FeaturedSection = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Subtle Wave */}
      <div className="absolute top-10 right-0 text-blue-50/30 pointer-events-none">
        <Waves size={240} strokeWidth={1} />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header - More compact */}
        <div className="flex items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">
              Handpicked
            </p>
            <h2 className="text-3xl font-[900] text-slate-950 tracking-tighter">
              Featured <span className="italic font-serif text-slate-500">Sanctuaries</span>
            </h2>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors group">
            View All <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Featured Grid - Smaller Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_HOTELS.map((hotel) => (
            <div key={hotel.id} className="group cursor-pointer max-w-sm mx-auto w-full">
              {/* Image Container - Aspect ratio changed to be more compact */}
              <div className="relative aspect-[1.1/1] overflow-hidden rounded-[2rem] mb-5 shadow-lg shadow-blue-900/5 transition-all duration-500 hover:shadow-xl">
                <img 
                  src={hotel.image} 
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Minimal Heart Action */}
                <button className="absolute top-4 right-4 w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all duration-300">
                  <Heart size={16} />
                </button>

                {/* Subtle Price Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-[900] tracking-tighter">
                    ₹{hotel.price.toLocaleString()}
                    <span className="text-[10px] font-normal opacity-80 ml-1">/ night</span>
                  </p>
                </div>
              </div>

              {/* Text Info - Tightened Spacing */}
              <div className="space-y-2 px-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate pr-2">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star size={12} className="fill-blue-500 text-blue-500" />
                    <span className="text-[11px] font-bold text-slate-900">{hotel.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5 text-slate-400">
                  <MapPin size={12} className="text-blue-400" />
                  <span className="text-xs font-medium truncate">{hotel.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;