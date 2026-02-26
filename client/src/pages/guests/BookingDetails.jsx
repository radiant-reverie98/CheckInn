import React from 'react'
import BookingDetailsHeader from './components/booking-details/BookingDetailsHeader'
import BookingStatusBanner from './components/booking-details/BookingStatusBanner'
import HotelOverviewCard from './components/booking-details/HotelOverviewCard'
import StayDetailsCard from './components/booking-details/StayDetails'
import RoomBreakdownCard from './components/booking-details/RoomBreakdownCard'
import PaymentDetailsCard from './components/booking-details/PaymentDetailsCard'

function BookingDetails() {
  return (
    <div>
      <BookingDetailsHeader/>
      <BookingStatusBanner/>
      <HotelOverviewCard/>
      <StayDetailsCard/>
      <RoomBreakdownCard/>
      <PaymentDetailsCard/>
    </div>
  )
}

export default BookingDetails
