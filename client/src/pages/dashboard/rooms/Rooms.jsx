import React, { useState } from "react";
import RoomsHeader from "./RoomsHeader";
import RoomsFilters from "./RoomsFilters";
import RoomsTable from "./RoomsTable";
import AddRoomDrawer from "./AddRoomDrawer";
import UpdateRoomDrawer from "./UpdateRoomDrawer";

function Rooms() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  
  // State to trigger re-fetch in RoomsTable
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    type: ""
  });

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleAdd = () => {
    setIsAddOpen(true);
  };

  const handleEdit = (room) => {
    setSelectedRoomId(room.id);
    setIsUpdateOpen(true);
  };

  const handleDelete = (id) => {
    // If you add an API call here, call handleRefresh() in the .then() block
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <RoomsHeader onAddRoom={handleAdd} />

      <RoomsFilters
        filters={filters}
        onFilterChange={setFilters}
        onClear={() => setFilters({ search: "", status: "", type: "" })}
      />

      <RoomsTable
        refreshTrigger={refreshTrigger}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddRoom={handleAdd}
      />

      <AddRoomDrawer
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={handleRefresh}
      />

      <UpdateRoomDrawer
        isOpen={isUpdateOpen}
        onClose={() => {
          setIsUpdateOpen(false);
          setSelectedRoomId(null);
        }}
        roomId={selectedRoomId}
        onSuccess={handleRefresh}
      />
    </div>
  );
}

export default Rooms;