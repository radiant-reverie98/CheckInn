import React, { useState } from 'react';
import { Mail, Lock, Waves, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
const LoginGuest = () => {
  const navigate = useNavigate()
  const {setUser,setLoading} = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        setLoading(true)
        const res = await axios.post(`http://localhost:5000/api/loginGuest`,formData,{withCredentials: true})
        if(res.data.success){
            setUser(true)
            alert('Login successful')
            navigate('/')
        }
    }catch(err){
        console.log(`${err}`)
        if(err.response){
            alert(err.response.data.message)
        }
    }finally{setLoading(false)}
    
  };

  return (
    <div className="min-h-screen bg-white flex font-sans">
      
      {/* 1. Left Side: Visual Anchor (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-md text-white">
          <div className="flex items-center gap-3 mb-8">
            <Waves size={40} className="text-blue-200" />
            <span className="text-3xl font-[900] tracking-tighter uppercase">
              Check<span className="text-blue-200 italic font-serif lowercase">Inn</span>
            </span>
          </div>
          <h2 className="text-5xl font-[800] leading-tight tracking-tight mb-6">
            Welcome <span className="italic font-serif text-blue-100">back</span> to the coast.
          </h2>
          <p className="text-blue-100 text-lg font-medium leading-relaxed opacity-90">
            Revisit your saved sanctuaries and manage your upcoming seaside escapes with ease.
          </p>
          
          <div className="mt-12 flex items-center gap-4 py-4 px-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 w-fit">
            <KeyRound className="text-blue-200" size={20} />
            <span className="text-xs font-bold uppercase tracking-widest">Secure Member Access</span>
          </div>
        </div>

        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-400/20 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      {/* 2. Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-slate-50/50">
        <div className="w-full max-w-md space-y-10 animate-in fade-in slide-in-from-left-4 duration-1000">
          
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-[900] text-slate-950 tracking-tighter mb-2">
              Sign <span className="italic font-serif text-slate-500">In</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm">Welcome back. Please enter your credentials.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Address */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all duration-500 shadow-sm"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-end mb-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Password</label>
                <Link to="/forgot-password" size={18} className="text-[10px] font-bold text-blue-500 uppercase tracking-widest hover:text-slate-950 transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-900 outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all duration-500 shadow-sm"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <button className="w-full group relative overflow-hidden bg-blue-600 text-white py-5 rounded-2xl font-bold text-xs tracking-[0.3em] uppercase transition-all duration-500 shadow-xl shadow-blue-100 hover:bg-slate-950 hover:-translate-y-1 active:scale-95">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Sign In <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </form>

          {/* Registration Redirect */}
          <div className="text-center pt-4">
            <p className="text-sm text-slate-400 font-medium">
              New to our sanctuaries?{' '}
              <Link to="/guest/register" className="text-blue-600 font-bold hover:underline transition-all underline-offset-4">
                Join Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginGuest;