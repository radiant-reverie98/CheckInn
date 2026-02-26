import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function OwnerLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/checkSession`, { withCredentials: true });
        if (res.data.success) {
          navigate('/dashboard', { replace: true });
        }
      } catch (err) {
        // User not logged in, stay on page
      }
    };
    checkExistingSession();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:5000/api/loginOwner`,
        { email, password },
        { withCredentials: true }
      );
      
      if (res.data.success) {
        navigate('/dashboard', { replace: true });
      } else {
        alert(res.data.message || "Invalid credentials");
      } 
    } catch (err) {
      console.error(`LOGIN ERROR: ${err}`);
      alert(err.response?.data?.message || "Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-[800] text-[#003580] tracking-tight">
            CheckInn
          </div>
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            className="text-sm font-semibold text-slate-500 hover:text-[#003580] transition-colors"
          >
            Back to Home
          </button>
        </div>
      </nav>

      <div className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[32px] shadow-2xl shadow-blue-900/5 overflow-hidden border border-slate-100 p-10 sm:p-12">
          
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-[800] text-slate-900 mb-3 tracking-tight">
              Welcome Back.
            </h1>
            <p className="text-slate-500 font-medium">
              Enter your credentials to access your dashboard.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-[13px] font-bold text-slate-700 mb-2 uppercase tracking-wider">Work Email</label>
              <input 
                required
                type="email" 
                placeholder="alex@hotel.com"
                value={email}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#003580] focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-slate-400"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-[13px] font-bold text-slate-700 uppercase tracking-wider">Password</label>
                <a href="#" className="text-[12px] font-bold text-[#003580] hover:underline">Forgot Password?</a>
              </div>
              <input 
                required
                type="password" 
                placeholder="••••••••"
                value={password}
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#003580] focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-slate-400"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-[#003580] text-white font-bold rounded-2xl shadow-lg shadow-blue-900/20 hover:bg-[#002a66] transition-all transform hover:-translate-y-0.5 active:scale-[0.98] mt-2 cursor-pointer disabled:bg-slate-400 disabled:transform-none"
            >
              {loading ? "Verifying..." : "Sign In"}
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            <p className="text-center text-sm font-medium text-slate-500">
              Don't have an account?{' '}
              <a href="/register" className="text-[#003580] font-bold hover:underline decoration-2 underline-offset-4">
                Register Property
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}