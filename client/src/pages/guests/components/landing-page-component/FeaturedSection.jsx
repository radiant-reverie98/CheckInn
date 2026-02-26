import React from 'react';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { useBooking } from '../../BookingContext';
import { Link } from 'react-router-dom';

const FeaturedSection = ({ onViewDetails }) => {
  const { hotels, loading, checkIn, checkOut } = useBooking();

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 mt-24 text-center">
        <div className="animate-pulse text-slate-400 font-medium">Seeking sanctuaries...</div>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div className="max-w-lg">
          <span className="text-blue-600/70 text-[10px] font-bold uppercase tracking-[0.4em] mb-2 block">
            {checkIn && checkOut ? 'Available for your dates' : 'The Collection'}
          </span>
          <h2 className="text-3xl font-[600] text-slate-900 tracking-tight">
            Handpicked <span className="italic font-serif text-slate-500">Sanctuaries</span>
          </h2>
        </div>
        <p className="text-slate-500 text-sm font-medium md:max-w-[240px] leading-relaxed">
          Curated stays chosen for comfort, beauty, and quiet luxury.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {hotels.map((stay) => (
          <Link 
            to={`/hotel/${stay.id}`} 
            key={stay.id} 
            className="group block"
            onClick={() => onViewDetails && onViewDetails(stay.id)}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 border border-slate-100 shadow-sm bg-slate-100">
              <img 
                src={stay.primary_photo} 
                alt={stay.hotel_name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-colors duration-500"></div>
              {stay.sold_out && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm z-10">
                  <span className="text-[10px] font-bold text-slate-900 uppercase tracking-wider">Sold Out</span>
                </div>
              )}
            </div>

            <div className="px-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-base font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                  {stay.hotel_name}
                </h3>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-blue-500 fill-blue-500" />
                  <span className="text-xs font-bold text-slate-900">4.8</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-slate-400 mb-4">
                <MapPin size={12} className="text-blue-400" />
                <span className="text-xs font-medium">{stay.city}</span>
              </div>

              <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                <div className="flex flex-col">
                  <p className="text-sm font-[800] text-slate-900">
                    ₹{Number(stay.min_price).toLocaleString()}<span className="text-[10px] font-medium text-slate-400 ml-1">/night</span>
                  </p>
                  {stay.available_rooms > 0 && stay.available_rooms < 5 && (
                    <span className="text-[9px] font-bold text-orange-500 uppercase mt-1">
                      Only {stay.available_rooms} left
                    </span>
                  )}
                </div>
                
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                  Discover <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {hotels.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 font-medium">No sanctuaries found for these dates.</p>
        </div>
      )}
    </section>
  );
};

export default FeaturedSection;