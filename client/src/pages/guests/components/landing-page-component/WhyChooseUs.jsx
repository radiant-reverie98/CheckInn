import React from 'react';
import { ShieldCheck, Sparkles, Receipt, MessageCircle } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-blue-600" />,
      title: "Curated Quality",
      desc: "Every stay is hand-picked and verified for comfort and character."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      title: "Secure Booking",
      desc: "Safe, encrypted payments with instant confirmation to your inbox."
    },
    {
      icon: <Receipt className="w-6 h-6 text-blue-600" />,
      title: "Transparent Pricing",
      desc: "The price you see is the price you pay. No hidden fees, ever."
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-blue-600" />,
      title: "Real Guest Reviews",
      desc: "Authentic feedback from travelers who have actually stayed there."
    }
  ];

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <span className="text-blue-600/60 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">
            The CheckInn Promise
          </span>
          <h2 className="text-3xl md:text-4xl font-[600] text-slate-900 tracking-tight mb-4">
            Designed for <span className="italic font-serif text-slate-500">Effortless</span> Exploration
          </h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
            We make finding and booking your perfect coastal escape secure and transparent.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2"
            >
              {/* Ocean Mist Icon Circle */}
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 shadow-sm border border-slate-100 transition-all duration-500 group-hover:bg-blue-600 group-hover:shadow-blue-200">
                <div className="group-hover:text-white transition-colors duration-500">
                  {feature.icon}
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed px-4">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Subtle Ocean Mist Blur (Replaces Sunlight Blur) */}
      <div className="absolute -left-20 bottom-0 w-96 h-96 bg-blue-50/30 rounded-full blur-[100px] pointer-events-none"></div>
    </section>
  );
};

export default WhyChooseUs;