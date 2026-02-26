import React from 'react';

/**
 * StatusBadge Component
 * @param {string} status - Available, Occupied, Cleaning, Maintenance, etc.
 */
const StatusBadge = ({ status }) => {
  // Define styles for each status
  const statusConfig = {
    completed: {
      title : "Completed",
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200",
      dot: "bg-green-500",
    },
    confirmed: {
      title : "Confirmed",
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      dot: "bg-blue-500",
    },
    checkedIn: {
      title : "checked-in",
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      border: "border-yellow-200",
      dot: "bg-yellow-500",
    },
    cancelled: {
      title : "cancelled",
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      dot: "bg-red-500",
    },
    // Fallback/Default style
    Default: {
      title : "Status not updated",
      bg: "bg-gray-50",
      text: "text-gray-600",
      border: "border-gray-200",
      dot: "bg-gray-400",
    }
  };

  // Select the appropriate config or use Default
  const config = statusConfig[status] || statusConfig.Default;

  return (
    <span className={`
      inline-flex items-center gap-1.5 px-2.5 py-0.5 
      rounded-full text-xs font-bold border 
      ${config.bg} ${config.text} ${config.border}
      transition-colors duration-200
    `}>
      {/* Subtle status dot */}
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.title}
    </span>
  );
};

export default StatusBadge;