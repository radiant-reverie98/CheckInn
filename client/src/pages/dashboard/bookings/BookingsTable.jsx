import React from "react";
import BookingsRow from "./BookingsRow";

const BookingsTable = ({
  bookings = [],
  onView,
  onCheckIn,
  onCheckOut,
  onCancel,
  onChat
}) => {
  if (!bookings.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
        <p className="text-gray-500 font-medium">
          No bookings found matching your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Booking ID
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Guest
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Room
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Check-in
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Check-out
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Amount
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                Chat
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {bookings.map((booking) => (
              <BookingsRow
                key={booking.id}
                booking={booking}
                onView={onView}
                onCheckIn={onCheckIn}
                onCheckOut={onCheckOut}
                onCancel={onCancel}
                onChat={onChat}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsTable;