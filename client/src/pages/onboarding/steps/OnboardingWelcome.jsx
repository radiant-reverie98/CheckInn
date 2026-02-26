import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OnboardingWelcome() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
  }, []);

  const handleGetStarted = () => {
    navigate('/onboarding/create-hotel/basic');
  };

  // Base transition classes
  const baseTransition = "transition-all duration-1000 ease-out transform";
  
  // Animation states
  const getAnimationClass = (delay = 0) => {
    return `${baseTransition} ${
      isVisible 
        ? `opacity-100 translate-y-0 delay-${delay}` 
        : 'opacity-0 translate-y-8'
    }`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className={`max-w-2xl w-full bg-white rounded-xl shadow-lg border border-gray-100 p-8 sm:p-12 ${getAnimationClass(0)}`}>
        
        {/* Header Section */}
        <div className={`text-center mb-10 ${getAnimationClass(100)}`}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-6 animate-pulse">
            <svg className="w-8 h-8 text-[#003580]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
            Let’s List Your First Property
          </h1>
          <p className="text-gray-500 text-lg">
            We’ll guide you through a few simple steps to get your hotel live on CheckInn.
          </p>
        </div>

        {/* Steps Preview - Staggered Animation */}
        <div className="space-y-6 mb-10">
          
          {/* Step 1 */}
          <div className={`flex items-start p-4 rounded-lg bg-gray-50 border border-gray-100 ${getAnimationClass(300)}`}>
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#003580] text-white font-bold text-sm shadow-sm">
                1
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Add property details</h3>
              <p className="text-sm text-gray-500 mt-1">
                Basic info, description, and location settings.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className={`flex items-start p-4 rounded-lg bg-gray-50 border border-gray-100 ${getAnimationClass(500)}`}>
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#003580] text-white font-bold text-sm shadow-sm">
                2
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Select amenities</h3>
              <p className="text-sm text-gray-500 mt-1">
                Highlight what your property offers to attract guests.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className={`flex items-start p-4 rounded-lg bg-gray-50 border border-gray-100 ${getAnimationClass(700)}`}>
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#003580] text-white font-bold text-sm shadow-sm">
                3
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Upload photos & go live</h3>
              <p className="text-sm text-gray-500 mt-1">
                Showcase your property to guests visually.
              </p>
            </div>
          </div>

        </div>

        {/* CTA Section */}
        <div className={`text-center ${getAnimationClass(900)}`}>
          <button
            onClick={handleGetStarted}
            className="w-full sm:w-auto min-w-[200px] px-8 py-3.5 bg-[#003580] text-white font-bold text-base rounded-lg shadow-lg hover:bg-blue-800 hover:shadow-xl transition-all transform hover:-translate-y-0.5 focus:ring-4 focus:ring-blue-200 focus:outline-none"
          >
            Get Started
          </button>
          <p className="mt-4 text-xs text-gray-400 font-medium">
            You can save and continue anytime.
          </p>
        </div>

      </div>
    </div>
  );
}