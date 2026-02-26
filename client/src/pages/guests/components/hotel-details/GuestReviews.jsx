import React, { useState } from 'react';
import { Star, MessageSquare, ChevronDown, Waves } from 'lucide-react';

const GuestReviews = () => {
  const [reviews] = useState([
    {
      id: 1,
      name: "Julianne Moore",
      location: "San Francisco, CA",
      rating: 5,
      text: "Waking up to the sound of the tide was transformative. The minimalist design of the rooms allows the ocean views to be the true protagonist of your stay."
    },
    {
      id: 2,
      name: "Marcus Thorne",
      location: "London, UK",
      rating: 5,
      text: "A masterclass in coastal luxury. Every detail, from the linen textures to the sea-salt scent in the lobby, curated a sense of profound calm."
    },
    {
      id: 3,
      name: "Sophia Chen",
      location: "Singapore",
      rating: 4,
      text: "The infinity pool feels like it blends directly into the horizon. Impeccable service and a truly fresh, airy atmosphere throughout the resort."
    }
  ]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 bg-white">
      
      {/* 1. Section Header & Summary */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="max-w-2xl">
          <span className="text-blue-600/70 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">
            Guest Experiences
          </span>
          <h2 className="text-4xl font-[700] text-slate-950 tracking-tight leading-tight mb-4">
            Stories from the <span className="italic font-serif text-slate-500">Shoreline</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            Real moments shared by travelers who found their sanctuary at CheckInn.
          </p>
        </div>

        {/* Average Rating Block - Mist Style */}
        <div className="flex items-center gap-6 bg-slate-50 border border-blue-50/50 p-6 rounded-[2rem] shadow-sm">
          <div className="text-center border-r border-blue-100 pr-6">
            <div className="flex items-center gap-1 text-blue-600 mb-1">
              <span className="text-3xl font-[800]">4.9</span>
              <Star size={20} className="fill-blue-600" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Average</p>
          </div>
          <div>
            <p className="text-slate-900 font-bold text-sm">1,248 Reviews</p>
            <p className="text-slate-400 text-xs mt-0.5">Verified Guest Stays</p>
          </div>
        </div>
      </div>

      {/* 2. Review Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div 
            key={review.id}
            className="group relative bg-white border border-slate-100 p-8 rounded-[2rem] transition-all duration-700 hover:-translate-y-2 hover:border-blue-200 hover:shadow-[0_30px_60px_-20px_rgba(30,58,138,0.08)]"
          >
            {/* Star Rating */}
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  className={`${i < review.rating ? 'text-blue-500 fill-blue-500' : 'text-slate-100'} `} 
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-slate-600 text-[15px] leading-relaxed mb-8 font-medium italic">
              "{review.text}"
            </p>

            {/* Guest Identity */}
            <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
              <div className="flex-1">
                <h4 className="text-slate-950 font-bold text-sm tracking-wide">
                  {review.name}
                </h4>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                  {review.location}
                </p>
              </div>
              <MessageSquare size={16} className="text-blue-100 group-hover:text-blue-300 transition-colors duration-500" />
            </div>
          </div>
        ))}
      </div>

      {/* 3. Load More Action */}
      <div className="mt-20 flex flex-col items-center gap-6">
        <button className="flex items-center gap-3 text-blue-600 font-bold text-[11px] tracking-[0.3em] uppercase hover:text-slate-950 transition-all duration-500 group">
          <div className="p-2.5 rounded-full bg-blue-50 group-hover:bg-slate-100 transition-colors duration-500">
            <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </div>
          Read All Narratives
        </button>
        
        {/* Subtle Decorative Wave */}
        <Waves className="text-blue-50/50 w-12 h-12" />
      </div>
    </section>
  );
};

export default GuestReviews;