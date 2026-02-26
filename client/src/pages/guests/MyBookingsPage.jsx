import React, { useState } from 'react';
import MyBookingsHeader from './components/my-bookings/MyBookingsHeader';
import BookingCard from './components/my-bookings/BookingCard';
import CancelBookingModal from './components/my-bookings/CancelBookingModal';
import initialBookings from './components/my-bookings/myBookingData';

const MyBookingsPage = () => {
  // 1. Manage the bookings in state so we can remove them on cancellation
  const [bookings, setBookings] = useState(initialBookings);
  
  // 2. State for Modal visibility and tracking which booking is being targeted
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeBooking, setActiveBooking] = useState(null);

  const handleOpenCancelModal = (booking) => {
    setActiveBooking(booking);
    setIsModalOpen(true);
  };

  const handleConfirmCancellation = () => {
    // 3. Filter out the cancelled booking from the list
    const updatedList = bookings.filter(b => b.id !== activeBooking.id);
    
    // Close modal and update state
    setIsModalOpen(false);
    
    // Optional: Add a small delay for the modal close animation before removing the card
    setTimeout(() => {
      setBookings(updatedList);
      setActiveBooking(null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-white">
      <MyBookingsHeader />
      
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <BookingCard 
              key={booking.id} 
              booking={booking} 
              // 4. Pass the click handler to the card
              onCancelClick={() => handleOpenCancelModal(booking)}
            />
          ))
        ) : (
          /* Empty State */
          <div className="py-24 text-center bg-slate-50 rounded-[3rem] border border-dashed border-blue-100 mx-auto">
            <p className="text-slate-400 font-serif italic text-lg">No active sanctuaries found in your history.</p>
          </div>
        )}
      </main>

      {/* 5. The Cancellation Modal */}
      <CancelBookingModal 
        isOpen={isModalOpen}
        booking={activeBooking}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmCancellation}
      />
    </div>
  );
};

export default MyBookingsPage;