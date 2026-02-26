import React from "react";
import { Routes, Route } from "react-router-dom";

// pages
import OwnersLandingPage from "../pages/landing-page/OwnerLandingPage";
import OwnerLogin from "../pages/auth/OwnerLogin";
import OwnerRegister from "../pages/auth/OwnerRegister";

import DashboardLayout from "../layouts/DashboardLayout";
import DashboardRedirect from "../pages/dashboard/DashboardRedirect";
import Overview from "../pages/dashboard/overview/Overview";
import Rooms from "../pages/dashboard/rooms/Rooms";
import BookingsPage from "../pages/dashboard/bookings/BookingsPage";
import SettingsPage from "../pages/dashboard/settings/SettingsPage";

// onboarding
import Createhotel from "../pages/onboarding/Createhotel";
import OnboardingWelcome from "../pages/onboarding/steps/OnboardingWelcome";
import BasicInfo from "../pages/onboarding/steps/BasicInfo";
import LocationInfo from "../pages/onboarding/steps/LocationInfo";
import AmenitiesInfo from "../pages/onboarding/steps/AmenitiesInfo";
import PhotosUpload from "../pages/onboarding/steps/PhotosUpload";
import ReviewSubmit from "../pages/onboarding/steps/ReviewSubmit";

// guest


// context
import { HotelProvider } from "../context/HotelContext";
import { AuthProvider } from "../pages/guest/context/AuthContext";
import RegisterGuest from "../pages/guest/Auth/RegisterGuest";
import GuestLayout from "../pages/guest/layout/GuestLayout";



function AppRoutes() {
  return (
    <Routes>

      {/* guest */}
      <Route element={<GuestLayout/>}>
        <Route path="/guest/register" element={<RegisterGuest/>}/>
      </Route>

      {/* owner public */}
      <Route path="/owner" element={<OwnersLandingPage />} />
      <Route path="/login/owner" element={<OwnerLogin />} />
      <Route path="/register/owner" element={<OwnerRegister />} />

      {/* onboarding WITHOUT dashboard layout */}
      <Route
        path="/onboarding/create-hotel"
        element={
          <HotelProvider>
            <Createhotel />
          </HotelProvider>
        }
      >
        <Route path="welcome" element={<OnboardingWelcome />} />
        <Route path="basic" element={<BasicInfo />} />
        <Route path="location" element={<LocationInfo />} />
        <Route path="amenities" element={<AmenitiesInfo />} />
        <Route path="photos" element={<PhotosUpload />} />
        <Route path="review" element={<ReviewSubmit />} />
      </Route>

      {/* dashboard WITH layout */}
      <Route
        path="/dashboard"
        element={
          <HotelProvider>
            <DashboardLayout />
          </HotelProvider>
        }
      >
        <Route index element={<DashboardRedirect />} />
        <Route path="overview/:id" element={<Overview />} />
        <Route path="rooms/:id" element={<Rooms />} />
        <Route path="bookings/:id" element={<BookingsPage />} />
        <Route path="settings/:id" element={<SettingsPage />} />
      </Route>

    </Routes>
  );
}

export default AppRoutes;