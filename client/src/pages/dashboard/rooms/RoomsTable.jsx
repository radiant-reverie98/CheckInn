import React from "react";
import RoomsRow from "./RoomsRow";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const RoomsTable = ({ refreshTrigger, onEdit, onDelete }) => {
  const { id } = useParams();
  const [localRooms, setLocalRooms] = useState([]);

  const fetchAllRooms = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users/rooms/fetchAllRooms/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setLocalRooms(res.data.rooms);
      }
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchAllRooms();
    }
  }, [id, fetchAllRooms, refreshTrigger]);

  if (!localRooms || localRooms.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-20 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">No rooms added yet</h3>
        <p className="text-sm text-gray-500 mt-1">Start by adding your first room</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                S.No
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Type
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Price
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Capacity
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {localRooms.map((room, index) => (
              <RoomsRow
                key={room.id || index}
                index={index}
                room={room}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomsTable;