import React from 'react';
import { User, Bed, Waves, Plus, Minus, CheckCircle2, ShoppingBag } from 'lucide-react';

const AvailableRooms = ({ rooms = [], selectedRooms = {}, onUpdateQuantity }) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24 bg-white" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      
      {/* Refined Coastal Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <span className="text-blue-600/70 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">
            Your Selection
          </span>
          <h2 className="text-4xl font-[600] text-slate-950 tracking-tight leading-tight">
            Choose Your <span className="italic font-serif text-slate-500">Sanctuary</span>
          </h2>
        </div>
        
        {/* Live Counter Summary - Nautical Themed */}
        <div className="flex items-center gap-3 bg-slate-50 border border-blue-50 px-6 py-3 rounded-2xl shadow-sm">
          <ShoppingBag size={18} className="text-blue-600" />
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">
            {Object.values(selectedRooms).reduce((a, b) => a + b, 0)} Rooms Reserved
          </span>
        </div>
      </div>

      {/* Room Category Stack */}
      <div className="space-y-10">
        {rooms.map((room) => {
          const qty = selectedRooms[room.id] || 0;
          const isActive = qty > 0;

          return (
            <div 
              key={room.id}
              className={`group relative bg-white rounded-[2.5rem] transition-all duration-700 overflow-hidden border-2 
                ${isActive 
                  ? 'border-blue-600 shadow-[0_30px_60px_-15px_rgba(30,58,138,0.12)] ring-8 ring-blue-50/50' 
                  : 'border-slate-50 shadow-[0_10px_40px_-10px_rgba(30,58,138,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(30,58,138,0.08)]'
                }`}
            >
              <div className="flex flex-col md:flex-row items-stretch min-h-[300px]">
                
                {/* 1. Image Section - Ocean Vista */}
                <div className="md:w-1/3 relative overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {isActive && (
                    <div className="absolute top-6 left-6 bg-blue-600 text-white p-2.5 rounded-xl shadow-lg animate-in zoom-in duration-500">
                      <CheckCircle2 size={20} />
                    </div>
                  )}
                  {/* Subtle water-like overlay */}
                  <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-transparent transition-colors duration-700"></div>
                </div>

                {/* 2. Content Section */}
                <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-[800] text-slate-900 tracking-tight mb-8 group-hover:text-blue-600 transition-colors">
                      {room.name}
                    </h3>

                    <div className="flex flex-wrap gap-x-12 gap-y-5">
                      <div className="flex items-center gap-3 text-slate-500 font-medium">
                        <User size={18} className="text-blue-400" />
                        <span className="text-[13px] tracking-wide">Max {room.capacity} Guests</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 font-medium">
                        <Bed size={18} className="text-blue-400" />
                        <span className="text-[13px] tracking-wide">{room.bedType}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 font-medium">
                        <Waves size={18} className="text-blue-400" />
                        <span className="text-[13px] tracking-wide">{room.view}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Footer */}
                  <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Exchange</p>
                      <p className="text-2xl font-[800] text-slate-950">₹{room.price}<span className="text-xs font-medium text-slate-400 ml-1">/night</span></p>
                    </div>

                    {/* 3. Nautical Interaction Logic */}
                    {!isActive ? (
                      <button 
                        onClick={() => onUpdateQuantity(room.id, 1)}
                        className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold text-[12px] tracking-widest uppercase hover:bg-slate-900 hover:-translate-y-1 transition-all duration-500 shadow-lg shadow-blue-100"
                      >
                        Add to Stay
                      </button>
                    ) : (
                      <div className="flex items-center bg-blue-50 border border-blue-100 rounded-2xl p-1.5 animate-in slide-in-from-right-4">
                        <button 
                          onClick={() => onUpdateQuantity(room.id, qty - 1)}
                          className="p-3 text-blue-700 hover:bg-white rounded-xl transition-all active:scale-90"
                        >
                          <Minus size={20} />
                        </button>
                        
                        <span className="px-8 text-lg font-[800] text-blue-900 min-w-[3.5rem] text-center">
                          {qty}
                        </span>

                        <button 
                          onClick={() => onUpdateQuantity(room.id, qty + 1)}
                          className="p-3 text-blue-700 hover:bg-white rounded-xl transition-all active:scale-90"
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailableRooms;