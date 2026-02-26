import React from 'react'
import Navbar from '../guests/components/landing-page-component/Navbar'
import LandingPageContent from '../guests/LandingPageContent'
import Footer from '../guests/components/landing-page-component/Footer'
import { Outlet } from 'react-router-dom'

function GuestLanding() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default GuestLanding
