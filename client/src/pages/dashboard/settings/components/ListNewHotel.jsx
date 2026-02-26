import React from 'react';
import { useNavigate } from 'react-router-dom';

const ListNewHotel = () => {
    const navigate = useNavigate();
  const handleAddNew = () => {

    navigate("/onboarding/create-hotel/welcome")
    
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <h2 className="text-lg font-semibold text-gray-900">List a New Property</h2>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">
            Ready to expand your portfolio? Add another hotel, resort, or boutique stay to your management dashboard and start accepting bookings.
          </p>
        </div>

        <div className="flex-shrink-0">
          <button
            onClick={handleAddNew}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#003580] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-all active:scale-95 shadow-sm shadow-blue-900/10"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            Add Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListNewHotel;