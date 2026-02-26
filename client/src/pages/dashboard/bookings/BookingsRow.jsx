import React, { useState, useRef, useEffect } from 'react';
import StatusBadge from './StatusBadge';

const BookingRow = ({ booking, onView, onCheckIn, onCheckOut, onCancel, onChat }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Chat disabling logic
  const isPastCheckout = Date.now() > new Date(booking.check_out).setHours(23, 59, 59, 999);
  const isChatDisabled = 
    booking.status === "completed" || 
    booking.status === "cancelled" || 
    isPastCheckout;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsMenuOpen(false);
    };
    if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <tr className="group hover:bg-gray-50 border-b border-gray-100 transition-colors">
      <td className="py-4 px-6 text-sm font-medium text-[#003580]">
        #{booking.id}
      </td>
      <td className="py-4 px-6">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">{booking.guest_name}</span>
          <span className="text-xs text-gray-500">{booking.guestEmail}</span>
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex flex-col">
          <span className="text-sm text-gray-700 font-medium">{booking.room_number}</span>
          <span className="text-xs text-gray-400">{booking.roomType}</span>
        </div>
      </td>
      <td className="py-4 px-6 text-sm text-gray-600">
        {booking.check_in}
      </td>
      <td className="py-4 px-6 text-sm text-gray-600">
        {booking.check_out}
      </td>
      <td className="py-4 px-6">
        <StatusBadge status={booking.status} />
      </td>
      <td className="py-4 px-6 text-sm font-bold text-gray-900">
        ₹{booking.amount}
      </td>
      {/* Chat Icon Column */}
      <td className="py-4 px-6 text-center">
        <button
          onClick={() => onChat(booking)}
          disabled={isChatDisabled}
          title={isChatDisabled ? "Chat unavailable" : "Open chat"}
          className={`p-2 rounded-full transition-all duration-200 ${
            isChatDisabled 
              ? "text-gray-300 cursor-not-allowed" 
              : "text-[#003580] hover:bg-blue-50 active:scale-95"
          }`}
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      </td>
      <td className="py-4 px-6 text-right relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-md hover:bg-gray-200 text-gray-400 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>

        {isMenuOpen && (
          <div ref={menuRef} className="absolute right-6 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1 text-left">
            <button onClick={() => onView(booking)} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#003580]">View Details</button>
            
            {booking.status === 'confirmed' && (
              <button onClick={() => onCheckIn(booking.id)} className="w-full text-left px-4 py-2 text-sm text-green-600 hover:bg-green-50 font-medium">Check In</button>
            )}
            
            {booking.status === 'checked-in' && (
              <button onClick={() => onCheckOut(booking.id)} className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 font-medium">Check Out</button>
            )}

            {(booking.status === 'confirmed' || booking.status === 'pending') && (
              <button onClick={() => onCancel(booking.id)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">Cancel Booking</button>
            )}
          </div>
        )}
      </td>
    </tr>
  );
};

export default BookingRow;