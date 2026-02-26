import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sun, ArrowRight, Lock, Mail } from 'lucide-react';
import axios from 'axios';

export default function GuestLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:5000/api/loginGuest`,
        { email, password },
        { withCredentials: true }
      );
      
      if (res.data.success) {
        // Use replace to skip the login page in browser history
        navigate('/', { replace: true });
      } else {
        alert(res.data.message || "Invalid credentials");
      } 
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full pl-11 pr-4 py-3.5 rounded-2xl bg-orange-50/30 border border-orange-100 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-100/50 outline-none transition-all placeholder:text-stone-300 text-stone-700 font-medium";
  const labelClasses = "block text-[11px] font-bold text-stone-500 mb-2 uppercase tracking-[0.15em]";

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex items-center justify-center p-6 relative overflow-hidden" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      
      {/* Dynamic Sunlight Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-orange-100/20 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-[480px] w-full bg-white/70 backdrop-blur-xl rounded-[40px] border border-orange-100/50 shadow-[0_20px_50px_rgba(251,191,36,0.1)] p-10 md:p-14 transition-all">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-8 group cursor-pointer" onClick={() => navigate('/')}>
            <Sun className="w-7 h-7 text-amber-500 group-hover:rotate-90 transition-transform duration-700" />
            <div className="text-2xl font-[800] text-stone-800 tracking-tighter">
              Check<span className="text-amber-500">Inn.</span>
            </div>
          </div>
          <h1 className="text-3xl font-[800] text-stone-800 mb-3 tracking-tight">Welcome Back.</h1>
          <p className="text-stone-400 font-medium text-sm">Your next sun-drenched escape is just a sign-in away.</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email Field */}
          <div className="relative">
            <label className={labelClasses}>Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500/50 w-5 h-5" />
              <input 
                required
                type="email" 
                placeholder="hello@traveler.com"
                className={inputClasses}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <div className="flex justify-between items-end mb-2">
              <label className={labelClasses}>Password</label>
              <button type="button" className="text-[11px] font-bold text-amber-600 hover:text-orange-500 transition-colors uppercase tracking-wider mb-2">
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500/50 w-5 h-5" />
              <input 
                required
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                className={inputClasses}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 hover:text-amber-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-[800] rounded-2xl shadow-lg shadow-orange-200/50 hover:shadow-orange-300/60 hover:-translate-y-1 active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4 disabled:opacity-50 disabled:transform-none"
          >
            {loading ? "Waking the sun..." : "Start My Escape"}
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        {/* Footer Section */}
        <div className="mt-12 text-center">
          <p className="text-sm text-stone-400 font-medium">
            New to CheckInn?{' '}
            <button 
              onClick={() => navigate('/guest/register')}
              className="text-amber-600 font-bold hover:text-orange-500 transition-colors underline decoration-amber-200 underline-offset-4"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>

      {/* Trust Micro-copy */}
      <p className="absolute bottom-8 text-[11px] text-stone-300 font-bold uppercase tracking-[0.2em]">
        Secure Sunlit Encrypted Access
      </p>
    </div>
  );
}