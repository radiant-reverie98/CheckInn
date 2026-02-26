import React from 'react';

/**
 * StatusBadge Component
 * @param {string} status - Available or Unavailable
 */
const StatusBadge = ({ status }) => {
  // Define styles strictly for Available and Unavailable
  const statusConfig = {
    Available: {
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200",
      dot: "bg-green-500",
    },
    Unavailable: {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      dot: "bg-red-500",
    }
  };

  // Select config; defaults to Unavailable if status doesn't match
  const config = statusConfig[status] || statusConfig.Unavailable;

  return (
    <span className={`
      inline-flex items-center gap-1.5 px-2.5 py-0.5 
      rounded-full text-xs font-bold border 
      ${config.bg} ${config.text} ${config.border}
      transition-colors duration-200
    `}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status || "Unavailable"}
    </span>
  );
};

export default StatusBadge;