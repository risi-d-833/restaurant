// src/components/admin/Settings.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  FiSave,
  FiUpload,
  FiMoon,
  FiSun,
  FiBell,
  FiGlobe,
} from "react-icons/fi";
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

  /* ================= LOAD SETTINGS ================= */
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await fetchSettings();
        if (data) {
          setFormData({
            restaurantName: data.restaurantName || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            currency: data.currency || "INR",
          });
          setDarkMode(Boolean(data.darkMode));
          setNotifications(Boolean(data.notifications));
          setLogoPreview(data.logo || null);
        }
      } catch (err) {
        // ❌ NO WELCOME MESSAGE ANYMORE
        console.log("Settings not found, user can create new ones.");
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (
      !formData.restaurantName ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      setMessage("Please fill all required fields");
      return;
    }

    setSaving(true);
    setMessage("");

    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));
    data.append("darkMode", darkMode);
    data.append("notifications", notifications);

    if (fileInputRef.current?.files[0]) {
      data.append("logo", fileInputRef.current.files[0]);
    }

    try {
      const res = await saveSettings(data);
      setLogoPreview(res.settings.logo);
      setMessage("Settings saved successfully");
    } catch (err) {
      setMessage("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg">
        Loading settings...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-14 pb-16"
    >
      {/* Header */}
      <div>
        <h2 className="text-5xl font-extrabold text-white tracking-tight">
          Settings
        </h2>
        <p className="text-gray-400 text-lg mt-2">
          Manage your cafe profile & preferences
        </p>
      </div>

      {/* Message */}
      {message && (
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`p-4 rounded-xl text-center text-lg border ${
            message.includes("successfully")
              ? "bg-green-500/10 text-green-400 border-green-500/30"
              : "bg-red-500/10 text-red-400 border-red-500/30"
          }`}
        >
          {message}
        </motion.div>
      )}

      <div className="grid lg:grid-cols-2 gap-12">
        {/* LEFT – GENERAL INFO */}
        <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
          <h3 className="text-2xl font-semibold flex items-center gap-3">
            <FiGlobe className="text-orange-400" />
            General Information
          </h3>

          <input
            name="restaurantName"
            placeholder="Restaurant Name"
            value={formData.restaurantName}
            onChange={handleChange}
            className="input"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="input"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="input"
          />

          <textarea
            name="address"
            rows="3"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleChange}
            className="input resize-none"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={saving}
            className="btn-primary"
          >
            <FiSave />
            {saving ? "Saving..." : "Save Settings"}
          </motion.button>
        </div>

        {/* RIGHT */}
        <div className="space-y-10">
          {/* LOGO */}
          <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] p-8 rounded-3xl border border-white/10 shadow-2xl">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <FiUpload className="text-orange-400" />
              Cafe Logo
            </h3>

            <div className="flex flex-col items-center">
              <div className="w-44 h-44 rounded-2xl overflow-hidden border border-gray-700 shadow-xl">
                <img
                  src={logoPreview || "https://via.placeholder.com/200?text=Logo"}
                  alt="Cafe Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              <label className="mt-6 px-8 py-3 rounded-full bg-orange-500/20 text-orange-400 hover:bg-orange-500 hover:text-black transition cursor-pointer">
                Upload Logo
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </label>
            </div>
          </div>

          {/* PREFERENCES */}
          <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
            <Toggle
              label="Dark Mode"
              icon={darkMode ? <FiMoon /> : <FiSun />}
              value={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <Toggle
              label="Notifications"
              icon={<FiBell />}
              value={notifications}
              onChange={() => setNotifications(!notifications)}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ================= TOGGLE ================= */
function Toggle({ label, icon, value, onChange }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4 text-lg">
        <span className="text-orange-400">{icon}</span>
        <span>{label}</span>
      </div>
      <button
        onClick={onChange}
        className={`relative w-14 h-8 rounded-full transition ${
          value ? "bg-orange-500" : "bg-gray-600"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-6 h-6 bg-black rounded-full transition ${
            value ? "translate-x-6" : ""
          }`}
        />
      </button>
    </div>
  );
}
