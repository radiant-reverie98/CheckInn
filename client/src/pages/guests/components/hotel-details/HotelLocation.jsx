import React from 'react';
import { MapPin, Navigation, Anchor, Compass, ExternalLink } from 'lucide-react';
import { useHotelDetail } from './HotelDetailsContext';

const HotelLocation = () => {

  const { hotel } = useHotelDetail();

  if (!hotel) return null;

  const address = hotel.street_address || "Address not available";
  const cityState = `${hotel.city || ""}${hotel.city && hotel.state ? ", " : ""}${hotel.state || ""}`;

  const mapUrl = (() => {
    if (!hotel.google_maps_link) {
      return `https://www.google.com/maps?q=${encodeURIComponent(cityState)}&output=embed`;
    }

    const link = hotel.google_maps_link;

    if (link.includes("output=embed")) return link;

    const coordMatch = link.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      return `https://www.google.com/maps?q=${coordMatch[1]},${coordMatch[2]}&output=embed`;
    }

    return `https://www.google.com/maps?q=${encodeURIComponent(link)}&output=embed`;
  })();

  const highlights = [
    { icon: <Anchor size={16} />, text: "Great nearby attractions" },
    { icon: <Compass size={16} />, text: "Easy access to local transport" },
    { icon: <Navigation size={16} />, text: "Located in prime area" }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 bg-white">

      <div className="max-w-3xl mb-12">
        <span className="text-blue-600/70 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">
          The Surroundings
        </span>
        <h2 className="text-4xl font-[700] text-slate-950 tracking-tight leading-tight mb-4">
          Where You’ll <span className="italic font-serif text-slate-500">Find Us</span>
        </h2>
        <p className="text-slate-500 text-lg font-medium leading-relaxed">
          Positioned at the intersection of tranquility and discovery, our sanctuary is designed to be your home base.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

        <div className="lg:col-span-2 relative group">
          <div className="absolute -inset-1 bg-gradient-to-tr from-blue-100 to-transparent rounded-[2.5rem] blur-sm opacity-50 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative bg-white p-2 rounded-[2.5rem] border border-blue-50 shadow-xl shadow-blue-900/5">
            <iframe
              title="Hotel Location"
              src={mapUrl}
              className="w-full h-[400px] md:h-[450px] rounded-[2rem] grayscale-[0.2] contrast-[1.1]"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="space-y-10 py-4">

          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
              <MapPin size={24} />
            </div>

            <div>
              <h3 className="text-slate-950 font-bold text-xl tracking-tight mb-1">
                {cityState || "Location unavailable"}
              </h3>

              <p className="text-slate-500 font-medium leading-relaxed">
                {address}
              </p>
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-slate-100">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="text-blue-400 group-hover:text-blue-600 transition-colors">
                  {item.icon}
                </div>
                <span className="text-slate-600 text-sm font-semibold tracking-wide">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {hotel.google_maps_link && (
            <a
              href={hotel.google_maps_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full justify-center bg-blue-600 text-white font-bold text-[11px] tracking-[0.2em] uppercase py-5 rounded-2xl shadow-lg shadow-blue-200 hover:bg-slate-950 hover:shadow-none transition-all duration-500 group"
            >
              <ExternalLink size={14} className="group-hover:rotate-12 transition-transform" />
              Open in Google Maps
            </a>
          )}

        </div>
      </div>

      <div className="mt-20 flex justify-center">
        <div className="h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-blue-100 to-transparent"></div>
      </div>

    </section>
  );
};

export default HotelLocation;