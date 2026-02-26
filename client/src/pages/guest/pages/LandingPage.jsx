import React from 'react'
import Navbar from '../components/general/Navbar'
import Footer from '../components/general/Footer'
import FeaturedSection from '../components/landing-page/FeaturedSection'
import HeroSection from '../components/landing-page/HeroSection'
import HowItWorks from '../components/landing-page/HowItWorks'
import LandingCTA from '../components/landing-page/LandingCTA'

function LandingPage() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <FeaturedSection/>
      <HowItWorks/>
      <LandingCTA/>
      <Footer/>
      
    </div>
  )
}

export default LandingPage
