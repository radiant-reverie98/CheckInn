import React from 'react';
import { BedDouble, Info, Waves, ChevronRight } from 'lucide-react';

const RoomBreakdownCard = ({ 
  rooms = [
    { name: "Deluxe Ocean Suite", qty: 2, price: 12500, features: ["King Bed", "Ocean View", "Private Balcony"] },
    { name: "Elite Horizon Villa", qty: 1, price: 28000, features: ["Private Pool", "24/7 Butler", "Sunset Deck"] }
  ],
  totalBeforeTax = 53000
}) => {
  return (
    <div className="max-w-7xl mx-auto px-6 mb-8">
      <div className="bg-white rounded-[2.5rem] border border-blue-50 p-8 md:p-10 shadow-[0_20px_50px_rgba(30,58,138,0.04)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(30,58,138,0.08)]">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1 h-6 bg-blue-400 rounded-full"></div>
          <h2 className="text-xl font-[800] text-slate-950 tracking-tight uppercase">
            Room <span className="italic font-serif text-slate-500 lowercase">Breakdown</span>
          </h2>
        </div>

        {/* Room Entries List */}
        <div className="space-y-8">
          {rooms.map((room, index) => (
            <div key={index} className="group">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                
                {/* Left: Room Identity */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                    <BedDouble size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                      {room.name}
                      <span className="text-blue-400 font-serif italic font-normal lowercase ml-1">
                        × {room.qty}
                      </span>
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                      {room.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Pricing Details */}
                <div className="text-left md:text-right w-full md:w-auto pl-16 md:pl-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Nightly Rate</p>
                  <p className="text-xl font-[900] text-slate-950 tracking-tighter">
                    ₹{room.price.toLocaleString()}
                    <span className="text-xs font-medium text-slate-400 tracking-normal ml-1">/ night</span>
                  </p>
                </div>
              </div>

              {/* Subtle Aqua Divider Line */}
              {index !== rooms.length - 1 && (
                <div className="h-px w-full bg-gradient-to-r from-blue-50 via-blue-50/20 to-transparent mt-8"></div>
              )}
            </div>
          ))}
        </div>

        {/* Subtotal Summary Row */}
        <div className="mt-12 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Info size={14} />
            <p className="text-[10px] font-bold uppercase tracking-widest">Pricing excluding taxes & resort fees</p>
          </div>
          
          <div className="flex items-baseline gap-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Room Subtotal</p>
            <p className="text-2xl font-[900] text-blue-600 tracking-tighter">
              ₹{totalBeforeTax.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Decorative Internal Detail */}
        <div className="absolute top-10 right-10 opacity-5 pointer-events-none hidden lg:block">
          <Waves size={40} className="text-blue-900" />
        </div>
      </div>
    </div>
  );
};

export default RoomBreakdownCard;