import React from 'react';
import { Calendar, Users, Moon, Waves, Edit3, ShieldCheck } from 'lucide-react';

const BookingSummary = ({ 
  hotelName = "CheckInn Coastal Sanctuary", 
  location = "Maldives, Indian Ocean",
  stayDetails = { checkIn: "Oct 12, 2026", checkOut: "Oct 15, 2026", nights: 3, guests: 2 },
  selectedRooms = [
    { id: 1, name: "Deluxe Ocean Suite", qty: 2, price: 8500 },
    { id: 2, name: "Elite Horizon Villa", qty: 1, price: 12500 }
  ],
  pricing = { subtotal: 29500, taxes: 2360, serviceFee: 500 }
}) => {
  const total = pricing.subtotal + pricing.taxes + pricing.serviceFee;

  return (
    <div className="max-w-md w-full mx-auto lg:sticky lg:top-32">
      <div className="bg-white rounded-[2.5rem] border border-blue-50 shadow-[0_20px_50px_rgba(30,58,138,0.06)] overflow-hidden font-sans">
        
        <div className="p-8 pb-6 bg-slate-50/50 border-b border-blue-50">
          <span className="text-blue-600/70 text-[9px] font-bold uppercase tracking-[0.4em] mb-2 block">
            Your Reservation
          </span>
          <h2 className="text-2xl font-[800] text-slate-950 tracking-tight mb-1">
            {hotelName}
          </h2>
          <p className="text-slate-500 text-sm font-medium flex items-center gap-1.5">
            <Waves size={14} className="text-blue-400" />
            {location}
          </p>
        </div>

        <div className="p-8 space-y-8">
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Stay Details</h3>
              <button className="text-blue-600 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:text-slate-950 transition-colors group">
                <Edit3 size={10} /> Edit
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-blue-50/50">
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Arrival</p>
                <p className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <Calendar size={12} className="text-blue-500" /> {stayDetails.checkIn}
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-blue-50/50">
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Departure</p>
                <p className="text-xs font-bold text-slate-900 flex items-center gap-2">
                  <Calendar size={12} className="text-blue-500" /> {stayDetails.checkOut}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 px-2">
              <div className="flex items-center gap-2 text-slate-600 font-medium text-xs">
                <Moon size={14} className="text-blue-400" /> {stayDetails.nights} Nights
              </div>
              <div className="flex items-center gap-2 text-slate-600 font-medium text-xs">
                <Users size={14} className="text-blue-400" /> {stayDetails.guests} Guests
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Selected Suites</h3>
            <div className="space-y-3">
              {selectedRooms.map((room) => (
                <div key={room.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-bold text-slate-900">{room.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium">Qty: {room.qty} × ₹{room.price.toLocaleString()}</p>
                  </div>
                  <p className="text-sm font-bold text-slate-950">₹{(room.qty * room.price).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-100">
            <div className="flex justify-between text-xs font-medium text-slate-500">
              <span>Subtotal</span>
              <span>₹{pricing.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs font-medium text-slate-500">
              <span>Coastal Taxes (12%)</span>
              <span>₹{pricing.taxes.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs font-medium text-slate-500">
              <span>Resort Service Fee</span>
              <span>₹{pricing.serviceFee.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-end pt-4">
              <div>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">Total Amount</p>
                <p className="text-xs text-slate-400 font-medium">Includes all provisions</p>
              </div>
              <p className="text-3xl font-[900] text-slate-950 tracking-tighter">
                ₹{total.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-600 p-5 flex items-center justify-center gap-2">
          <ShieldCheck size={16} className="text-white/80" />
          <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">
            Guaranteed Secure Reservation
          </span>
        </div>
      </div>

      <p className="mt-6 text-center text-slate-400 text-[10px] font-medium leading-relaxed px-8">
        By proceeding, you agree to our coastal stay policies and our commitment to ocean conservation.
      </p>
    </div>
  );
};

export default BookingSummary;