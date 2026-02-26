import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Star, MapPin, ShieldCheck, ArrowRight, Sun } from 'lucide-react';
import axios from 'axios';

export default function GuestRegister() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
        const res = await axios.post(`http://localhost:5000/api/registerGuest`,formData)
        console.log(res)
        if(res.data.success){
            navigate("/",{replace: true})
        }
    }catch(err){
        console.log(err)
        if(err.response){
            alert(err.response.data.message)
        }
        
    }
  }

  // Synced with Navbar Sunlight Tones
  const inputClasses = "w-full px-4 py-3 rounded-xl bg-orange-50/30 border border-orange-100 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-100/50 outline-none transition-all placeholder:text-stone-300 text-stone-700 font-medium";
  const labelClasses = "block text-[11px] font-bold text-stone-500 mb-1.5 uppercase tracking-[0.15em]";

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex flex-col md:flex-row" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      
      {/* Left Column: Visual Brand Story */}
      <div className="hidden lg:flex flex-1 bg-orange-50 relative overflow-hidden items-center justify-center p-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay" 
            alt="Luxury Hotel"
          />
          {/* Sunset Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-200/40 via-transparent to-amber-100/30"></div>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-orange-100 text-amber-700 text-xs font-bold mb-8 shadow-sm">
            <Sun size={14} className="text-amber-500 animate-pulse" />
            Your Golden Escape Awaits
          </div>
          <h2 className="text-5xl font-[800] text-stone-800 leading-[1.1] mb-6 tracking-tight">
            Follow the <span className="text-amber-500">Sun</span> to your next stay.
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start group">
              <div className="p-2.5 rounded-xl bg-white shadow-sm text-amber-500 group-hover:scale-110 transition-transform"><MapPin size={20} /></div>
              <div>
                <p className="text-stone-800 font-bold">Curated Sanctuaries</p>
                <p className="text-stone-500 text-sm leading-relaxed">Discover rooms hand-picked for their warmth and character.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start group">
              <div className="p-2.5 rounded-xl bg-white shadow-sm text-amber-500 group-hover:scale-110 transition-transform"><ShieldCheck size={20} /></div>
              <div>
                <p className="text-stone-800 font-bold">Effortless Booking</p>
                <p className="text-stone-500 text-sm leading-relaxed">A seamless journey from registration to check-in.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Warm Sunlight Form */}
      <div className="flex-1 flex flex-col p-8 md:p-16 lg:p-24 justify-center relative">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/20 rounded-full blur-[100px] -z-10"></div>
        
        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-10">
              <Sun className="w-6 h-6 text-amber-500" />
              <div className="text-2xl font-[800] text-stone-800 tracking-tighter">Check<span className="text-amber-500">Inn.</span></div>
            </div>
            <h1 className="text-3xl font-[800] text-stone-800 mb-2 tracking-tight">Create your account</h1>
            <p className="text-stone-400 font-medium">Join us for a warmer, brighter travel experience.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className={labelClasses}>Full Name</label>
              <input 
                name="name"
                type="text" 
                placeholder="Eleanor Pena"
                className={inputClasses}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className={labelClasses}>Email Address</label>
              <input 
                name="email"
                type="email" 
                placeholder="eleanor@example.com"
                className={inputClasses}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className={labelClasses}>Phone Number</label>
              <input 
                name="phone"
                type="tel" 
                placeholder="+1 (555) 000-0000"
                className={inputClasses}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <label className={labelClasses}>Password</label>
              <input 
                name="password"
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className={inputClasses}
                onChange={handleChange}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-stone-400 hover:text-amber-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button 
              type="submit" 
              className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-bold rounded-2xl shadow-lg shadow-orange-200/50 hover:shadow-orange-300/60 hover:-translate-y-1 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
            >
              Start Your Stay
              <ArrowRight size={18} />
            </button>

            <div className="pt-6 text-center">
              <p className="text-sm text-stone-400 font-medium">
                Already a member?{' '}
                <button 
                  onClick={() => navigate('/login')}
                  className="text-amber-600 font-bold hover:text-orange-500 transition-colors underline decoration-amber-200 underline-offset-4"
                >
                  Log in here
                </button>
              </p>
            </div>
          </form>
          
          {/* Secondary CTA / Info */}
          <div className="mt-12 flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/50 border border-orange-100/50">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-amber-500 shadow-sm">
              <Star size={20} fill="currentColor" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-amber-800 uppercase tracking-widest">Sunset Rewards</p>
              <p className="text-[12px] text-stone-500 font-medium leading-tight mt-0.5">Members save an extra 10% on their first sun-drenched getaway.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}