// import React, { createContext, useContext, useState } from "react"
// // import DUMMY_BOOKINGS from "../pages/guests/components/dummy_data";
// const GuestContext = createContext();

// export const useGuest = () =>{
//     return useContext(GuestContext)
// }

// export const GuestProvider = ({children}) => {
//     const [bookings,setBookings] = useState(DUMMY_BOOKINGS);

//     const generateBookingId = () => {
//         const random = Math.floor(1000 + Math.random()*9000)
//         return `BK-${Date.now()}-${random}`;
//     }

//     // Create booking
//     const addBooking = (bookingData) => {
//         const newBooking = {
//             id : generateBookingId(),
//             ...bookingData,
//             status : "confirmed",
//             createdAt : new Date().toISOString(),
//         }

//         setBookings((prev) => [...prev,newBooking]);
//     }


//     // Cancel Booking

//     const cancelBooking = (bookingId) => {
//     setBookings((prev) =>
//       prev.map((booking) =>
//         booking.id === bookingId
//           ? { ...booking, status: "cancelled" }
//           : booking
//       )
//     );
//   };

//   const value = {
//     bookings,
//     setBookings,
//     addBooking,
//     cancelBooking
//   }

//   return (
//     <GuestContext.Provider value={value}>
//         {children}
//     </GuestContext.Provider>
//   )
// }