import React, { useState } from 'react'
import HotelGallery from './components/hotel-details/HotelGallery'
import HotelHeader from './components/hotel-details/HotelHeader'
import AvailableRooms from './components/hotel-details/AvailableRooms'
import DateAvailabilityFilter from './components/hotel-details/DateAvailabilityFilter'
import ROOMS_DATA from './components/hotel-details/DUMMY_ROOMS_DATA'
import HotelDescription from './components/hotel-details/HotelDescription'
import HotelAmenities from './components/hotel-details/HotelAmenities'
import GuestReviews from './components/hotel-details/GuestReviews'
import HotelLocation from './components/hotel-details/HotelLocation'
import { useParams } from 'react-router-dom'
import { HotelDetailsProvider } from './components/hotel-details/HotelDetailsContext'
function HotelDetails() {
  const [selectedRooms, setSelectedRooms] = useState({});
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
  const [isSearched, setIsSearched] = useState(false);
  
  const handleDateChange = (field, value) => {
    setDates(prev => ({ ...prev, [field]: value }));
    setIsSearched(false);
  };

  const handleSearch = () => {
    if (dates.checkIn && dates.checkOut) {
      setIsSearched(true);
    }
  };

  const handleUpdateQuantity = (id, newQty) => {
    setSelectedRooms(prev => {
      const updated = { ...prev, [id]: Math.max(0, newQty) };
      if (updated[id] === 0) {
        delete updated[id];
      }
      return updated;
    });
  };

  const totalSelectedRooms = Object.values(selectedRooms).reduce((a, b) => a + b, 0);
  const { id } = useParams();
  console.log(id)
  return (
    <HotelDetailsProvider id={id}>
    <div className="bg-[#FEFCF9] min-h-screen pb-20">
      <HotelGallery />
      
      <HotelHeader />
      <HotelDescription/>
      <HotelAmenities/>
      <DateAvailabilityFilter 
        checkIn={dates.checkIn} 
        checkOut={dates.checkOut} 
        onDateChange={handleDateChange}
        onSearch={handleSearch}
      />

      <div className="mt-8">
        {isSearched ? (
          <AvailableRooms 
            rooms={ROOMS_DATA} 
            selectedRooms={selectedRooms} 
            onUpdateQuantity={handleUpdateQuantity} 
          />
        ) : (
          <div className="max-w-7xl mx-auto px-6 py-20 text-center border-2 border-dashed border-orange-100 rounded-[3rem]">
            <p className="text-stone-400 font-serif italic text-xl">
              Please select your arrival and departure dates to see available sanctuaries.
            </p>
          </div>
        )}
      </div>

      {totalSelectedRooms > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 duration-500">
          <button className="bg-stone-900 text-white px-8 py-4 rounded-2xl font-bold shadow-2xl flex items-center gap-4 hover:bg-amber-600 transition-all active:scale-95">
            <span>Continue to Checkout</span>
            <span className="w-px h-4 bg-white/20"></span>
            <span>{totalSelectedRooms} {totalSelectedRooms === 1 ? 'Room' : 'Rooms'} Selected</span>
          </button>
        </div>
      )}
      <GuestReviews/>
      <HotelLocation/>
    </div>
    </HotelDetailsProvider>
  )
}

export default HotelDetails