import { useBooking } from '../../BookingContext';

const BrowseAllButton = () => {
  const {browseAll} = useBooking();

  const handleBrowseAll = () => {
    setCheckIn('');
    setCheckOut('');
    // Because your Context has [checkIn, checkOut] in the useEffect dependency array,
    // fetchHotels() will fire automatically with empty params.
  };

  return (
    <button 
      onClick={browseAll}
      className="text-slate-400 font-bold text-[11px] tracking-[0.3em] uppercase hover:text-blue-600 transition-all duration-500 border-b border-transparent hover:border-blue-200 pb-2"
    >
      Browse All Destinations
    </button>
  );
};

export default BrowseAllButton