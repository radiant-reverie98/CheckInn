import React from 'react'
import KPIGrid from './components/KPIGrid'
import OperationalSnapshot from './components/OperationalSnapshot'
import RecentBookingsTable from './components/RecentBookingsTable'
import RevenueOverview from './components/RevenueOverview'
import StatCard from './components/StatCard'
import { kpiData } from './components/kpiData'

function Overview() {
    const revenueData = {
    thisMonth: "₹48,000",
    lastMonth: "₹42,500",
    growthPercentage: "+12%",
  };
  return (
    <div>
      <KPIGrid kpis={kpiData}/>
      <OperationalSnapshot/>
      <RecentBookingsTable/>
      <RevenueOverview revenueData={revenueData}/>
      
    </div>
  )
}

export default Overview
