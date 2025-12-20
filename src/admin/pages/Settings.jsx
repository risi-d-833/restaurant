// src/components/admin/Settings.jsx (Modern & Enhanced Version)
import React, { useState } from "react";
import { FiSave, FiUpload, FiMoon, FiSun, FiBell, FiGlobe } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true); // Assuming dark mode by default
  const [notifications, setNotifications] = useState(true);

  const [formData, setFormData] = useState({
    restaurantName: "My Cafe Delight",
    email: "admin@mycafe.com",
    phone: "+91 98765 43210",
    address: "123 Main Street, Mumbai, India",
    currency: "INR",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Mock save action
    alert("Settings saved successfully!");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-12"
    >
      {/* Header */}
      <div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Settings</h2>
        <p className="text-gray-400 text-lg">Customize your cafe's profile and preferences</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* General Settings */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="bg-[#111] p-8 rounded-2xl shadow-2xl border border-gray-800">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <FiGlobe className="w-6 h-6 text-orange-400" />
              General Information
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">Restaurant Name</label>
                <input
                  type="text"
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-black border border-gray-700 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Contact Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-black border border-gray-700 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-black border border-gray-700 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-5 py-4 bg-black border border-gray-700 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition resize-none"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 to-pink-500 text-black text-lg font-bold rounded-full hover:shadow-xl transition-all hover:scale-105"
          >
            <FiSave className="w-6 h-6" />
            Save Changes
          </button>
        </motion.div>

        {/* Preferences & Theme */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Cafe Logo Upload */}
          <div className="bg-[#111] p-8 rounded-2xl shadow-2xl border border-gray-800">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <FiUpload className="w-6 h-6 text-orange-400" />
              Cafe Logo
            </h3>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center text-4xl font-bold text-black mb-6">
                MC
              </div>
              <button className="px-8 py-3 bg-orange-500/20 text-orange-400 rounded-full hover:bg-orange-500 hover:text-black transition">
                Upload New Logo
              </button>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-[#111] p-8 rounded-2xl shadow-2xl border border-gray-800 space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Preferences</h3>

            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {darkMode ? <FiMoon className="w-6 h-6 text-orange-400" /> : <FiSun className="w-6 h-6 text-yellow-400" />}
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-gray-400 text-sm">Toggle dark/light theme</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-14 h-8 rounded-full transition ${darkMode ? "bg-orange-500" : "bg-gray-600"}`}
              >
                <span className={`absolute top-1 left-1 w-6 h-6 bg-black rounded-full transition ${darkMode ? "translate-x-6" : ""}`} />
              </button>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FiBell className="w-6 h-6 text-orange-400" />
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-gray-400 text-sm">Order alerts & updates</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-14 h-8 rounded-full transition ${notifications ? "bg-orange-500" : "bg-gray-600"}`}
              >
                <span className={`absolute top-1 left-1 w-6 h-6 bg-black rounded-full transition ${notifications ? "translate-x-6" : ""}`} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}