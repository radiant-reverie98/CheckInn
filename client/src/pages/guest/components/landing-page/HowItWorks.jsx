import React from 'react';
import { Search, BedDouble, ShieldCheck, Palmtree, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    id: '01',
    title: "Search Your Stay",
    description: "Select your timeline and discover a curated collection of coastal sanctuaries.",
    icon: <Search size={24} strokeWidth={1.5} />,
  },
  {
    id: '02',
    title: "Choose Your Room",
    description: "Browse detailed room breakdowns and select the view that speaks to you.",
    icon: <BedDouble size={24} strokeWidth={1.5} />,
  },
  {
    id: '03',
    title: "Secure Payment",
    description: "Finalize your reservation through our encrypted, transparent payment gateway.",
    icon: <ShieldCheck size={24} strokeWidth={1.5} />,
  },
  {
    id: '04',
    title: "Enjoy Your Trip",
    description: "Receive your digital concierge pass and step into a world of serenity.",
    icon: <Palmtree size={24} strokeWidth={1.5} />,
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500">
            The Process
          </p>
          <h2 className="text-4xl md:text-5xl font-[900] text-slate-950 tracking-tighter">
            How <span className="italic font-serif text-slate-500">CheckInn</span> Works
          </h2>
          <p className="text-slate-500 text-sm font-medium max-w-xs mx-auto leading-relaxed">
            Book your sanctuary in just a few simple, intentional steps.
          </p>
        </div>

        {/* 4-Step Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {STEPS.map((step, index) => (
            <div key={step.id} className="group relative">
              {/* Step Card */}
              <div className="flex flex-col items-center text-center space-y-6 p-8 rounded-[2.5rem] transition-all duration-500 hover:bg-slate-50/50">
                
                {/* Icon Container */}
                <div className="w-16 h-16 rounded-3xl bg-blue-50 flex items-center justify-center text-blue-600 transition-transform duration-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
                  {step.icon}
                </div>

                {/* Step Number & Title */}
                <div className="space-y-2">
                  <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest block">
                    Step {step.id}
                  </span>
                  <h3 className="text-lg font-bold text-slate-950 tracking-tight">
                    {step.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs leading-relaxed text-slate-400 font-medium px-2">
                  {step.description}
                </p>

                {/* Subtle Decorative Connector (Desktop Only) */}
                {index !== STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-16 -right-4 translate-x-1/2 text-slate-100">
                    <ArrowRight size={20} strokeWidth={1} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;