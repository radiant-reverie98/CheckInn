import React, { useState } from 'react';
import axios from 'axios';

const SecuritySection = () => {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const isInvalid =
    !passwords.current ||
    !passwords.new ||
    !passwords.confirm ||
    passwords.new !== passwords.confirm ||
    passwords.new.length < 8;

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (passwords.new !== passwords.confirm) {
      alert("New password and confirm password do not match");
      return;
    }

    

    try {
      setLoading(true);

      const res = await axios.put(
        "http://localhost:5000/api/users/settings/updatePassword",
        {
          currentPass: passwords.current,
          newPass: passwords.new,
          confirmPass: passwords.confirm
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        alert("Password updated successfully");
        setPasswords({
          current: '',
          new: '',
          confirm: ''
        });
      }

    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#003580] focus:border-transparent outline-none transition-all";

  const labelClasses =
    "block text-xs font-bold uppercase text-gray-400 tracking-wider mb-2";

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Security</h2>
        <p className="text-sm text-gray-500 font-medium">
          Update your password to keep your account secure.
        </p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-5">
        <div className="max-w-md space-y-5">

          <div>
            <label className={labelClasses}>Current Password</label>
            <input
              type="password"
              name="current"
              value={passwords.current}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>

          <div className="pt-2">
            <label className={labelClasses}>New Password</label>
            <input
              type="password"
              name="new"
              value={passwords.new}
              onChange={handleChange}
              className={inputClasses}
              required
            />
            <p className="mt-2 text-[11px] text-gray-400 font-medium">
              Password must be at least 8 characters long.
            </p>
          </div>

          <div>
            <label className={labelClasses}>Confirm New Password</label>
            <input
              type="password"
              name="confirm"
              value={passwords.confirm}
              onChange={handleChange}
              className={`${inputClasses} ${
                passwords.confirm &&
                passwords.new !== passwords.confirm
                  ? 'border-red-300 focus:ring-red-200'
                  : ''
              }`}
              required
            />
          </div>

        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            onSubmit={handleUpdate}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all shadow-sm ${
              loading
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-[#003580] text-white hover:opacity-90'
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecuritySection;