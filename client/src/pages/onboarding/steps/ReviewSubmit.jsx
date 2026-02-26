import { useState } from "react";
import { useOutletContext, useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function ReviewSubmit() {
  const { hotelData } = useOutletContext();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();

      formData.append("hotel_name", hotelData.hotel_name);
      formData.append("hotel_type_id", hotelData.hotel_type_id);
      formData.append("short_tagline", hotelData.short_tagline || "");
      formData.append("long_description", hotelData.long_description || "");
      formData.append("state", hotelData.state);
      formData.append("city", hotelData.city);
      formData.append("street_address", hotelData.street_address);
      formData.append("google_maps_link", hotelData.google_maps_link || "");
      formData.append("amenities", JSON.stringify(hotelData.amenities || []));
      formData.append("coverIndex", hotelData.coverIndex);

      (hotelData.photos || []).forEach((file) => {
        formData.append("photos", file);
      });

      await axios.post(
        "http://localhost:5000/api/hotel-create",
        formData,
        { withCredentials: true }
      );

      navigate("/dashboard");
    } catch (error) {
      console.error("Submission failed", error.response?.data || error.message);
      
    }finally { setIsSubmitting(false) }
  };

  return (
    <div className="max-w-2xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Review & Confirm</h2>
        <p className="text-sm text-gray-500 mt-1">
          Please review your property details before publishing.
        </p>
      </div>

      <div className="space-y-6">
        {/* BASIC INFO */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Basic Information
            </h3>
            <Link
              to="/onboarding/create-hotel/basic"
              className="text-sm font-medium text-[#003580] hover:underline"
            >
              Edit
            </Link>
          </div>

          <div className="space-y-2">
            <p><strong>Name:</strong> {hotelData.hotel_name}</p>
            <p><strong>Type ID:</strong> {hotelData.hotel_type_id}</p>
            <p><strong>Tagline:</strong> {hotelData.short_tagline}</p>
            <p><strong>Description:</strong> {hotelData.long_description}</p>
          </div>
        </div>

        {/* LOCATION */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Location</h3>
            <Link
              to="/onboarding/create-hotel/location"
              className="text-sm font-medium text-[#003580] hover:underline"
            >
              Edit
            </Link>
          </div>

          <div className="space-y-2">
            <p><strong>State:</strong> {hotelData.state}</p>
            <p><strong>City:</strong> {hotelData.city}</p>
            <p><strong>Street:</strong> {hotelData.street_address}</p>
            {hotelData.google_maps_link && (
              <p>
                <strong>Maps:</strong>{" "}
                <a
                  href={hotelData.google_maps_link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  Open Map
                </a>
              </p>
            )}
          </div>
        </div>

        {/* AMENITIES */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Amenities</h3>
            <Link
              to="/onboarding/create-hotel/amenities"
              className="text-sm font-medium text-[#003580] hover:underline"
            >
              Edit
            </Link>
          </div>

          {hotelData.amenities?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {hotelData.amenities.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full text-xs bg-blue-50 text-[#003580]"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">
              No amenities selected.
            </p>
          )}
        </div>

        {/* PHOTOS */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Photos</h3>
            <Link
              to="/onboarding/create-hotel/photos"
              className="text-sm font-medium text-[#003580] hover:underline"
            >
              Edit
            </Link>
          </div>

          {hotelData.photos?.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {hotelData.photos.map((file, idx) => (
                <div
                  key={idx}
                  className="relative aspect-square rounded-md overflow-hidden border"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  {hotelData.coverIndex === idx && (
                    <div className="absolute bottom-0 left-0 right-0 bg-[#003580] text-white text-xs text-center py-1">
                      COVER
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">
              No photos uploaded.
            </p>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="pt-6 flex justify-between items-center border-t border-gray-100 mt-8">
          <Link
            to="/onboarding/create-hotel/photos"
            className="px-6 py-2 border border-gray-300 text-gray-600 text-sm rounded-lg"
          >
            ← Back
          </Link>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-3 bg-[#003580] text-white text-sm font-semibold rounded-lg disabled:opacity-70"
          >
            {isSubmitting ? "Creating Hotel..." : "Create Hotel"}
          </button>
        </div>
      </div>
    </div>
  );
}