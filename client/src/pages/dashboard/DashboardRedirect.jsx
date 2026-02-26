import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotel } from '../../context/HotelContext';
import { CheckInnLoader } from '../../components/CheckInnLoader';

function DashboardRedirect() {
  const { hotels, loading } = useHotel();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (hotels && hotels.length > 0) {
        navigate(`/dashboard/overview/${hotels[0].id}`, { replace: true });
      } else {
        navigate(`/onboarding/create-hotel/welcome`, { replace: true }); // ✅ fixed
      }
    }
  }, [loading, hotels, navigate]);

  if (loading) {
    return (
      <CheckInnLoader
        fullscreen={true}
        text="Synchronizing your properties..."
      />
    );
  }

  return null;
}

export default DashboardRedirect;