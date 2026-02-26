import React from 'react';

/**
 * RoomsHeader Component
 * @param {Function} onAddRoom - Callback function triggered when "+ Add Room" is clicked
 */
const RoomsHeader = ({ onAddRoom }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 px-1 bg-white">
      {/* Left Section: Title & Subtitle */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Rooms
        </h1>
        <p className="text-sm text-gray-500 font-medium">
          Manage your property inventory
        </p>
      </div>

      {/* Right Section: Action Button */}
      <button
        onClick={onAddRoom}
        className="mt-4 sm:mt-0 inline-flex items-center px-5 py-2.5 bg-[#003580] text-white text-sm font-semibold rounded-md shadow-sm hover:bg-[#002a66] active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003580]"
      >
        <span className="mr-1.5">+</span> Add Room
      </button>
    </div>
  );
};

export default RoomsHeader;