import React, { useState } from 'react';
import { MapPin, Waves, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'Stays', href: '/stays' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-6">
      {/* Ultra-Light Minimalist Container */}
      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-lg border border-slate-200/50 rounded-full shadow-sm px-8 py-3 transition-all duration-500">
        <div className="flex items-center justify-between">
          
          {/* Left: Logo Section */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <Waves className="w-5 h-5 text-blue-500 transition-colors duration-500" />
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Check<span className="text-blue-500/80 font-medium">Inn</span>
            </span>
          </div>

          {/* Center: Navigation Links - Very clean and spaced */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[14px] font-medium text-slate-500 hover:text-blue-600 tracking-wider uppercase transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right: Actions - Subtle and refined */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/guest/register" className="text-[14px] font-medium text-slate-400 hover:text-slate-900 transition-colors">
              Sign In
            </Link>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2 rounded-full font-semibold text-[13px] tracking-wide transition-all duration-300">
              BOOK NOW
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-500 hover:text-blue-600 transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Clean and white */}
      {isOpen && (
        <div className="md:hidden mt-4 px-2">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xl flex flex-col gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm">
              BOOK NOW
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;