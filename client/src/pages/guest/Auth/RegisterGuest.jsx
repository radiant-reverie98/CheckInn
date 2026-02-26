import React, { useState } from 'react';
import { User, Mail, Lock, Waves, ArrowRight, ShieldCheck, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';


const RegisterGuest = () => {
  const navigate = useNavigate()
  const {setUser,setLoading} = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        setLoading(true)
        const res = await axios.post(`http://localhost:5000/api/registerGuest`,formData,{withCredentials:true})
        if(res.data.success){
            setUser(true)
            navigate('/')
        }
    }catch(err){
        console.log(err)
        if(err.response){
            alert(err.response.data.message)
        }
    }finally{setLoading(false)}
  };

  return (
    <div className="min-h-screen bg-white flex font-sans">
      
      {/* 1. Left Side: Visual Anchor (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-md text-white">
          <div className="flex items-center gap-3 mb-8">
            <Waves size={40} className="text-blue-200" />
            <span className="text-3xl font-[900] tracking-tighter uppercase">
              Check<span className="text-blue-200 italic font-serif lowercase">Inn</span>
            </span>
          </div>
          <h2 className="text-5xl font-[800] leading-tight tracking-tight mb-6">
            Begin your <span className="italic font-serif text-blue-100">journey</span> to serenity.
          </h2>
          <p className="text-blue-100 text-lg font-medium leading-relaxed opacity-90">
            Join our exclusive community of travelers and unlock access to the world's most peaceful coastal sanctuaries.
          </p>
          
          <div className="mt-12 flex items-center gap-4 py-4 px-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 w-fit">
            <ShieldCheck className="text-blue-200" />
            <span className="text-xs font-bold uppercase tracking-widest">Verified Sanctuary Access</span>
          </div>
        </div>

        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-400/20 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      {/* 2. Right Side: Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-slate-50/50">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-4 duration-1000">
          
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-[900] text-slate-950 tracking-tighter mb-2">
              Create <span className="italic font-serif text-slate-500">Account</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm">Enter your details to start your reservation.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all duration-500 shadow-sm"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all duration-500 shadow-sm"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Phone Number</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="tel" 
                  placeholder="+91 00000 00000"
                  className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all duration-500 shadow-sm"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all duration-500 shadow-sm"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            {/* Register Button */}
            <div className="pt-4">
                <button className="w-full group relative overflow-hidden bg-blue-600 text-white py-4.5 rounded-2xl font-bold text-xs tracking-[0.3em] uppercase transition-all duration-500 shadow-xl shadow-blue-100 hover:bg-slate-950 hover:-translate-y-1 active:scale-95">
                <span className="relative z-10 flex items-center justify-center gap-2">
                    Create Account <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
                </button>
            </div>
          </form>

          {/* Login Redirect */}
          <div className="text-center">
            <p className="text-sm text-slate-400 font-medium">
              Already have an account?{' '}
              <Link to="/guest/login" className="text-blue-600 font-bold hover:underline transition-all underline-offset-4">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterGuest;