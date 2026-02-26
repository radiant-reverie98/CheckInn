export default function StatCard({
  title,
  value,
  subtitle,
  trend,
  isTrendPositive,
  showProgress,
  progressValue
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-200">
      <div>
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            {title}
          </p>
          {trend && (
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                isTrendPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
              }`}
            >
              {trend}
            </span>
          )}
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mt-2">
          {value}
        </h3>
      </div>

      <div className="mt-4">
        {showProgress ? (
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-[#003580] h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressValue}%` }}
            ></div>
          </div>
        ) : (
          subtitle && (
            <p className="text-xs text-gray-400 font-medium">
              {subtitle}
            </p>
          )
        )}
      </div>
    </div>
  );
}