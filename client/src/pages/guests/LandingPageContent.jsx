import React from 'react'
import HeroSection from './components/landing-page-component/HeroSection';
import FeaturedSection from './components/landing-page-component/FeaturedSection';
import WhyChooseUs from './components/landing-page-component/WhyChooseUs';
import Testimonials from './components/landing-page-component/Testimonials';
import FinalCTA from './components/landing-page-component/FinalCTA';
import { BookingProvider } from './BookingContext';
import BrowseAllButton from './components/landing-page-component/BrowseAllButton';

function LandingPageContent() {
  const handleViewDetails = (id) => {
    console.log("Viewing room ID:", id);
  };

  return (
    /* Changed background to Mist White and updated text defaults to Slate */
    <div className="bg-white min-h-screen pb-32 text-slate-900" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      
      {/* 1. Deep Sea Minimalist Hero */}
      <BookingProvider>
      <HeroSection />

      {/* 2. Coastal Collection Section */}
      <FeaturedSection onViewDetails={handleViewDetails} />
     
      {/* 3. Refined Minimalist Navigation Link */}
      <div className="mt-24 text-center">
        <BrowseAllButton/>
      </div>
       </BookingProvider>
      {/* 4. Effortless Exploration Benefits */}
      <WhyChooseUs/>

      {/* 5. Guest Stories & Moments */}
      <Testimonials/>

      {/* 6. Final Invitation to Book */}
      <FinalCTA/>
    </div>
  )
}

export default LandingPageContent