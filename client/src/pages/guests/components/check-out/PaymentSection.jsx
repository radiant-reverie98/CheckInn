import React, { useState } from 'react';
import { Lock, CreditCard, ShieldCheck, Waves, Info } from 'lucide-react';

const PaymentSection = ({ totalAmount = 32360 }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock "Pay" action for UI testing
  const handleMockPay = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <div className="max-w-2xl w-full mx-auto mt-8">
      <div className="bg-white rounded-[2.5rem] border border-blue-50 shadow-[0_25px_60px_-15px_rgba(30,58,138,0.08)] overflow-hidden font-sans">
        
        {/* Header */}
        <div className="p-10 pb-6 border-b border-slate-50">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h2 className="text-2xl font-[800] text-slate-950 tracking-tight">
                Payment Details
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Lock size={12} className="text-blue-500" />
                <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">
                  Secure & Encrypted Transaction
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-10 h-6 bg-slate-50 rounded border border-slate-100 flex items-center justify-center">
                <CreditCard size={14} className="text-slate-400" />
              </div>
              <ShieldCheck size={24} className="text-blue-600/20" />
            </div>
          </div>
        </div>

        <div className="p-10 space-y-8">
          {/* Price Summary */}
          <div className="bg-slate-50 rounded-2xl p-6 flex justify-between items-center border border-blue-50/50">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Final Settlement</p>
              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Includes all coastal taxes</p>
            </div>
            <p className="text-3xl font-[900] text-slate-950 tracking-tighter">
              ₹{totalAmount.toLocaleString()}
            </p>
          </div>

          {/* Custom Mock Card Input */}
          <div className="space-y-4">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">
              Credit or Debit Card
            </label>
            <div className="space-y-4">
              <div className="relative group">
                <input 
                  type="text"
                  placeholder="Card Number (0000 0000 0000 0000)"
                  className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-4 px-6 text-sm text-slate-900 placeholder:text-slate-300 outline-none focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text"
                  placeholder="MM / YY"
                  className="bg-slate-50/50 border border-slate-100 rounded-2xl py-4 px-6 text-sm text-slate-900 placeholder:text-slate-300 outline-none focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-500"
                />
                <input 
                  type="text"
                  placeholder="CVC"
                  className="bg-slate-50/50 border border-slate-100 rounded-2xl py-4 px-6 text-sm text-slate-900 placeholder:text-slate-300 outline-none focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button 
              onClick={handleMockPay}
              disabled={isProcessing}
              className={`w-full relative overflow-hidden group py-5 rounded-2xl font-bold text-xs tracking-[0.3em] uppercase transition-all duration-500 shadow-xl shadow-blue-100/50 flex items-center justify-center gap-3
                ${isProcessing 
                  ? 'bg-slate-100 text-slate-400 cursor-wait' 
                  : 'bg-blue-600 text-white hover:bg-slate-950 hover:-translate-y-1 active:scale-95'
                }`}
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin"></div>
              ) : (
                <>
                  <Waves size={18} className="group-hover:rotate-12 transition-transform" />
                  Confirm & Pay
                </>
              )}
            </button>
            
            <p className="mt-8 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <Lock size={10} />
              Secured by CheckInn Systems
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;