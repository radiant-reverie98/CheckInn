import React, { useState, useRef, useEffect } from "react";
import StatusBadge from "./StatusBadge";

const RoomsRow = ({ room, index, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Defensive guard
  if (!room) return null;

  // Determine the status string based on the is_active boolean
  const displayStatus = room.is_active ? "Available" : "Unavailable";

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      {/* S.No */}
      <td className="px-6 py-4 text-sm text-gray-600 font-medium">
        {index + 1}
      </td>

      {/* Type */}
      <td className="px-6 py-4 text-sm text-gray-600">
        {room.room_type}
      </td>

      {/* Price */}
      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
        ₹{room.price_per_night}
      </td>

      {/* Capacity */}
      <td className="px-6 py-4 text-sm text-gray-600">
        {room.max_guests} Guests
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        {/* Pass the calculated string to the StatusBadge */}
        <StatusBadge status={displayStatus} />
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right relative">
        <button
          onClick={toggleMenu}
          className="p-2 rounded-md hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>

        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute right-6 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-md z-50 py-1"
          >
            <button
              onClick={() => {
                onEdit(room);
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#003580]"
            >
              Edit
            </button>

            <button
              onClick={() => {
                onDelete(room.id);
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default RoomsRow;