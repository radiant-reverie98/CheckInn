import React, { useState } from 'react';
import { User, Mail, Phone, MessageSquare, ShieldCheck, Check } from 'lucide-react';

const GuestDetails = ({ onValidSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    requests: ''
  });

  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    if (name === 'fullName' && value.length < 3) return 'Please enter your full name.';
    if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) return 'Please provide a valid email.';
    if (name === 'phone' && value.length < 10) return 'Please provide a valid phone number.';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const isValid = formData.fullName && formData.email && formData.phone && 
                  !Object.values(errors).some(err => err !== '');

  return (
    <div className="max-w-2xl w-full mx-auto">
      <div className="bg-white rounded-[2.5rem] border border-blue-50 shadow-[0_20px_50px_rgba(30,58,138,0.06)] overflow-hidden font-sans">
        
        <div className="p-10 pb-2">
          <h2 className="text-2xl font-[800] text-slate-950 tracking-tight mb-2">
            Guest Information
          </h2>
          <p className="text-slate-500 text-sm font-medium mb-8">
            Please provide details for your stay.
          </p>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-400 transition-colors group-focus-within:text-blue-600">
                  <User size={18} />
                </div>
                <input 
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Julianne Moore"
                  className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 text-sm text-slate-900 placeholder:text-slate-300 outline-none focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-500"
                />
              </div>
              {errors.fullName && <p className="text-[10px] text-red-400/80 font-bold ml-1 italic">{errors.fullName}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-400 transition-colors group-focus-within:text-blue-600">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 text-sm text-slate-900 placeholder:text-slate-300 outline-none focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-500"
                  />
                </div>
                {errors.email && <p className="text-[10px] text-red-400/80 font-bold ml-1 italic">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">
                  Phone Number
                </label>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-400 transition-colors group-focus-within:text-blue-600">
                    <Phone size={18} />
                  </div>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 text-sm text-slate-900 placeholder:text-slate-300 outline-none focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-500"
                  />
                </div>
                {errors.phone && <p className="text-[10px] text-red-400/80 font-bold ml-1 italic">{errors.phone}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">
                Special Requests (Optional)
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-6 text-blue-400 transition-colors group-focus-within:text-blue-600">
                  <MessageSquare size={18} />
                </div>
                <textarea 
                  name="requests"
                  value={formData.requests}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Any dietary needs, room preferences, or arrival details?"
                  className="w-full bg-slate-50/50 border border-slate-100 rounded-3xl py-5 pl-14 pr-6 text-sm text-slate-900 placeholder:text-slate-300 outline-none focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-500 resize-none"
                />
              </div>
            </div>
          </form>
        </div>

        <div className="p-10 pt-4 flex flex-col items-center">
          <button 
            disabled={!isValid}
            onClick={onValidSubmit}
            className={`w-full py-5 rounded-2xl font-bold text-xs tracking-[0.3em] uppercase transition-all duration-500 flex items-center justify-center gap-3 shadow-xl 
              ${isValid 
                ? 'bg-blue-600 text-white shadow-blue-100 hover:bg-slate-950 hover:-translate-y-1 active:scale-95' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
              }`}
          >
            {isValid ? <Check size={18} /> : <ShieldCheck size={18} />}
            Confirm Information
          </button>
          
          <p className="mt-6 flex items-center gap-2 text-blue-400/60 text-[10px] font-bold uppercase tracking-widest">
            <ShieldCheck size={12} />
            Data encrypted by Coastal Security Systems
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuestDetails;