import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Anchor } from 'lucide-react';
import { useHotelDetail } from './HotelDetailsContext';

const HotelDescription = () => {

  const { hotel } = useHotelDetail();   // ✅ get hotel from context
  const [isExpanded, setIsExpanded] = useState(false);

  if (!hotel) return null;   // or loading skeleton

  const description = hotel.long_description;

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 bg-white">
      <div className="max-w-3xl">

        <div className="flex items-center gap-3 mb-8">
          <Anchor size={18} className="text-blue-500/40" />
          <h2 className="text-2xl font-[700] text-slate-950 tracking-tight">
            The <span className="italic font-serif text-slate-500">Spirit</span> of the Coast
          </h2>
        </div>

        <div className="relative">
          <p className={`text-slate-500 text-lg leading-relaxed font-medium transition-all duration-700 ease-in-out overflow-hidden ${
            !isExpanded ? 'max-h-28' : 'max-h-[1000px]'
          }`}>
            {description || "No description available"}
          </p>

          {!isExpanded && (
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
          )}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-6 flex items-center gap-2 text-blue-600 font-bold text-[11px] tracking-[0.2em] uppercase hover:text-slate-950 transition-all duration-500 group"
        >
          {isExpanded ? (
            <>Collapse Details <ChevronUp size={14} className="group-hover:-translate-y-1 transition-transform" /></>
          ) : (
            <>Continue Reading <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform" /></>
          )}
        </button>

      </div>

      <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-blue-100/30 to-transparent"></div>
    </div>
  );
};

export default HotelDescription;