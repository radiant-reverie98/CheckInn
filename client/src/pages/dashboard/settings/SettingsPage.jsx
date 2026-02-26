import React from 'react';
import ProfileSection from './components/ProfileSection';
import SecuritySection from './components/SecuritySection';
import HotelSection from './components/HotelSection';
import LogoutSection from './components/LogoutSection';
import ListNewHotel from './components/ListNewHotel';

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-500 text-sm">Manage your personal information, security preferences, and hotel details.</p>
        </header>

        <div className="space-y-8">
          <ProfileSection />
          <HotelSection />
          <SecuritySection />
          <LogoutSection/>
          <ListNewHotel/>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;