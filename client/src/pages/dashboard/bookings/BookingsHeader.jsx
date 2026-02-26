import React from 'react';

/**
 * BookingsHeader Component
 * @param {Function} onExport - Callback function triggered when "Export CSV" is clicked
 */
const BookingsHeader = ({ onExport }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 bg-transparent gap-4">
      {/* Left Section: Title & Subtitle */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Bookings
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage and track guest reservations
        </p>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center">
        <button
          onClick={onExport}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003580]"
        >
          <svg 
            className="w-4 h-4 mr-2 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
            />
          </svg>
          Export CSV
        </button>
      </div>
    </div>
  );
};

export default BookingsHeader;