import React from 'react';

/**
 * RoomsFilters Component
 * @param {Object} filters - Current filter values { search, status, type }
 * @param {Function} onFilterChange - Callback when a filter value changes
 * @param {Function} onClear - Callback to reset all filters
 */
const RoomsFilters = ({ filters, onFilterChange, onClear }) => {
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Left Side: Inputs and Dropdowns */}
        <div className="flex flex-col sm:flex-row flex-1 items-start sm:items-center gap-3">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg 
                className="h-4 w-4 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleInputChange}
              placeholder="Search by room name or number"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#003580] focus:border-[#003580] transition-all"
            />
          </div>

          {/* Status Dropdown */}
          <select
            name="status"
            value={filters.status}
            onChange={handleInputChange}
            className="block w-full sm:w-auto px-3 py-2 border border-gray-300 bg-white rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#003580] focus:border-[#003580] cursor-pointer transition-all"
          >
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="cleaning">Cleaning</option>
            <option value="maintenance">Maintenance</option>
          </select>

          {/* Room Type Dropdown */}
          <select
            name="type"
            value={filters.type}
            onChange={handleInputChange}
            className="block w-full sm:w-auto px-3 py-2 border border-gray-300 bg-white rounded-md text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#003580] focus:border-[#003580] cursor-pointer transition-all"
          >
            <option value="">All Types</option>
            <option value="deluxe">Deluxe</option>
            <option value="suite">Suite</option>
            <option value="standard">Standard</option>
          </select>
        </div>

        {/* Right Side: Clear Action */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={onClear}
            className="text-sm text-gray-500 hover:text-gray-800 hover:underline transition-colors duration-200"
          >
            Clear Filters
          </button>
        </div>

      </div>
    </div>
  );
};

export default RoomsFilters;