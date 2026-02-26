import React from 'react';
import { ArrowRight, Waves } from 'lucide-react';

const FinalCTA = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Subtle Ocean Mist Glow (Replaces Amber) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-50/50 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        
        {/* Minimalist Brand Icon */}
        <div className="flex justify-center mb-10">
          <div className="p-4 rounded-2xl bg-slate-50 border border-blue-50 shadow-sm transition-transform duration-700 hover:rotate-12">
            <Waves className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        {/* Emotional Headline */}
        <h2 className="text-4xl md:text-6xl font-[600] text-slate-900 tracking-tight leading-tight mb-8">
          Ready for Your <br />
          <span className="italic font-serif text-slate-500">Endless Blue</span> Escape?
        </h2>

        {/* Supportive Subheading */}
        <p className="text-slate-500 text-lg md:text-xl font-medium max-w-xl mx-auto mb-14 leading-relaxed">
          Discover a collection of stays crafted for serenity, beauty, and quiet moments by the water.
        </p>

        {/* Primary Premium CTA */}
        <div className="flex justify-center">
          <button className="group relative bg-blue-600 text-white px-12 py-5 rounded-2xl font-[700] text-sm tracking-[0.2em] uppercase shadow-xl shadow-blue-100 hover:bg-slate-900 hover:shadow-slate-200 hover:-translate-y-1 active:scale-[0.98] transition-all duration-500 flex items-center gap-4">
            Begin Your Journey
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            
            {/* Subtle button sheen effect */}
            <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>

        {/* Low-pressure Trust Link */}
        <p className="mt-10 text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
          Transparent pricing. Pure serenity.
        </p>
      </div>

      {/* Edge Gradient Fades */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50/50 to-transparent"></div>
    </section>
  );
};

export default FinalCTA;