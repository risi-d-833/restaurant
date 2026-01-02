import React, { useEffect, useRef, useState } from "react";
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
  const fileRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [logoPreview, setLogoPreview] = useState(null);

  const [formData, setFormData] = useState({
    restaurantName: "",
    email: "",
    phone: "",
    address: "",
    currency: "INR",
  });

  /* ================= LOAD SETTINGS ================= */
  useEffect(() => {
    fetchSettings()
      .then((res) => {
        if (!res) return;
        setFormData({
          restaurantName: res.restaurantName || "",
          email: res.email || "",
          phone: res.phone || "",
          address: res.address || "",
          currency: res.currency || "INR",
        });
        setDarkMode(Boolean(res.darkMode));
        setNotifications(Boolean(res.notifications));
        setLogoPreview(res.logo || null);
      })
      .finally(() => setLoading(false));
  }, []);

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (!formData.restaurantName || !formData.email) {
      setMessage("Please fill all required fields");
      return;
    }

    setSaving(true);
    setMessage("");

    const data = new FormData();
    Object.entries(formData).forEach(([k, v]) => data.append(k, v));
    data.append("darkMode", darkMode);
    data.append("notifications", notifications);

    if (fileRef.current?.files[0]) {
      data.append("logo", fileRef.current.files[0]);
    }

    try {
      const res = await saveSettings(data);
      setLogoPreview(res?.settings?.logo || logoPreview);
      setMessage("Settings updated successfully");
    } catch {
      setMessage("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
        Loading settings...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-400 mt-2">
          Manage your cafe profile and preferences
        </p>
      </div>

      {/* MESSAGE */}
      {message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`p-4 rounded-xl text-center border ${
            message.includes("success")
              ? "bg-green-500/10 text-green-400 border-green-500/30"
              : "bg-red-500/10 text-red-400 border-red-500/30"
          }`}
        >
          {message}
        </motion.div>
      )}

      <div className="grid xl:grid-cols-2 gap-10">
        {/* LEFT */}
        <GlassCard title="General Information" icon={<FiGlobe />}>
          <Input
            label="Restaurant Name"
            value={formData.restaurantName}
            onChange={(v) =>
              setFormData({ ...formData, restaurantName: v })
            }
          />
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(v) => setFormData({ ...formData, email: v })}
          />
          <Input
            label="Phone Number"
            value={formData.phone}
            onChange={(v) => setFormData({ ...formData, phone: v })}
          />
          <Textarea
            label="Full Address"
            value={formData.address}
            onChange={(v) => setFormData({ ...formData, address: v })}
          />

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-6 w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-semibold transition"
          >
            <FiSave />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </GlassCard>

        {/* RIGHT */}
        <div className="space-y-8">
          <GlassCard title="Cafe Logo" icon={<FiUpload />}>
            <div className="flex flex-col items-center">
              <img
                src={
                  logoPreview ||
                  "https://via.placeholder.com/200?text=Logo"
                }
                className="w-36 h-36 rounded-2xl object-cover border border-white/10"
              />

              <label className="mt-5 cursor-pointer px-6 py-3 rounded-full bg-orange-500/20 text-orange-400 hover:bg-orange-500 hover:text-black transition">
                Upload Logo
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    setLogoPreview(
                      URL.createObjectURL(e.target.files[0])
                    )
                  }
                />
              </label>
            </div>
          </GlassCard>

          <GlassCard title="Preferences" icon={<FiBell />}>
            <Toggle
              label="Dark Mode"
              value={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              icon={darkMode ? <FiMoon /> : <FiSun />}
            />
            <Toggle
              label="Notifications"
              value={notifications}
              onChange={() => setNotifications(!notifications)}
              icon={<FiBell />}
            />
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
}

/* ================= UI COMPONENTS ================= */

const GlassCard = ({ title, icon, children }) => (
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl space-y-5">
    <h3 className="flex items-center gap-3 text-xl font-semibold text-orange-400">
      {icon}
      {title}
    </h3>
    {children}
  </div>
);

const Input = ({ label, value, onChange, type = "text" }) => (
  <div className="space-y-1">
    <label className="text-sm text-gray-400">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-orange-500 outline-none transition"
    />
  </div>
);

const Textarea = ({ label, value, onChange }) => (
  <div className="space-y-1">
    <label className="text-sm text-gray-400">{label}</label>
    <textarea
      rows="3"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-orange-500 outline-none transition resize-none"
    />
  </div>
);

const Toggle = ({ label, value, onChange, icon }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3 text-gray-300">
      <span className="text-orange-400">{icon}</span>
      {label}
    </div>

    <button
      onClick={onChange}
      className={`w-14 h-8 rounded-full relative transition ${
        value ? "bg-orange-500" : "bg-gray-600"
      }`}
    >
      <span
        className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-black transition ${
          value ? "translate-x-6" : ""
        }`}
      />
    </button>
  </div>
);
