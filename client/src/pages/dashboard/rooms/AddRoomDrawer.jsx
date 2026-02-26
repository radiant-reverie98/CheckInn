import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddRoomDrawer = ({ isOpen, onClose, onSuccess, initialData }) => {
  const [roomTypesList, setRoomTypesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    room_type_id: '',
    price_per_night: '',
    max_guests: '',
    total_rooms: '',
    active_status: true,
    primaryIndex: 0 // Track which image is the main one
  });

  const [images, setImages] = useState([]);
  const params = useParams();
  const hotelId = params.id;
  // Fetch Room Types
  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/fetch_room_type`);
        if (res.data.success) {
          setRoomTypesList(res.data.room_types);
          if (!initialData && res.data.room_types.length > 0) {
            setFormData(prev => ({ ...prev, room_type_id: res.data.room_types[0].id }));
          }
        }
      } catch (err) {
        console.error("Failed to fetch room types:", err);
      }
    };
    if (isOpen) fetchRoomTypes();
  }, [isOpen, initialData]);

  // Sync Form Data
  useEffect(() => {
    if (initialData) {
      setFormData({
        room_type_id: initialData.room_type_id || '',
        price_per_night: initialData.price_per_night || '',
        max_guests: initialData.max_guests || '',
        total_rooms: initialData.total_rooms || '',
        active_status: initialData.is_active ?? true,
        primaryIndex: 0
      });
      setImages(initialData.images || []);
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    if (formData.primaryIndex === indexToRemove) {
      setFormData(prev => ({ ...prev, primaryIndex: 0 }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      
      // Append text fields
      data.append('hotelId', hotelId);
      data.append('room_type_id', formData.room_type_id);
      data.append('price_per_night', formData.price_per_night);
      data.append('max_guests', formData.max_guests);
      data.append('total_rooms', formData.total_rooms);
      data.append('primaryIndex', formData.primaryIndex);

      // Append Files
      images.forEach((img) => {
        if (img.file) {
          data.append('photos', img.file);
        }
      });

       

      const response = await axios.post(
        'http://localhost:5000/api/users/rooms/create-room',
        data,
        {
          withCredentials: true
        }
      );

      if (response.data.success) {
        alert("Room listed successfully!");
        // onSuccess(); 
        onClose();
      }
    } catch (err) {
      console.error("Upload Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const inputClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#003580]/20 focus:border-[#003580] outline-none transition-all";
  const labelClasses = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/40 transition-opacity" onClick={onClose} />

      <div className={`relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 translate-x-0`}>
        <div className="p-6 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{initialData ? 'Edit Room' : 'Add Room'}</h2>
            <p className="text-sm text-gray-500 mt-1">Configure pricing and inventory for Hotel ID: {hotelId}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form id="roomForm" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#003580]">Inventory Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className={labelClasses}>Room Type</label>
                <select name="room_type_id" value={formData.room_type_id} onChange={handleChange} className={`${inputClasses} bg-white`} required>
                  <option value="" disabled>Select a room type</option>
                  {roomTypesList.map((type) => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClasses}>Price Per Night (₹)</label>
                <input type="number" name="price_per_night" value={formData.price_per_night} onChange={handleChange} className={inputClasses} required min="0" />
              </div>

              <div>
                <label className={labelClasses}>Max Guests</label>
                <input type="number" name="max_guests" value={formData.max_guests} onChange={handleChange} className={inputClasses} required min="1" />
              </div>

              <div>
                <label className={labelClasses}>Total Rooms</label>
                <input type="number" name="total_rooms" value={formData.total_rooms} onChange={handleChange} className={inputClasses} required min="1" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#003580]">Gallery</h3>
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#003580] transition-colors bg-gray-50/50">
              <input type="file" multiple accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="text-center">
                <p className="text-sm text-gray-600 font-medium">Click or drag to upload photos</p>
              </div>
            </div>

            {images.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {images.map((img, index) => (
                  <div key={index} className={`relative w-24 h-24 group rounded-md border-2 ${formData.primaryIndex === index ? 'border-[#003580]' : 'border-transparent'}`}>
                    <img src={img.preview || img} alt="Preview" className="w-full h-full object-cover rounded-sm" />
                    
                    {/* Primary Badge */}
                    {formData.primaryIndex === index && (
                        <span className="absolute top-0 left-0 bg-[#003580] text-white text-[10px] px-1 rounded-br-md">Primary</span>
                    )}

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1">
                        <button type="button" onClick={() => removeImage(index)} className="self-end bg-white text-red-500 rounded-full p-0.5">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" /></svg>
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setFormData(p => ({...p, primaryIndex: index}))}
                            className="bg-white text-[#003580] text-[10px] font-bold py-0.5 rounded"
                        >
                            Set Primary
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>

        <div className="p-6 border-t border-gray-100 flex items-center gap-3">
          <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border rounded-md text-sm font-semibold">Cancel</button>
          <button 
            type="submit" 
            form="roomForm"
            disabled={loading || images.length === 0}
            className={`flex-1 px-4 py-2.5 bg-[#003580] text-white rounded-md text-sm font-semibold ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Uploading...' : (initialData ? 'Update Room' : 'Add Room')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomDrawer;