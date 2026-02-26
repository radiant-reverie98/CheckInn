import React from 'react';
import { Waves, Instagram, Facebook, Twitter, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Sanctuaries: [
      { name: 'Coastal Resorts', path: '/resorts' },
      { name: 'Private Villas', path: '/villas' },
      { name: 'Mountain Escapes', path: '/mountains' },
      { name: 'Urban Havens', path: '/urban' },
    ],
    Company: [
      { name: 'Our Story', path: '/about' },
      { name: 'Curators', path: '/curators' },
      { name: 'Careers', path: '/careers' },
      { name: 'Journal', path: '/blog' },
    ],
    Support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Safety & Policy', path: '/safety' },
      { name: 'Cancellation', path: '/cancellation' },
      { name: 'Contact Us', path: '/contact' },
    ],
  };

  return (
    <footer className="bg-slate-950 text-white pt-24 pb-12 overflow-hidden relative">
      {/* Subtle Background Waves */}
      <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none">
        <Waves size={400} />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          
          {/* 1. Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform duration-500">
                <Waves size={28} />
              </div>
              <span className="text-2xl font-[900] tracking-tighter uppercase">
                Check<span className="text-blue-400 italic font-serif lowercase">Inn</span>
              </span>
            </Link>
            
            <div className="space-y-4">
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm">
                Curating the world's most peaceful coastal sanctuaries for the modern traveler. Experience serenity, redefined.
              </p>
              <div className="relative max-w-sm pt-2">
                <input 
                  type="email" 
                  placeholder="Join our newsletter"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-blue-400/50 transition-colors"
                />
                <button className="absolute right-2 top-[14px] p-2 bg-blue-600 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300">
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* 2. Navigation Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 3. Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              © {currentYear} CheckInn Sanctuary Services
            </p>
            <div className="hidden md:flex items-center gap-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <Link to="/privacy" className="hover:text-white">Privacy</Link>
              <Link to="/terms" className="hover:text-white">Terms</Link>
            </div>
          </div>

          {/* Social Presence */}
          <div className="flex items-center gap-5">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-500"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;