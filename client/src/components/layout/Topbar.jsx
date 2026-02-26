import { useLocation, useNavigate } from "react-router-dom";
import { useHotel } from "../../context/HotelContext";

export default function Topbar() {
  const { hotels, selectedHotel, setSelectedHotel,selectedHotelId,setSelectedHotelId } = useHotel();
  const id = selectedHotelId
  const location = useLocation();
  const navigate = useNavigate();
  const handleSwitchHotel = (e) => {
    const hotelId = e.target.value;
    const hotel = hotels.find((h) => String(h.id) === String(hotelId));
    if (hotel) {
      setSelectedHotel(hotel);
      setSelectedHotelId(hotel.id)
      const segments = location.pathname.split("/");
      segments[segments.length-1] = hotel.id;
      navigate(segments.join("/"))
      
    }
  };

  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex flex-col justify-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Property
        </span>
        <h2 className="text-lg font-bold text-gray-900 leading-tight truncate max-w-md">
          {selectedHotel?.hotel_name || "Loading..."}
        </h2>
      </div>

      <div className="flex items-center">
        <div className="relative group">
          <select
            value={selectedHotel?.id || ""}
            onChange={handleSwitchHotel}
            disabled={hotels.length <= 1}
            className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg py-2 pl-4 pr-10 hover:bg-gray-100 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-[#003580]/5 focus:border-[#003580] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed min-w-[180px]"
          >
            {hotels.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.hotel_name}
              </option>
            ))}
          </select>
          
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
            <svg 
              className="h-4 w-4" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}