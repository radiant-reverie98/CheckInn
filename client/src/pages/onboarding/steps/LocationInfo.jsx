import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import locationData from '../../../data/location.json';

export default function LocationInfo() {
  const { hotelData, setHotelData } = useOutletContext();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const availableCities = hotelData.state
    ? locationData[hotelData.state] || []
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setHotelData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleStateChange = (e) => {
    const newState = e.target.value;

    setHotelData((prev) => ({
      ...prev,
      state: newState,
      city: '',
    }));

    if (errors.state) {
      setErrors((prev) => ({ ...prev, state: '' }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();

    const newErrors = {};
    const requiredFields = ['state', 'city', 'street_address'];

    requiredFields.forEach((field) => {
      if (!hotelData[field]?.trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    navigate('/onboarding/create-hotel/amenities');
  };

  const handleBack = () => {
    navigate('/onboarding/create-hotel/basic');
  };

  return (
    <div
      className={`max-w-2xl mx-auto transition-all duration-700 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0 blur-0'
          : 'opacity-0 translate-y-8 blur-sm'
      }`}
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Location & Address
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Where is your property located? This helps guests find you easily.
          </p>
        </div>

        <form onSubmit={handleNext} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                State / Province <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="state"
                  name="state"
                  value={hotelData.state || ''}
                  onChange={handleStateChange}
                  className={`w-full appearance-none rounded-lg border ${
                    errors.state
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-[#003580] focus:border-[#003580]'
                  } bg-white/50 focus:bg-white px-4 py-2.5 shadow-sm outline-none focus:ring-2 transition-all`}
                >
                  <option value="" disabled>
                    Select State
                  </option>
                  {Object.keys(locationData).map((state) => (
                    <option key={state} value={state}>
                      {state}
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
              {errors.state && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.state}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="city"
                  name="city"
                  value={hotelData.city || ''}
                  onChange={handleChange}
                  disabled={!hotelData.state}
                  className={`w-full appearance-none rounded-lg border ${
                    errors.city
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-[#003580] focus:border-[#003580]'
                  } bg-white/50 focus:bg-white px-4 py-2.5 shadow-sm outline-none focus:ring-2 transition-all disabled:bg-gray-100/50 disabled:text-gray-400`}
                >
                  <option value="" disabled>
                    {hotelData.state
                      ? 'Select City'
                      : 'Select State First'}
                  </option>
                  {availableCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
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
              {errors.city && (
                <p className="mt-1 text-xs text-red-500 font-medium">
                  {errors.city}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="street_address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Street Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="street_address"
              name="street_address"
              rows="3"
              value={hotelData.street_address || ''}
              onChange={handleChange}
              placeholder="e.g. 123 Market Street, Suite 400"
              className={`w-full rounded-lg border ${
                errors.street_address
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-[#003580] focus:border-[#003580]'
              } px-4 py-2.5 shadow-sm outline-none focus:ring-2 transition-all resize-none bg-white/50 focus:bg-white`}
            />
            {errors.street_address && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {errors.street_address}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="google_maps_link"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Google Maps Link{' '}
              <span className="text-gray-400 font-normal">
                (Optional)
              </span>
            </label>
            <input
              type="text"
              id="google_maps_link"
              name="google_maps_link"
              value={hotelData.google_maps_link || ''}
              onChange={handleChange}
              placeholder="Paste Google Maps URL here"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 shadow-sm outline-none focus:border-[#003580] focus:ring-2 focus:ring-[#003580] transition-all bg-white/50 focus:bg-white"
            />
          </div>

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
              Next: Amenities
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}