import StatCard from "./StatCard";

export default function KPIGrid({ kpis }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi) => (
        <StatCard key={kpi.id} {...kpi} />
      ))}
    </div>
  );
}
