import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      text: "The most seamless booking experience I've ever had. We found a hidden gem by the coast that felt like a private sanctuary. Truly unforgettable.",
      author: "Sarah Jenkins",
      location: "London, UK",
      rating: 5
    },
    {
      id: 2,
      text: "CheckInn curated exactly what we were looking for—clarity, calm, and peace. No hidden fees, just honest, beautiful stays.",
      author: "Michael Chen",
      location: "Singapore",
      rating: 5
    },
    {
      id: 3,
      text: "The attention to detail in their property selection is remarkable. Every morning felt like waking up to the rhythm of the ocean.",
      author: "Elena Rodriguez",
      location: "Madrid, Spain",
      rating: 4
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle Ocean Mist Flare (Replaces Amber) */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/40 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600/60 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">
            Guest Experiences
          </span>
          <h2 className="text-3xl md:text-4xl font-[600] text-slate-900 tracking-tight mb-4">
            Moments Worth <span className="italic font-serif text-slate-500">Remembering</span>
          </h2>
          <p className="text-slate-400 font-medium max-w-lg mx-auto leading-relaxed text-sm">
            Real stories from travelers who found their perfect sanctuary with CheckInn.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="group bg-white rounded-[2rem] p-8 md:p-10 border border-slate-100 shadow-[0_15px_40px_-15px_rgba(30,58,138,0.05)] transition-all duration-700 hover:-translate-y-2 hover:shadow-blue-900/10"
            >
              {/* Star Rating & Quote Icon */}
              <div className="flex justify-between items-start mb-8">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={`${i < review.rating ? 'text-blue-500 fill-blue-500' : 'text-slate-100'} `} 
                    />
                  ))}
                </div>
                <Quote size={20} className="text-blue-100 group-hover:text-blue-200 transition-colors" />
              </div>

              {/* Review Text */}
              <p className="text-slate-600 text-[15px] leading-relaxed mb-8 italic font-medium">
                "{review.text}"
              </p>

              {/* Guest Info */}
              <div className="pt-6 border-t border-slate-50">
                <p className="text-slate-900 font-bold text-sm tracking-wide">
                  {review.author}
                </p>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                  {review.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;