import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AmenitiesInfo() {
  const { hotelData, setHotelData } = useOutletContext();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [amenitiesType, setAmenitiesType] = useState([]);

  // Animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fetch amenities from backend
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/hotel-amenities"
        );

        if (res.data.success) {
          setAmenitiesType(res.data.data);
        }
      } catch (err) {
        console.error("ERROR fetching amenities:", err);
      }
    };

    fetchAmenities();
  }, []);

  // Toggle Amenity (store only ID)
  const toggleAmenity = (amenityId) => {
    setHotelData((prev) => {
      const currentAmenities = prev.amenities || [];
      const isSelected = currentAmenities.includes(amenityId);

      let newAmenities;

      if (isSelected) {
        newAmenities = currentAmenities.filter(
          (id) => id !== amenityId
        );
      } else {
        newAmenities = [...currentAmenities, amenityId];
      }

      // Clear validation error if at least one selected
      if (newAmenities.length > 0) {
        setError("");
      }

      return { ...prev, amenities: newAmenities };
    });
  };

  const handleNext = (e) => {
    e.preventDefault();

    if (!hotelData.amenities || hotelData.amenities.length === 0) {
      setError("Please select at least one amenity to proceed.");
      return;
    }
    // console.log(hotelData)
    navigate("/onboarding/create-hotel/photos");
  };

  const handleBack = () => {
    navigate("/onboarding/create-hotel/location");
  };

  return (
    <div
      className={`max-w-2xl mx-auto transition-all duration-700 ease-out transform ${
        isVisible
          ? "opacity-100 translate-y-0 blur-0"
          : "opacity-0 translate-y-8 blur-sm"
      }`}
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Property Amenities
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Select all the facilities available at your property.
          </p>
        </div>

        <form onSubmit={handleNext}>
          {/* Amenities Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {amenitiesType.map((amenity) => {
              const isSelected = hotelData.amenities?.includes(
                amenity.id
              );

              return (
                <div
                  key={amenity.id}
                  onClick={() => toggleAmenity(amenity.id)}
                  className={`cursor-pointer relative flex items-center p-4 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? "border-[#003580] bg-blue-50/50 shadow-sm ring-1 ring-[#003580]"
                      : "border-gray-200 hover:border-gray-300 hover:bg-white/60 bg-white/40"
                  }`}
                >
                  {/* Custom Checkbox UI */}
                  <div
                    className={`flex-shrink-0 h-5 w-5 rounded border mr-3 flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-[#003580] border-[#003580]"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="h-3.5 w-3.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>

                  <span
                    className={`text-sm font-medium ${
                      isSelected
                        ? "text-[#003580]"
                        : "text-gray-700"
                    }`}
                  >
                    {amenity.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Validation Error */}
          {error && (
            <div className="mb-6 p-3 bg-red-50/80 border border-red-100 rounded-lg flex items-center gap-2 backdrop-blur-sm">
              <svg
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-red-600 font-medium">
                {error}
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="pt-6 flex justify-between items-center border-t border-gray-200/60 mt-8">
            <button
              type="button"
              onClick={handleBack}
              className="text-gray-600 font-medium text-sm hover:text-[#003580] transition-colors"
            >
              ← Back
            </button>

            <button
              type="submit"
              className="px-8 py-3 bg-[#003580] text-white text-sm font-semibold rounded-lg hover:bg-blue-800 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 focus:ring-4 focus:ring-blue-200"
            >
              Next: Photos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
