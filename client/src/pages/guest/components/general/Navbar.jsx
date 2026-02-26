import React, { useState, useEffect } from 'react';
import { Waves, Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect for that premium "glass" transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Discover', path: '/discover' },
    { name: 'My Bookings', path: '/bookings' },
    { name: 'Sanctuaries', path: '/hotels' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      isScrolled 
        ? 'py-4 bg-white/80 backdrop-blur-lg border-b border-blue-50 shadow-sm' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* 1. Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100 group-hover:rotate-12 transition-transform duration-500">
            <Waves size={24} />
          </div>
          <span className="text-xl font-[900] text-slate-950 tracking-tighter uppercase">
            Check<span className="text-blue-500 italic font-serif lowercase">Inn</span>
          </span>
        </Link>

        {/* 2. Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-blue-600 ${
                location.pathname === link.path ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* 3. Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/login" 
            className="text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-950 transition-colors"
          >
            Sign In
          </Link>
          <Link 
            to="/register" 
            className="px-6 py-3 bg-blue-600 text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-blue-100 hover:bg-slate-950 hover:-translate-y-0.5 transition-all duration-300"
          >
            Join Now
          </Link>
        </div>

        {/* 4. Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-slate-950"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 5. Mobile Menu Overlay */}
      <div className={`absolute top-full left-0 right-0 bg-white border-b border-blue-50 p-6 flex flex-col gap-6 md:hidden transition-all duration-500 ${
        isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-sm font-bold text-slate-950 uppercase tracking-widest"
          >
            {link.name}
          </Link>
        ))}
        <div className="h-px w-full bg-slate-100"></div>
        <Link 
          to="/register" 
          className="w-full py-4 bg-blue-600 text-white text-center rounded-2xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-100"
        >
          Join Now
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;