import React from "react";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function Createhotel() {
  const [hotelData, setHotelData] = useState({
    hotel_name: "",
    hotel_type_id: "",
    short_tagline: "",
    long_description: "",
    state: "",
    city: "",
    street_address: "",
    google_maps_link: "",
    amenities: [],
    photos: [],
    coverIndex: 0,
  });
  return (
    <div>
      <h1></h1>
      <Outlet context={{ hotelData, setHotelData }} />
    </div>
  );
}

export default Createhotel;
