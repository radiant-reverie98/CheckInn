import React from 'react';
import { 
  Calendar, Users, Moon, MapPin, 
  ChevronRight, FileText, XCircle, MessageCircle 
} from 'lucide-react';

const BookingCard = ({ booking = {}, onCancelClick }) => {
  if (!booking || !booking.hotelName) {
    return (
      <div className="w-full h-64 bg-slate-50 rounded-[2rem] border border-blue-50 animate-pulse flex items-center justify-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Preparing your stay details...</p>
      </div>
    );
  }

  const statusStyles = {
    Upcoming: "bg-blue-50 text-blue-600 border-blue-100",
    Completed: "bg-slate-50 text-slate-500 border-slate-100",
    Cancelled: "bg-red-50 text-red-400 border-red-100",
    Paid: "bg-teal-50 text-teal-600 border-teal-100",
    Pending: "bg-amber-50 text-amber-600 border-amber-100",
    Refunded: "bg-slate-100 text-slate-400 border-slate-200",
  };

  return (
    <div className="group relative bg-white rounded-[2rem] border border-blue-50/50 p-8 shadow-[0_15px_40px_-15px_rgba(30,58,138,0.05)] transition-all duration-500 hover:shadow-[0_30px_60px_-20px_rgba(30,58,138,0.1)] hover:-translate-y-1 hover:border-blue-100 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 pb-8 border-b border-slate-50">
        <div className="flex items-center gap-5">
          <img 
            src={booking.thumbnail || "/api/placeholder/120/120"} 
            alt={booking.hotelName} 
            className="w-20 h-20 rounded-2xl object-cover border border-blue-50 shadow-sm"
          />
          <div>
            <h3 className="text-xl font-[800] text-slate-950 tracking-tight mb-1">
              {booking.hotelName}
            </h3>
            <div className="flex items-center gap-1.5 text-slate-400 text-sm font-medium">
              <MapPin size={14} className="text-blue-400" />
              {booking.location}
            </div>
          </div>
        </div>

        <div className="flex flex-row md:flex-col items-center md:items-end gap-2">
          <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${statusStyles[booking.bookingStatus]}`}>
            {booking.bookingStatus}
          </span>
          <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${statusStyles[booking.paymentStatus]}`}>
            {booking.paymentStatus}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
        <div className="space-y-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Timeline</p>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-xs text-slate-400 font-medium mb-1">Check-in</p>
              <p className="text-sm font-bold text-slate-900">{booking.checkIn}</p>
            </div>
            <div className="h-8 w-px bg-blue-50"></div>
            <div>
              <p className="text-xs text-slate-400 font-medium mb-1">Check-out</p>
              <p className="text-sm font-bold text-slate-900">{booking.checkOut}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Occupancy</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Moon size={16} className="text-blue-300" /> {booking.nights} Nights
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
              <Users size={16} className="text-blue-300" /> {booking.guests} Guests
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Accommodations</p>
          <div className="space-y-1">
            {booking.rooms?.map((room, idx) => (
              <p key={idx} className="text-sm font-bold text-slate-700 flex justify-between">
                <span>{room.name}</span>
                <span className="text-blue-600 ml-2">×{room.qty}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Total Amount</p>
          <p className="text-2xl font-[900] text-slate-950 tracking-tighter">
            ₹{booking.total?.toLocaleString()}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-50 text-blue-600 text-[11px] font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-300 group/chat">
            <MessageCircle size={16} className="group-hover/chat:scale-110 transition-transform" /> 
            Chat
          </button>

          {booking.bookingStatus === "Upcoming" && (
            <button 
              onClick={onCancelClick}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-red-50 text-red-400 text-[11px] font-bold uppercase tracking-widest hover:bg-red-50 transition-colors"
            >
              <XCircle size={14} /> Cancel
            </button>
          )}
          
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-100 text-slate-500 text-[11px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors">
            <FileText size={14} /> Invoice
          </button>

          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-blue-600 text-white text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-blue-100 hover:bg-slate-950 hover:-translate-y-1 transition-all duration-300 group">
            View Details 
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;