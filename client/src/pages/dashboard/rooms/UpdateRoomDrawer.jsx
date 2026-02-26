import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateRoomDrawer = ({ isOpen, onClose, onSuccess, roomId }) => {
  const { id: hotelId } = useParams();
  const [loading, setLoading] = useState(false);
  const [bookedRooms, setBookedRooms] = useState(0);
  const [roomTypeName, setRoomTypeName] = useState("");
  
  const [formData, setFormData] = useState({
    total_rooms: '',
    is_active: true,
    price_per_night: '',
    max_guests: '',
    primaryIndex: 0
  });

  const [images, setImages] = useState([]);

  // Fetch Room Data
  useEffect(() => {
    const fetchRoomDetails = async () => {
      if (!roomId) return;
      try {
        const res = await axios.get(`http://localhost:5000/api/users/rooms/fetchRoom/${roomId}`, { withCredentials: true });
        if (res.data.success) {
          const { roomInfo, roomType, roomImg, booked_count } = res.data;
          
          setBookedRooms(Number(booked_count) || 0);
          setRoomTypeName(roomType.name);

          setFormData({
            total_rooms: roomInfo.total_rooms,
            is_active: roomInfo.is_active === 1 || roomInfo.is_active === true,
            price_per_night: roomInfo.price_per_night,
            max_guests: roomInfo.max_guests,
            primaryIndex: roomImg.findIndex((img) => img.is_primary === 1) || 0
          });
          
          // Map existing images to a preview format
          setImages(roomImg.map(img => ({ preview: img.photo_url, isExisting: true })));
        }
      } catch (err) {
        console.error("Error fetching room details:", err);
      }
    };
    if (isOpen && roomId) fetchRoomDetails();
  }, [isOpen, roomId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const finalValue = name === "is_active" ? value === "true" : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      isNew: true 
    }));
    // Note: Your controller replaces ALL images if new files are sent
    setImages(newImages); 
    setFormData(prev => ({ ...prev, primaryIndex: 0 }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      // Match backend controller variable names
      data.append('roomId', roomId);
      data.append('total_rooms', formData.total_rooms);
      data.append('is_active', formData.is_active);
      data.append('price_per_night', formData.price_per_night);
      data.append('max_guests', formData.max_guests);
      data.append('primaryIndex', formData.primaryIndex);

      // Only append photos if new files were selected
      images.forEach((img) => {
        if (img.isNew && img.file) {
          data.append('photos', img.file);
        }
      });

      const response = await axios.put(
        `http://localhost:5000/api/users/rooms/update-room`, 
        data,
        { withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.data.success) {
        alert("Room updated successfully!");
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Room update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const inputClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003580]/20 outline-none transition-all";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col">
        
        <div className="p-6 border-b flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Update Room</h2>
            <p className="text-sm text-gray-500">Type: {roomTypeName}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" /></svg>
          </button>
        </div>

        <form id="updateRoomForm" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {bookedRooms > 0 && (
            <div className="bg-amber-50 border-l-4 border-amber-400 p-3 text-xs text-amber-800">
              <strong>Notice:</strong> This room has {bookedRooms} active bookings. Status and inventory reduction are restricted.
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className={labelClasses}>Price Per Night (₹)</label>
              <input type="number" name="price_per_night" value={formData.price_per_night} onChange={handleChange} className={inputClasses} required />
            </div>

            <div>
              <label className={labelClasses}>Max Guests</label>
              <input type="number" name="max_guests" value={formData.max_guests} onChange={handleChange} className={inputClasses} required />
            </div>

            <div>
              <label className={labelClasses}>Total Rooms</label>
              <input 
                type="number" 
                name="total_rooms" 
                value={formData.total_rooms} 
                onChange={handleChange} 
                className={inputClasses} 
                required 
                min={bookedRooms} 
              />
            </div>

            <div className="col-span-2">
              <label className={labelClasses}>Availability Status</label>
              <select 
                name="is_active" 
                value={formData.is_active.toString()} 
                onChange={handleChange} 
                className={`${inputClasses} ${bookedRooms > 0 ? 'bg-gray-100' : ''}`}
                disabled={bookedRooms > 0}
              >
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
              {bookedRooms > 0 && <p className="text-[10px] text-red-500 mt-1">Cannot deactivate while bookings exist.</p>}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">Room Gallery</h3>
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#003580] transition-colors">
              <input type="file" multiple accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <p className="text-xs text-gray-500">Upload new photos to replace current gallery</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {images.map((img, index) => (
                <div key={index} className={`relative w-20 h-20 rounded border-2 ${formData.primaryIndex === index ? 'border-[#003580]' : 'border-transparent'}`}>
                  <img src={img.preview} alt="Room" className="w-full h-full object-cover rounded-sm" />
                  <button 
                    type="button" 
                    onClick={() => setFormData(p => ({...p, primaryIndex: index}))}
                    className="absolute bottom-0 left-0 right-0 bg-white/90 text-[8px] font-bold py-1 text-[#003580]"
                  >
                    {formData.primaryIndex === index ? 'PRIMARY' : 'SET PRIMARY'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </form>

        <div className="p-6 border-t flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 py-2 border rounded-md font-semibold text-sm">Cancel</button>
          <button 
            type="submit" 
            form="updateRoomForm" 
            disabled={loading} 
            className="flex-1 py-2 bg-[#003580] text-white rounded-md font-semibold text-sm disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoomDrawer;