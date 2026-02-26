import React, { useState } from 'react';
import {
  Wind, Wine, Coffee, Dumbbell, Car, Dog,
  Waves, UtensilsCrossed, Sparkles, Wifi,
  Plus, ChevronUp, Anchor
} from 'lucide-react';


const iconMap = {
  wifi: <Wifi size={20} />,
  "high-speed wifi": <Wifi size={20} />,
  pool: <Waves size={20} />,
  "swimming pool": <Waves size={20} />,
  "infinity pool": <Waves size={20} />,
  breakfast: <Coffee size={20} />,
  "breakfast included": <Coffee size={20} />,
  ac: <Wind size={20} />,
  "air conditioning": <Wind size={20} />,
  restaurant: <UtensilsCrossed size={20} />,
  spa: <Sparkles size={20} />,
  gym: <Dumbbell size={20} />,
  "fitness center": <Dumbbell size={20} />,
  bar: <Wine size={20} />,
  parking: <Car size={20} />,
  "free parking": <Car size={20} />,
  pet: <Dog size={20} />,
  "pet friendly": <Dog size={20} />,
};

const HotelAmenities = () => {

  
  const [showAll, setShowAll] = useState(false);

  if (!amenities) return null;

  // Convert DB amenities → UI format
  const mappedAmenities = amenities.map(a => {
    const key = a.name.toLowerCase();
    const icon =
      Object.keys(iconMap).find(k => key.includes(k))
        ? iconMap[Object.keys(iconMap).find(k => key.includes(k))]
        : <Sparkles size={20} />;   // default icon

    return {
      label: a.name,
      icon
    };
  });

  const visibleAmenities = showAll
    ? mappedAmenities
    : mappedAmenities.slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 bg-white">
      <div className="max-w-4xl">

        <div className="flex items-center gap-3 mb-12">
          <Anchor size={20} className="text-blue-500/50" />
          <h2 className="text-2xl font-[700] text-slate-900 tracking-tight">
            Curated <span className="italic font-serif text-slate-500">Provisions</span> & Comforts
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-12 transition-all duration-700">
          {visibleAmenities.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-5 group cursor-default animate-in fade-in slide-in-from-bottom-3 duration-700"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 shadow-sm transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-200 group-hover:-translate-y-1.5">
                {item.icon}
              </div>

              <span className="text-slate-600 text-[13px] font-bold tracking-wide uppercase transition-colors group-hover:text-slate-950">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {mappedAmenities.length > 8 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-16 flex items-center gap-3 text-blue-600 font-bold text-[11px] tracking-[0.3em] uppercase hover:text-slate-950 transition-all duration-500 group"
          >
            <div className="p-2 rounded-full bg-blue-50 group-hover:bg-slate-100 transition-colors duration-500">
              {showAll ? <ChevronUp size={14} /> : <Plus size={14} />}
            </div>
            {showAll ? "Reveal Less" : "Discover All Provisions"}
          </button>
        )}

      </div>

      <div className="mt-20 h-px w-full bg-gradient-to-r from-transparent via-blue-100/40 to-transparent"></div>
    </div>
  );
};

export default HotelAmenities;