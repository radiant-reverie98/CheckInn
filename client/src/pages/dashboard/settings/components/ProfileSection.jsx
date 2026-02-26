import React, { useEffect, useState } from 'react';
import axios from "axios"
const ProfileSection = () => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    const fetchProfile = async()=>{
      try{
        const res = await axios.get('http://localhost:5000/api/users/settings/profileInfo',{withCredentials: true})
        // console.log(res)
        if(res.data.success){
          setName(res.data.userInfo[0].name)
          setEmail(res.data.userInfo[0].email)
          if(res.data.userInfo[0].phone)setPhone(res.data.userInfo[0].phone)
        }else console.log(res)
      }catch(err){
        console.log(err.message)
      }
    }
    fetchProfile();
  },[])

  const handleSave = async(e) => {
    setLoading(true)
    e.preventDefault();
    try{
      const res = await axios.put(`http://localhost:5000/api/users/settings/updateProfileInfo`,{name,email,phone},{withCredentials: true})
      if(res.data.success){
        alert("Success")
      }
    }catch(err){
      console.log(err)
    }finally{setLoading(false)}
  };

  const inputClasses = "w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#003580] focus:border-transparent outline-none transition-all";
  const labelClasses = "block text-xs font-bold uppercase text-gray-400 tracking-wider mb-2";

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
        <p className="text-sm text-gray-500 font-medium">Update your personal contact details.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className={labelClasses}>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className={inputClasses}
            />
          </div>
          <div>
            <label className={labelClasses}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder='Enter your number'
              value={phone}
              onChange={(e)=> setPhone(e.target.value)}
              className={inputClasses}
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            onSubmit={handleSave}
            disabled={loading}
            className="bg-[#003580] text-white px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSection;