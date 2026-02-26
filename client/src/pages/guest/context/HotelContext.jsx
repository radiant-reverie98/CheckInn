import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import axios from "axios";
const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const {setLoading} = useAuth();
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1)
  const [checkIn, setCheckIn] = useState(formatDate(today));
  const [checkOut,setCheckOut] = useState(formatDate(tomorrow));
  const [hotels,setHotels] = useState([])

  const fetchHotel = async()=>{
    try{
        setLoading(true)
        const res = await axios.get(`http://localhost:5000/api/getTopHotels?checkIn=${checkIn}&checkOut=${checkOut}`)
        if(res.data.success){
            setHotels(res.data.hotels)
        }
    }catch(err){
        console.log(err)
    }finally{setLoading(false)}
  }

  useEffect(()=>{
    fetchHotel();
  },[checkIn,checkOut])

  const value = {hotels,setHotels,checkIn,checkOut,setCheckIn,setCheckOut}
  return(
    <HotelContext.Provider value={value}>
        {children}
    </HotelContext.Provider>
  )
};

export const useHotel = () => {return useContext(HotelContext)}