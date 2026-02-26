import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Right Side (Topbar + Content) */}
      <div className="flex flex-col flex-1 overflow-hidden">
        
        {/* Topbar */}
        <Topbar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default DashboardLayout;
