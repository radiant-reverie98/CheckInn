import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const HotelContext = createContext();

export function HotelProvider({ children }) {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshHotels = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users/fetchHotels",
        { withCredentials: true }
      );

      if (res.data.success) {
        const fetchedHotels = res.data.hotels || [];
        setHotels(fetchedHotels);

        if (fetchedHotels.length > 0) {
          setSelectedHotel(fetchedHotels[0]);
          setSelectedHotelId(fetchedHotels[0].id);
        } else {
          setSelectedHotel(null);
          setSelectedHotelId(null);
        }
      }
    } catch (err) {
      console.log(err);
      setHotels([]);
      setSelectedHotel(null);
      setSelectedHotelId(null);
    } finally {
      setLoading(false);
    }
  };

  const resetHotels = () => {
    setHotels([]);
    setSelectedHotel(null);
    setSelectedHotelId(null);
    setLoading(false);
  };

  useEffect(() => {
    refreshHotels();
  }, []);

  return (
    <HotelContext.Provider
      value={{
        hotels,
        selectedHotel,
        setSelectedHotel,
        selectedHotelId,
        setSelectedHotelId,
        loading,
        refreshHotels,
        resetHotels,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export const useHotel = () => useContext(HotelContext);