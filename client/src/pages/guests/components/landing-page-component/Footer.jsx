import React from 'react';
import { Waves, Instagram, Facebook, Twitter, Mail, ArrowRight, Anchor } from 'lucide-react';

const Footer = () => {
  return (
    /* Background shifted to a Deep Ocean Navy for a premium anchor */
    <footer className="bg-slate-950 pt-24 pb-12 relative overflow-hidden text-slate-300">
      
      {/* Subtle background glow mimicking moonlight on deep water */}
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-blue-900/20 rounded-full blur-[120px] -z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-blue-800/10 rounded-full blur-[100px] -z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30">
                <Waves className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-2xl font-[900] text-white tracking-tighter uppercase">
                Check<span className="text-blue-500 italic font-serif lowercase">Inn</span>
              </span>
            </div>
            <p className="text-slate-400 font-medium leading-relaxed max-w-xs text-sm">
              Discover sanctuaries crafted for serenity, where the rhythm of the tide meets unparalleled coastal luxury.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-blue-400 hover:border-blue-500/50 transition-all duration-500 shadow-xl">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.3em] mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['The Collection', 'Coastal Stays', 'Ocean Suites', 'Experiences'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-500 hover:text-blue-400 font-medium transition-colors text-[13px] tracking-wide">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.3em] mb-8">Company</h4>
            <ul className="space-y-4">
              {['Our Story', 'Sustainability', 'Newsroom', 'Careers'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-500 hover:text-blue-400 font-medium transition-colors text-[13px] tracking-wide">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="lg:col-span-1">
            <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.3em] mb-8">Newsletter</h4>
            <p className="text-[12px] text-slate-500 font-medium mb-6 leading-relaxed">
              Subscribe to receive curated nautical escapes and seasonal tides.
            </p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-5 py-3.5 text-sm text-white focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-700"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Anchor size={12} className="text-slate-800" />
            <span>© 2026 CheckInn — Crafted for the Endless Blue.</span>
          </div>
          <div className="flex gap-10">
            <a href="#" className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-blue-400 transition-colors">Privacy</a>
            <a href="#" className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-blue-400 transition-colors">Terms</a>
            <a href="#" className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-blue-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;