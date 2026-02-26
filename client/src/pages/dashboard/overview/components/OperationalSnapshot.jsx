export default function OperationalSnapshot() {
  const checkIns = [
    { id: 1, guest: "Arjun Mehta", room: "Room 204", date: "Today" },
    { id: 2, guest: "Priya Sharma", room: "Room 102", date: "Tomorrow" },
    { id: 3, guest: "Daniel Lee", room: "Room 305", date: "25 May" },
  ];

  const checkOuts = [
    { id: 1, guest: "Riya Kapoor", room: "Room 101", date: "Today" },
    { id: 2, guest: "John Smith", room: "Room 403", date: "Tomorrow" },
    { id: 3, guest: "Sneha Patel", room: "Room 202", date: "25 May" },
  ];

  const SnapshotCard = ({ title, data }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="flex flex-col">
        {data.map((item, index) => (
          <div
            key={item.id}
            className={`flex justify-between items-center py-3 ${
              index !== data.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <div>
              <p className="text-sm font-medium text-gray-900">{item.guest}</p>
              <p className="text-xs text-gray-500">{item.room}</p>
            </div>
            <div className="text-right">
              {item.date === "Today" ? (
                <span className="bg-green-50 text-green-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                  Today
                </span>
              ) : (
                <span className="text-xs text-gray-400 font-medium">{item.date}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SnapshotCard title="Upcoming Check-ins" data={checkIns} />
      <SnapshotCard title="Upcoming Check-outs" data={checkOuts} />
    </div>
  );
}