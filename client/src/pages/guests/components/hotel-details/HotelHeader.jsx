import React, { useState } from 'react';
import { MapPin, Star, Share2, Heart, Info, Waves } from 'lucide-react';
import { useHotelDetail } from './HotelDetailsContext';

const HotelHeader = ({
  rating = 4.9,
  reviews = 1248
}) => {

  const { hotel } = useHotelDetail();
  const [isSaved, setIsSaved] = useState(false);

  if (!hotel) return null;   // or loading skeleton

  const name = hotel.hotel_name;
  const location = `${hotel.city}, ${hotel.state}`;
  const tagline = hotel.short_tagline;
  const startingPrice = Number(hotel.min_price);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-white" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        
        {/* Left Section */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-4">

            {/* Rating (unchanged as requested) */}
            <div className="flex items-center gap-1.5 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100/50 shadow-sm">
              <Star size={14} className="text-blue-600 fill-blue-600" />
              <span className="text-xs font-[800] text-blue-900">{rating}</span>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider ml-1">
                {reviews} reviews
              </span>
            </div>

            <span className="text-slate-200 text-xs hidden sm:block">•</span>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-slate-500">
              <MapPin size={14} className="text-blue-500" />
              <span className="text-sm font-bold tracking-wide hover:text-blue-600 cursor-pointer transition-all duration-500 underline underline-offset-[6px] decoration-blue-100 hover:decoration-blue-400">
                {location}
              </span>
            </div>
          </div>

          {/* Hotel Name */}
          <h1 className="text-4xl md:text-6xl font-[800] text-slate-950 tracking-tight leading-tight">
            {name}
          </h1>

          {/* Tagline */}
          {tagline && (
            <div className="flex items-center gap-3">
              <Waves size={18} className="text-blue-200" />
              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-2xl italic font-serif">
                "{tagline}"
              </p>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-end gap-8 w-full md:w-auto">

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-3.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-white hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500 group">
              <Share2 size={18} className="group-hover:scale-110 transition-transform" />
            </button>

            <button 
              onClick={() => setIsSaved(!isSaved)}
              className={`p-3.5 rounded-full border transition-all duration-500 group ${
                isSaved 
                ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-lg shadow-blue-100' 
                : 'bg-slate-50 border-slate-100 text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-white'
              }`}
            >
              <Heart size={18} fill={isSaved ? "currentColor" : "none"} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right hidden md:block">
            <p className="text-[10px] font-[800] text-slate-400 uppercase tracking-[0.4em] mb-2">
              Ocean Premier Rate
            </p>

            <div className="flex items-baseline justify-end gap-2">
              <span className="text-4xl font-[800] text-slate-950 tracking-tighter">
                ₹{startingPrice || 0}
              </span>
              <span className="text-slate-400 font-bold text-[11px] uppercase tracking-widest">
                / Night
              </span>
            </div>

            <div className="flex items-center justify-end gap-1.5 mt-2 text-[10px] text-blue-600/80 font-bold uppercase tracking-wider">
              <Info size={11} />
              Nett of coastal taxes
            </div>
          </div>

        </div>
      </div>

      <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-blue-50 to-transparent"></div>
    </div>
  );
};

export default HotelHeader;