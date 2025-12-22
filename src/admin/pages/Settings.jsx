// src/components/admin/Settings.jsx (With Cloudinary Logo Upload - Fully Working)
import React, { useState, useEffect, useRef } from "react";
import { FiSave, FiUpload, FiMoon, FiSun, FiBell, FiGlobe } from "react-icons/fi";
import { motion } from "framer-motion";
import { fetchSettings, saveSettings } from "../../services/api";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    restaurantName: "",
    email: "",
    phone: "",
    address: "",
    currency: "INR",
  });

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      try {
        const data = await fetchSettings();
        setFormData({
          restaurantName: data.restaurantName || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          currency: data.currency || "INR",
        });
        setDarkMode(data.darkMode ?? true);
        setNotifications(data.notifications ?? true);
        setLogoPreview(data.logo || null);
      } catch (err) {
        if (err.message.includes("not configured")) {
          setMessage("Welcome! Please configure your cafe settings.");
        }
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!formData.restaurantName || !formData.email || !formData.phone || !formData.address) {
      setMessage("Please fill all required fields");
      return;
    }

    setSaving(true);
    setMessage("");

    const data = new FormData();
    data.append("restaurantName", formData.restaurantName);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("currency", formData.currency);
    data.append("darkMode", darkMode);
    data.append("notifications", notifications);

    if (fileInputRef.current?.files[0]) {
      data.append("logo", fileInputRef.current.files[0]);
    }

    try {
      const saved = await saveSettings(data); // saveSettings now handles FormData
      setLogoPreview(saved.settings.logo);
      setMessage("Settings saved successfully!");
    } catch (err) {
      setMessage(err.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-400">Loading settings...</p>
      </div>
    );
  }

  return (
    <motion.div className="space-y-12">
      <div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Settings</h2>
        <p className="text-gray-400 text-lg">Customize your cafe's profile and preferences</p>
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl text-center font-medium ${
            message.includes("successfully") || message.includes("Welcome")
              ? "bg-green-900/50 text-green-300 border border-green-800"
              : "bg-red-900/50 text-red-300 border border-red-800"
          }`}
        >
          {message}
        </motion.div>
      )}

      <div className="grid lg:grid-cols-2 gap-10">
        {/* General Settings */}
        <motion.div className="space-y-8">
          <div className="bg-[#111] p-8 rounded-2xl shadow-2xl border border-gray-800">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <FiGlobe className="w-6 h-6 text-orange-400" />
              General Information
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-400 mb-2">Restaurant Name *</label>
                <input
                  type="text"
                  name="restaurantName"
                  value={formData.restaurantName}
                  onChange={handleChange}
                  placeholder="Village CHEF"
                  className="w-full px-5 py-4 bg-black border border-gray-700 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Contact Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@villagechef.com"
                  className="w-full px-5 py-4 bg-black border border-gray-700 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-5 py-4 bg-black border border-gray-700 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Indore, MP, India"
                  className="w-full px-5 py-4 bg-black border border-gray-700 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition resize-none"
                />
              </div>
            </div>
          </div>

          <motion.button
            onClick={handleSave}
            disabled={saving}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-orange-500 to-pink-500 text-black text-lg font-bold rounded-full shadow-xl hover:shadow-orange-500/50 transition-all disabled:opacity-70"
          >
            <FiSave className="w-6 h-6" />
            {saving ? "Saving..." : "Save Changes"}
          </motion.button>
        </motion.div>

        {/* Right Side */}
        <motion.div className="space-y-8">
          {/* Logo Upload */}
          <div className="bg-[#111] p-8 rounded-2xl shadow-2xl border border-gray-800">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <FiUpload className="w-6 h-6 text-orange-400" />
              Cafe Logo
            </h3>
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 rounded-2xl overflow-hidden shadow-xl mb-6 border-4 border-gray-700">
                <img
                  src={logoPreview || "https://via.placeholder.com/160?text=Logo"}
                  alt="Cafe Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="px-8 py-3 bg-orange-500/20 text-orange-400 rounded-full hover:bg-orange-500 hover:text-black transition-all duration-300 cursor-pointer">
                Upload New Logo
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-[#111] p-8 rounded-2xl shadow-2xl border border-gray-800 space-y-6">
            <h3 className="text-2xl font-semibold mb-6">Preferences</h3>

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