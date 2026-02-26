import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function OwnerRegister() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      
      const res = await axios.post(`http://localhost:5000/api/registerOwner`, {
        name,
        email,
        password
      },{withCredentials: true});

      if (res.data.success) {
        navigate("/onboarding/create-hotel/welcome");
      } else {
        alert(res.data.message || "Something went wrong! Try again later");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please check if your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      {/* NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-[800] text-[#003580] tracking-tight">
            CheckInn
          </div>
          <button type="button" onClick={() => navigate('/')} className="text-sm font-semibold text-slate-500 hover:text-[#003580] transition-colors">
            Back to Home
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[32px] shadow-2xl shadow-blue-900/5 overflow-hidden border border-slate-100">
          
          {/* LEFT SIDE: FORM */}
          <div className="p-10 sm:p-14">
            <div className="mb-10">
              <h1 className="text-4xl font-[800] text-slate-900 mb-3 tracking-tight">
                Get Started.
              </h1>
              <p className="text-slate-500 font-medium">
                The modern way to manage your property.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleRegister}>
              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2 uppercase tracking-wider">Full Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#003580] focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-slate-400"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2 uppercase tracking-wider">Work Email</label>
                <input 
                  required
                  type="email" 
                  placeholder="alex@hotel.com"
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#003580] focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-slate-400"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-slate-700 mb-2 uppercase tracking-wider">Password</label>
                <input 
                  required
                  type="password" 
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#003580] focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-slate-400"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* REPLACED BUTTON WITH INPUT TYPE SUBMIT */}
              <input 
                type="submit" 
                value={loading ? "Creating Account..." : "Create My Account"}
                disabled={loading}
                className="w-full py-4 bg-[#003580] text-white font-bold rounded-2xl shadow-lg shadow-blue-900/20 hover:bg-[#002a66] transition-all transform hover:-translate-y-0.5 active:scale-[0.98] mt-2 cursor-pointer disabled:bg-slate-400 disabled:cursor-not-allowed"
              />

              <p className="text-center text-sm font-medium text-slate-500">
                Joined us before?{' '}
                <a href="/login" className="text-[#003580] font-bold hover:underline decoration-2 underline-offset-4">
                  Log in
                </a>
              </p>
            </form>
          </div>

          {/* RIGHT SIDE: PREMIUM CARD */}
          <div className="hidden lg:flex bg-[#003580] p-12 flex-col justify-between text-white relative">
             <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '24px 24px' }}></div>
            
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.2em] uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                Coming Soon: Mobile App
              </div>
              <h2 className="text-3xl font-[700] leading-tight mb-6">
                "We saved 20+ hours a week on manual bookings."
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center font-bold text-xl shadow-lg">
                  M
                </div>
                <div>
                  <p className="font-bold">Marco Rossi</p>
                  <p className="text-sm text-blue-200 font-medium">Grand Heritage Suites</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-4">
               <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <p className="text-2xl font-bold">99.9%</p>
                  <p className="text-[10px] text-blue-200 uppercase font-bold tracking-widest">Uptime</p>
               </div>
               <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                  <p className="text-2xl font-bold">24/7</p>
                  <p className="text-[10px] text-blue-200 uppercase font-bold tracking-widest">Support</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}