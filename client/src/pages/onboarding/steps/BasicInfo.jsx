import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BasicInfo() {
  const { hotelData, setHotelData } = useOutletContext();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [hotelTypes, setHotelTypes] = useState([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/hotel-types`);
        if (res.data.success) setHotelTypes(res.data.data);
      } catch (err) {
        console.error(`Failed to fetch property type: ${err}`);
      }
    };
    fetchTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setHotelData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!hotelData.hotel_name?.trim()) {
      newErrors.hotel_name = "Hotel Name is required";
    }

    if (!hotelData.hotel_type_id) {
      newErrors.hotel_type_id = "Please select a property type";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
            Basic Information
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Tell us a bit about your property so we can set up your listing.
          </p>
        </div>

        <form onSubmit={handleNext} className="space-y-6">
          <div>
            <label
              htmlFor="hotel_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Property Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="hotel_name"
              name="hotel_name"
              value={hotelData.hotel_name || ""}
              onChange={handleChange}
              placeholder="e.g. Seaside Paradise Resort"
              className={`w-full rounded-lg border ${
                errors.hotel_name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-[#003580] focus:border-[#003580]"
              } px-4 py-2.5 shadow-sm outline-none focus:ring-2 transition-all bg-white/50 focus:bg-white`}
            />
            {errors.hotel_name && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {errors.hotel_name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="hotel_type_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Property Type <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="hotel_type_id"
                name="hotel_type_id"
                value={hotelData.hotel_type_id || ""}
                onChange={handleChange}
                className={`w-full appearance-none rounded-lg border ${
                  errors.hotel_type_id
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#003580] focus:border-[#003580]"
                } bg-white/50 focus:bg-white px-4 py-2.5 shadow-sm outline-none focus:ring-2 transition-all`}
              >
                <option value="" disabled>
                  Select a property type
                </option>
                {hotelTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>

            {errors.hotel_type_id && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {errors.hotel_type_id}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="short_tagline"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Short Tagline
            </label>
            <input
              type="text"
              id="short_tagline"
              name="short_tagline"
              value={hotelData.short_tagline || ""}
              onChange={handleChange}
              placeholder="e.g. Luxury living in the heart of the city"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm outline-none focus:border-[#003580] focus:ring-2 focus:ring-[#003580] transition-all bg-white/50 focus:bg-white"
            />
            <p className="mt-1 text-xs text-gray-400">
              Appears in search results (Max 100 chars)
            </p>
          </div>

          <div>
            <label
              htmlFor="long_description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="long_description"
              name="long_description"
              rows="5"
              value={hotelData.long_description || ""}
              onChange={handleChange}
              placeholder="Describe what makes your property unique..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm outline-none focus:border-[#003580] focus:ring-2 focus:ring-[#003580] transition-all resize-none bg-white/50 focus:bg-white"
            />
          </div>

          <div className="pt-6 flex justify-end border-t border-gray-200/60 mt-8">
            <button
              type="submit"
              className="px-8 py-3 bg-[#003580] text-white text-sm font-semibold rounded-lg hover:bg-blue-800 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 focus:ring-4 focus:ring-blue-200"
            >
              Next Step
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}