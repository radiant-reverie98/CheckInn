import React from 'react';
import { CheckCircle2, Clock, XCircle, ShieldCheck, Waves } from 'lucide-react';

const BookingStatusBanner = ({ 
  bookingStatus = "Confirmed", 
  paymentStatus = "Paid" 
}) => {
  
  const config = {
    Confirmed: {
      bg: "bg-teal-50/60",
      border: "border-teal-100",
      icon: <CheckCircle2 className="text-teal-500" size={24} />,
      title: "Booking Confirmed",
      subtext: "Your reservation is secured and confirmed. We look forward to your arrival.",
      accent: "text-teal-700"
    },
    Upcoming: {
      bg: "bg-blue-50/60",
      border: "border-blue-100",
      icon: <Waves className="text-blue-500" size={24} />,
      title: "Upcoming Stay",
      subtext: "Your coastal escape is approaching. Prepare for a serene experience.",
      accent: "text-blue-700"
    },
    Completed: {
      bg: "bg-slate-50/80",
      border: "border-slate-100",
      icon: <ShieldCheck className="text-slate-400" size={24} />,
      title: "Stay Completed",
      subtext: "Your stay has been successfully completed. We hope to see you again soon.",
      accent: "text-slate-600"
    },
    Cancelled: {
      bg: "bg-red-50/50",
      border: "border-red-100/50",
      icon: <XCircle className="text-red-400/70" size={24} />,
      title: "Booking Cancelled",
      subtext: "This booking has been cancelled. Any applicable refunds are being processed.",
      accent: "text-red-700/80"
    }
  };

  const status = config[bookingStatus] || config.Confirmed;

  const paymentStyles = {
    Paid: "bg-teal-500 text-white shadow-sm shadow-teal-100",
    Pending: "bg-amber-50 text-amber-600 border border-amber-100",
    Refunded: "bg-slate-100 text-slate-500 border border-slate-200"
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className={`relative overflow-hidden rounded-[2rem] border ${status.border} ${status.bg} p-8 md:p-10 transition-all duration-500 hover:shadow-lg hover:shadow-blue-900/5`}>
        
        {/* Decorative Internal Wave Pattern */}
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Waves size={120} />
        </div>

        <div className="relative flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            {/* Status Icon Container */}
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center">
              {status.icon}
            </div>

            <div className="space-y-2">
              <div className="flex flex-col md:flex-row items-center gap-3">
                <h2 className="text-2xl font-[800] text-slate-950 tracking-tight">
                  {status.title}
                </h2>
                {/* Payment Badge */}
                <span className={`px-4 py-1 rounded-full text-[9px] font-[900] uppercase tracking-[0.2em] ${paymentStyles[paymentStatus]}`}>
                  {paymentStatus}
                </span >
              </div>
              <p className="text-slate-500 text-base font-medium leading-relaxed max-w-xl">
                {status.subtext}
              </p>
            </div>
          </div>

          {/* Timestamp / Log - Professional Side Detail */}
          <div className="flex items-center gap-3 px-6 py-3 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/50 shadow-sm">
            <Clock size={16} className="text-slate-400" />
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Updated</p>
              <p className="text-xs font-bold text-slate-900">Today at 14:45 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStatusBanner;