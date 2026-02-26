const dummyBookings = [
  {
    id: "BK-9921",
    hotelName: "Azure Bay Sanctuary",
    location: "Maldives, Indian Ocean",
    thumbnail: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=200&q=80",
    checkIn: "Mar 12, 2026",
    checkOut: "Mar 15, 2026",
    nights: 3,
    guests: 2,
    rooms: [
      { name: "Deluxe Ocean Suite", qty: 2 }
    ],
    total: 42500,
    paymentStatus: "Paid",
    bookingStatus: "Upcoming"
  },
  {
    id: "BK-8842",
    hotelName: "Coral Reef Retreat",
    location: "Seychelles",
    thumbnail: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=200&q=80",
    checkIn: "Feb 05, 2026",
    checkOut: "Feb 10, 2026",
    nights: 5,
    guests: 1,
    rooms: [
      { name: "Elite Horizon Villa", qty: 1 }
    ],
    total: 89000,
    paymentStatus: "Paid",
    bookingStatus: "Completed"
  },
  {
    id: "BK-7710",
    hotelName: "Mist Cliff Resort",
    location: "Bali, Indonesia",
    thumbnail: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=200&q=80",
    checkIn: "Jan 20, 2026",
    checkOut: "Jan 22, 2026",
    nights: 2,
    guests: 4,
    rooms: [
      { name: "Family Lagoon Suite", qty: 1 },
      { name: "Standard Mist Room", qty: 1 }
    ],
    total: 24200,
    paymentStatus: "Refunded",
    bookingStatus: "Cancelled"
  }
];

export default dummyBookings