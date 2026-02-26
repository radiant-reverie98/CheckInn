import React, { useState } from 'react';
import BookingSummary from './components/check-out/BookingSummary';
import GuestDetails from './components/check-out/GuestDetails';
import PaymentSection from './components/check-out/PaymentSection';
import { ChevronLeft, ShieldCheck, Waves, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

function CheckOut() {
  const [step, setStep] = useState(1); // 1: Guest Details, 2: Payment

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-blue-50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => step === 2 ? setStep(1) : window.history.back()}
            className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors group"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
              {step === 1 ? 'Back to Selection' : 'Back to Details'}
            </span>
          </button>
          
          <div className="flex items-center gap-2">
            <Waves className="w-5 h-5 text-blue-600" />
            <span className="text-lg font-[800] tracking-tighter uppercase">
              Check<span className="text-blue-500 italic font-serif lowercase">Inn</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-blue-600/60 font-bold text-[10px] uppercase tracking-widest">
            <Lock size={14} />
            Encrypted Checkout
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        {/* Progress Stepper - Dynamic Coastal Style */}
        <div className="flex items-center justify-start gap-8 mb-12 ml-2">
          <div className="flex items-center gap-3">
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors duration-500 ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>1</span>
            <span className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${step === 1 ? 'text-slate-900' : 'text-slate-400'}`}>Guest Details</span>
          </div>
          <div className={`h-px w-12 transition-colors duration-500 ${step === 2 ? 'bg-blue-600' : 'bg-blue-100'}`}></div>
          <div className="flex items-center gap-3">
            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors duration-500 ${step === 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>2</span>
            <span className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${step === 2 ? 'text-slate-900' : 'text-slate-400'}`}>Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Switcher */}
          <div className="lg:col-span-7 xl:col-span-8">
            {step === 1 ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <GuestDetails onValidSubmit={() => setStep(2)} />
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <PaymentSection />
              </div>
            )}
            
            <div className="mt-8 p-6 bg-blue-50/30 border border-blue-50 rounded-3xl flex items-start gap-4 animate-in fade-in duration-1000">
              <ShieldCheck className="text-blue-500 mt-1" size={20} />
              <div>
                <p className="text-sm font-bold text-slate-900">Your privacy is our priority.</p>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  We use industry-leading encryption to protect your personal information. Your details are only used to facilitate your stay at the sanctuary.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar remains consistent */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28 animate-in fade-in slide-in-from-right-4 duration-700 delay-150">
            <BookingSummary />
          </div>

        </div>
      </main>
    </div>
  );
}

export default CheckOut;