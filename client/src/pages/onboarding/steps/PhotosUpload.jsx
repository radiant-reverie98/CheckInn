import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

export default function PhotosUpload() {
  const { hotelData, setHotelData } = useOutletContext();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newPreviews = files.map((file) => ({
      preview: URL.createObjectURL(file),
    }));

    setHotelData((prev) => ({
      ...prev,
      photos: [...(prev.photos || []), ...files],
      coverIndex:
        prev.coverIndex !== undefined
          ? prev.coverIndex
          : 0,
    }));

    setPreviews((prev) => [...prev, ...newPreviews]);

    if (error) setError('');
  };

  const removeImage = (indexToRemove) => {
    setHotelData((prev) => {
      const updatedPhotos = prev.photos.filter(
        (_, index) => index !== indexToRemove
      );

      let updatedCoverIndex = prev.coverIndex;

      if (updatedPhotos.length === 0) {
        updatedCoverIndex = undefined;
      } else if (prev.coverIndex === indexToRemove) {
        updatedCoverIndex = 0;
      } else if (prev.coverIndex > indexToRemove) {
        updatedCoverIndex = prev.coverIndex - 1;
      }

      return {
        ...prev,
        photos: updatedPhotos,
        coverIndex: updatedCoverIndex,
      };
    });

    setPreviews((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const setCoverImage = (indexToSet) => {
    setHotelData((prev) => ({
      ...prev,
      coverIndex: indexToSet,
    }));

    if (error) setError('');
  };

  const handleNext = () => {
    const photos = hotelData.photos || [];

    if (photos.length < 3) {
      setError(
        'Please upload at least 3 images to showcase your property.'
      );
      return;
    }

    if (
      hotelData.coverIndex === undefined ||
      hotelData.coverIndex === null
    ) {
      setError('Please select one image to be the Cover Image.');
      return;
    }

    navigate('/onboarding/create-hotel/review');
  };

  const handleBack = () => {
    navigate('/onboarding/create-hotel/amenities');
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
            Property Photos
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Upload at least 3 photos. Choose a cover photo that best represents your hotel.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center items-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col justify-center items-center w-full h-48 bg-gray-50/50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-white/60 transition-colors"
            >
              <div className="flex flex-col justify-center items-center pt-5 pb-6">
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG or GIF (MAX. 5MB)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {error && (
            <div className="p-3 bg-red-50/80 border border-red-100 rounded-lg">
              <p className="text-sm text-red-600 font-medium">
                {error}
              </p>
            </div>
          )}

          {previews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {previews.map((image, index) => (
                <div
                  key={index}
                  className={`group relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                    hotelData.coverIndex === index
                      ? 'border-[#003580] shadow-md ring-2 ring-blue-50 ring-offset-2'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image.preview}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {hotelData.coverIndex === index && (
                    <div className="absolute top-2 left-2 bg-[#003580] text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                      COVER IMAGE
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="bg-white/90 text-red-500 p-1.5 rounded-full"
                      >
                        ✕
                      </button>
                    </div>

                    {hotelData.coverIndex !== index && (
                      <button
                        type="button"
                        onClick={() => setCoverImage(index)}
                        className="w-full bg-white/90 text-gray-800 text-xs font-semibold py-1.5 rounded"
                      >
                        Set as Cover
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-6 flex justify-between items-center border-t border-gray-200/60 mt-8">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-2 border border-gray-300 text-gray-600 font-medium text-sm rounded-lg"
            >
              ← Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-8 py-3 bg-[#003580] text-white text-sm font-semibold rounded-lg"
            >
              Review & Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}