import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHotel } from "../../../../context/HotelContext"; 
import locationData from '../../../../data/location.json';
import axios from 'axios';

const HotelSection = () => {
  
  const {selectedHotelId } = useHotel(); // Context selection
  const id = selectedHotelId
  const [loading, setLoading] = useState(false);
  
  const [hotelInfo, setHotelInfo] = useState({
    name: '',
    street_address: '',
    city: '',
    state: '',
    description: ''
  });

  const [availableCities, setAvailableCities] = useState([]);
  
  useEffect(() => {
    const fetchHotel = async () => {
      if (!id) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/users/settings/hotelInfo/${id}`, { withCredentials: true });
        // console.log(id)
        // console.log(res.data.hotelResult[0])
        if (res.data.success && res.data.recordAvailable) {
          const hotel = res.data.hotelResult[0];
          setHotelInfo({
            // Ensure keys match your backend column names
            name: hotel.hotel_name || hotel.name || '', 
            street_address: hotel.street_address || '',
            city: hotel.city || '',
            state: hotel.state || '',
            description: hotel.long_description || hotel.description || ''
          });
        }
      } catch (err) {
        console.error("Fetch error:", err.message);
      }
    };
    fetchHotel();
    
  }, [id])
  

  
  useEffect(() => {
    if (hotelInfo.state && locationData[hotelInfo.state]) {
      setAvailableCities(locationData[hotelInfo.state]);
    } else {
      setAvailableCities([]);
    }
  }, [hotelInfo.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelInfo(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'state') updated.city = ''; 
      return updated;
    });
  };

  const handleSave = async(e)=>{
    e.preventDefault();
    try{
      setLoading(true)
      const res = await axios.put(`http://localhost:5000/api/users/settings/hotelUpdate/${id}`,{hotel_name:hotelInfo.name,street_address:hotelInfo.street_address,state:hotelInfo.state,city:hotelInfo.city,long_description:hotelInfo.description},{withCredentials: true})
      if(res.data.success){
        alert("Information updated successfully")
      }
    }catch(err){
      console.log(err)
    }finally{setLoading(false)}
  }

  const inputClasses = "w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#003580] focus:border-transparent outline-none transition-all bg-white disabled:bg-gray-50";
  const labelClasses = "block text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-2";

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="mb-6 border-b border-gray-50 pb-4">
        <h2 className="text-lg font-semibold text-gray-900">Property Information</h2>
        <p className="text-sm text-gray-500">Update the public location and description shown to your guests.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className={labelClasses}>Hotel Name</label>
          <input
            type="text"
            name="name"
            value={hotelInfo.name}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label className={labelClasses}>Street Address</label>
          <input
            type="text"
            name="street_address"
            value={hotelInfo.street_address}
            onChange={handleChange}
            className={inputClasses}
            placeholder="e.g. 123 Heritage Lane"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>State</label>
            <select
              name="state"
              value={hotelInfo.state}
              onChange={handleChange}
              className={inputClasses}
              required
            >
              <option value="">Select State</option>
              {Object.keys(locationData).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClasses}>City</label>
            <select
              name="city"
              value={hotelInfo.city}
              onChange={handleChange}
              disabled={!hotelInfo.state}
              className={inputClasses}
              required
            >
              <option value="">{hotelInfo.state ? "Select City" : "Select state first"}</option>
              {availableCities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClasses}>Public Description</label>
          <textarea
            name="description"
            rows="5"
            value={hotelInfo.description}
            onChange={handleChange}
            className={`${inputClasses} resize-none py-3 leading-relaxed`}
            placeholder="Describe your property..."
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#003580] text-white px-8 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#002560] transition-all disabled:opacity-50 active:scale-95"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelSection;