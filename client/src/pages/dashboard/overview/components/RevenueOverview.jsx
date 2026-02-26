export default function RevenueOverview({ revenueData }) {
  const isPositive = revenueData?.growthPercentage?.startsWith('+');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6 mt-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
          <p className="text-sm text-gray-500 mt-1">This Month vs Last Month</p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
            }`}
          >
            {revenueData.growthPercentage}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-6">
        <div>
          <p className="text-3xl font-bold text-gray-900 tracking-tight">
            {revenueData.thisMonth}
          </p>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">
            Current Revenue
          </p>
        </div>
        <div className="pb-1">
          <p className="text-sm text-gray-500 font-medium">
            <span className="text-gray-400">vs</span> {revenueData.lastMonth}
          </p>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
            Previous Period
          </p>
        </div>
      </div>

      <div className="relative w-full h-48 bg-gray-50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-10 h-10 text-gray-300 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg>
          <p className="text-sm font-medium text-gray-400">Revenue Chart Placeholder</p>
          <p className="text-[10px] text-gray-300 mt-1 uppercase tracking-widest">
            Visual Data Integration
          </p>
        </div>
      </div>
    </div>
  );
}