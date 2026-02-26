export default function RecentBookingsTable({ bookings }) {
  const statusStyles = {
    Confirmed: "bg-green-50 text-green-600",
    Pending: "bg-yellow-50 text-yellow-600",
    Cancelled: "bg-red-50 text-red-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-4">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Booking ID</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Guest Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Room</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Stay Dates</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Amount</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings && bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{booking.guest}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{booking.room}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {booking.checkin} — {booking.checkout}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        statusStyles[booking.status] || "bg-gray-50 text-gray-600"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{booking.amount}</td>
                  <td className="px-6 py-4 text-sm space-x-4">
                    <button className="text-blue-600 font-medium hover:underline">View</button>
                    <button className="text-gray-600 font-medium hover:underline">Chat</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-gray-500 text-sm">
                  No recent bookings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}