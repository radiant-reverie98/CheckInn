export default function OwnersLandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-extrabold text-[#003580] tracking-tight">
              CheckInn
            </div>

            <div className="hidden md:flex gap-8">
              <a href="/" className="text-gray-600 hover:text-[#003580] text-sm font-semibold transition-colors">
                Find a Stay
              </a>
              <a href="#features" className="text-gray-600 hover:text-[#003580] text-sm font-semibold transition-colors">
                Why Us?
              </a>
              <a href="#success-stories" className="text-gray-600 hover:text-[#003580] text-sm font-semibold transition-colors">
                Success Stories
              </a>
            </div>

            <div className="flex gap-4 items-center">
              <button className="text-gray-600 text-sm font-semibold hover:text-[#003580] transition-colors">
                Owner Login
              </button>
              <button className="px-5 py-2.5 bg-[#003580] text-white text-sm font-bold rounded-lg hover:bg-blue-800 hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                List Property Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="relative z-10">
            <div className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wide text-blue-600 uppercase bg-blue-50 rounded-full border border-blue-100">
              🚀 #1 Platform for Independent Hotels
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight text-gray-900">
              Turn Vacancies into <span className="text-[#003580]">Record Profit.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              Stop juggling spreadsheets. CheckInn puts your property on autopilot—syncing calendars, maximizing revenue, and filling rooms while you sleep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-[#003580] text-white font-bold rounded-xl shadow-xl hover:bg-blue-800 transition-all hover:scale-105">
                Start Hosting Now
              </button>
              <button className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:border-[#003580] hover:text-[#003580] transition-all bg-white">
                View Demo Dashboard
              </button>
            </div>
            <p className="mt-4 text-xs text-gray-500 font-medium">
              ✓ No credit card required &nbsp; • &nbsp; ✓ Set up in 5 minutes
            </p>
          </div>

          {/* Right Visual (Dashboard Preview) */}
          <div className="relative">
            {/* Decorative blob behind */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            
            <div className="relative rounded-2xl shadow-2xl border border-gray-100 bg-white p-6 sm:p-8 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              
              {/* Header of Mockup */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Morning Overview</h3>
                  <p className="text-xs text-gray-500">Welcome back, Alex!</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <span className="animate-pulse h-2 w-2 rounded-full bg-green-500"></span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: 'Active Guests', value: '42', trend: '+12%', color: 'text-[#003580]' },
                  { label: 'This Month', value: '$12.4K', trend: '↗', color: 'text-green-600' },
                  { label: 'Occupancy', value: '98%', trend: 'High', color: 'text-blue-600' }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center hover:shadow-md transition-shadow">
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{item.label}</p>
                    <p className={`text-2xl font-black ${item.color} my-1`}>{item.value}</p>
                    <p className="text-[10px] text-green-600 font-bold bg-green-50 inline-block px-2 rounded-full">{item.trend}</p>
                  </div>
                ))}
              </div>

              {/* Calendar Snippet */}
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm mb-6">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs font-bold text-gray-700">Occupancy Map</p>
                  <p className="text-[10px] text-blue-600 font-medium cursor-pointer">View Full</p>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-8 text-[10px] flex items-center justify-center rounded-lg font-medium transition-all cursor-pointer hover:scale-110 ${
                        [1, 2, 3, 5, 6, 8, 9, 10, 11, 13].includes(i)
                          ? 'bg-[#003580] text-white shadow-blue-200 shadow-lg'
                          : 'bg-gray-50 text-gray-300'
                      }`}
                    >
                      {i + 14}
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Feed */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Live Check-ins
                </p>
                <div className="space-y-3">
                  {['Marcus T. checked into Suite 404', 'Lydia B. paid invoice #2099', 'New Booking: Family of 4'].map(
                    (action, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs text-gray-600 bg-white p-2 rounded-lg border border-gray-100 shadow-sm">
                        <div className="w-6 h-6 rounded-full bg-blue-50 text-[#003580] flex items-center justify-center text-[10px] font-bold">
                          {String.fromCharCode(65 + i)}
                        </div>
                        {action}
                      </div>
                    )
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>CheckInn © 2026. Built for hospitality.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#003580]">Privacy</a>
            <a href="#" className="hover:text-[#003580]">Terms</a>
            <a href="#" className="hover:text-[#003580]">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}