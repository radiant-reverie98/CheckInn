import React from 'react';
import { ShieldCheck, CreditCard, Download, ExternalLink, Receipt, Waves } from 'lucide-react';

const PaymentDetailsCard = ({ 
  breakdown = { subtotal: 53000, taxes: 6360, serviceFee: 1200 },
  payment = { 
    method: "Credit Card", 
    provider: "Stripe", 
    last4: "4242", 
    date: "Feb 23, 2026", 
    txnId: "CH_3M2L9P2E0V1S",
    status: "Paid" 
  }
}) => {
  const total = breakdown.subtotal + breakdown.taxes + breakdown.serviceFee;

  const statusStyles = {
    Paid: "bg-teal-50 text-teal-600 border-teal-100",
    Pending: "bg-amber-50 text-amber-600 border-amber-100",
    Refunded: "bg-slate-100 text-slate-400 border-slate-200"
  };

  return (
    <div className="max-w-7xl mx-auto px-6 mb-12">
      <div className="bg-white rounded-[2.5rem] border border-blue-50 p-8 md:p-12 shadow-[0_25px_60px_-15px_rgba(30,58,138,0.06)] relative overflow-hidden">
        
        {/* Header with Security Badge */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-blue-400 rounded-full"></div>
            <h2 className="text-xl font-[800] text-slate-950 tracking-tight uppercase">
              Payment <span className="italic font-serif text-slate-500 lowercase">Details</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-50/50 rounded-full border border-blue-50 text-blue-600">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Verified Secure</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Price Breakdown */}
          <div className="space-y-6">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Financial Breakdown</p>
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-medium text-slate-500">
                <span>Room Subtotal</span>
                <span>₹{breakdown.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-slate-500">
                <span>Taxes & GST (12%)</span>
                <span>₹{breakdown.taxes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-medium text-slate-500">
                <span>Sanctuary Service Fee</span>
                <span>₹{breakdown.serviceFee.toLocaleString()}</span>
              </div>
              <div className="h-px w-full bg-slate-100 my-4"></div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-900 uppercase tracking-widest">Total Paid</span>
                <span className="text-3xl font-[900] text-slate-950 tracking-tighter">
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Metadata */}
          <div className="lg:border-l lg:border-blue-50 lg:pl-16 space-y-8">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Payment Method</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 bg-slate-50 rounded border border-slate-100 flex items-center justify-center text-slate-400">
                    <CreditCard size={16} />
                  </div>
                  <span className="text-sm font-bold text-slate-900">{payment.method} (•••• {payment.last4})</span>
                </div>
              </div>
              <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusStyles[payment.status]}`}>
                {payment.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Transaction Date</p>
                <p className="text-sm font-bold text-slate-900">{payment.date}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Transaction ID</p>
                <p className="text-xs font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded truncate">
                  {payment.txnId}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 flex flex-wrap gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-950 hover:-translate-y-0.5 transition-all shadow-lg shadow-blue-100">
                <Download size={14} /> Download Invoice
              </button>
              <button className="flex items-center gap-2 px-6 py-3 border border-slate-100 text-slate-500 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors">
                <Receipt size={14} /> View Receipt
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Internal Detail */}
        <div className="absolute -bottom-6 -right-6 opacity-[0.03] pointer-events-none">
          <Waves size={160} className="text-blue-900" />
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsCard;