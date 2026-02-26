import React, { useState, useMemo } from "react";
import BookingsHeader from "./BookingsHeader";
import BookingsFilter from "./BookingsFilter";
import BookingsTable from "./BookingsTable";
import ChatDrawer from "./ChatDrawer"; // ✅ Import drawer

function BookingsPage() {
  const initialBookings = [
    {
      id: 1,
      booking_id: "BK-1024",
      guest_name: "Arjun Mehta",
      room_number: "204",
      check_in: "2026-02-20",
      check_out: "2026-02-22",
      status: "confirmed"
    },
    {
      id: 2,
      booking_id: "BK-1025",
      guest_name: "Priya Sharma",
      room_number: "305",
      check_in: "2026-02-16",
      check_out: "2026-02-18",
      status: "checked-in"
    },
    {
      id: 3,
      booking_id: "BK-1026",
      guest_name: "Daniel Lee",
      room_number: "101",
      check_in: "2026-02-10",
      check_out: "2026-02-12",
      status: "completed"
    },
    {
      id: 4,
      booking_id: "BK-1027",
      guest_name: "Sneha Patel",
      room_number: "402",
      check_in: "2026-02-25",
      check_out: "2026-02-28",
      status: "confirmed"
    },
    {
      id: 5,
      booking_id: "BK-1028",
      guest_name: "John Smith",
      room_number: "203",
      check_in: "2026-02-15",
      check_out: "2026-02-17",
      status: "cancelled"
    }
  ];

  const [bookings, setBookings] = useState(initialBookings);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    date: ""
  });

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleExport = () => {
    console.log("Export CSV clicked");
  };

  

  const handleCheckIn = (id) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: "checked-in" } : b
      )
    );
  };

  const handleCheckOut = (id) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: "completed" } : b
      )
    );
  };

  const handleCancel = (id) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: "cancelled" } : b
      )
    );
  };

  

  const handleChat = (booking) => {
    setSelectedBooking(booking);
    setIsChatOpen(true);
  };

  
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch =
        booking.guest_name
          .toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        booking.booking_id
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      const matchesStatus =
        !filters.status || booking.status === filters.status;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, filters]);

  return (
    <div className="space-y-6">
      <BookingsHeader onExport={handleExport} />

      <BookingsFilter
        filters={filters}
        onFilterChange={setFilters}
        onClear={() =>
          setFilters({ search: "", status: "", date: "" })
        }
      />

      <BookingsTable
        bookings={filteredBookings}
        onCheckIn={handleCheckIn}
        onCheckOut={handleCheckOut}
        onCancel={handleCancel}
        onView={(id) => console.log("View booking", id)}
        onChat={handleChat} 
      />

      
      <ChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        booking={selectedBooking}
      />
    </div>
  );
}

export default BookingsPage;
