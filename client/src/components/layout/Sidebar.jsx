import { NavLink } from 'react-router-dom';
import { useHotel } from '../../context/HotelContext';
export default function Sidebar() {
  const {selectedHotelId} = useHotel();
  const navLinks = [
    { name: 'Overview', path: `/dashboard/overview/${selectedHotelId}`, end: true },
    { name: 'Rooms', path: `/dashboard//rooms/${selectedHotelId}` },
    { name: 'Bookings', path: `/dashboard//bookings/${selectedHotelId}` },
    { name: 'Settings', path: `/dashboard/settings/${selectedHotelId}` },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-6 flex flex-col">
      {/* App Logo */}
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-bold text-[#003580]">CheckInn</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end={link.end}
            className={({ isActive }) =>
              `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-blue-50 text-[#003580]'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}