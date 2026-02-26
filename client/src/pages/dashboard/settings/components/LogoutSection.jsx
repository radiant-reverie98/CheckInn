import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutSection = () => {
  const navigate = useNavigate();
  const handleLogout = async(e) => {
    e.preventDefault()
    try{
      const res = await axios.post(`http://localhost:5000/api/logoutOwner`,{},{withCredentials: true})
      // console.log(res)
      if(res.data.success){
        navigate("/login/owner")
      }
    }catch(err){
      console.log(err)
      alert(err)
    }
  };

  return (
    <div className="bg-white rounded-xl border border-red-100 shadow-sm p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-red-600">Logout</h2>
          <p className="text-sm text-gray-500 font-medium">
            Disconnect from your current session. You will need to sign in again to manage your hotel.
          </p>
        </div>

        <div className="flex-shrink-0">
          <button
            onClick={handleLogout}
            className="w-full md:w-auto px-6 py-2.5 bg-white text-red-600 border border-red-200 rounded-lg text-sm font-semibold hover:bg-red-50 hover:border-red-300 transition-all active:scale-95 shadow-sm"
          >
            Logout Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutSection;