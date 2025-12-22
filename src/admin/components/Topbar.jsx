// src/admin/components/Topbar.jsx (Real-time Admin Name Display)
import React, { useState, useEffect } from "react";
import { FiBell, FiLogOut, FiChevronDown } from "react-icons/fi";
import { FiMenu } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Topbar({ onMenuToggle, user }) {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("Admin");
  const [adminEmail, setAdminEmail] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    // Update from props if provided
    if (user) {
      setAdminName(user.name || user.userName || "Admin");
      setAdminEmail(user.email || user.userEmail || "");
      return;
    }

    // Fallback to localStorage
    const updateFromStorage = () => {
      const name =
        localStorage.getItem("adminName") ||
        localStorage.getItem("userName") ||
        sessionStorage.getItem("userName") ||
        "Admin";
      const email =
        localStorage.getItem("adminEmail") ||
        localStorage.getItem("userEmail") ||
        sessionStorage.getItem("userEmail") ||
        "";
      setAdminName(name);
      setAdminEmail(email);
    };

    updateFromStorage();

    // Listen for real-time storage changes
    const handleStorageChange = (e) => {
      if (
        e.key === "adminName" ||
        e.key === "userName" ||
        e.key === "adminEmail" ||
        e.key === "userEmail"
      ) {
        updateFromStorage();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom events
    const handleCustomUpdate = () => {
      updateFromStorage();
    };
    window.addEventListener("userUpdated", handleCustomUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userUpdated", handleCustomUpdate);
    };
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    sessionStorage.clear();
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "A";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-4 border-b border-gray-800 bg-black/50 backdrop-blur-md sticky top-0 z-40"
    >
      {/* Left: Menu Button & Title */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-900 transition-all"
          aria-label="Toggle menu"
        >
          <FiMenu className="w-6 h-6 text-orange-400" />
        </button>

        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
          Admin
        </h1>
        <span className="hidden sm:block text-gray-500 text-xs md:text-sm">
          Control Panel
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notification Bell */}
        <button
          className="relative p-2 md:p-3 rounded-full hover:bg-orange-500/10 transition-all hover:scale-110"
          aria-label="Notifications"
        >
          <FiBell className="w-5 h-5 md:w-6 md:h-6 text-gray-300 hover:text-orange-400 transition" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 md:w-3 md:h-3 bg-red-500 rounded-full animate-pulse" />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 md:gap-3 px-2 md:px-4 py-2 md:py-3 rounded-lg md:rounded-full hover:bg-gray-900/50 transition-all group"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-black font-bold shadow-lg text-xs md:text-sm">
              {getInitials(adminName)}
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-xs md:text-sm font-semibold text-white leading-tight">
                {adminName}
              </span>
              {adminEmail && (
                <span className="text-xs text-gray-400 leading-tight truncate max-w-[150px]">
                  {adminEmail}
                </span>
              )}
            </div>
            <FiChevronDown className="w-4 h-4 text-gray-400 group-hover:text-orange-400 transition hidden md:block" />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfile && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-56 bg-[#111] border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-50"
            >
              <div className="p-4 border-b border-gray-800 bg-black/50">
                <p className="text-sm font-semibold text-white">{adminName}</p>
                {adminEmail && (
                  <p className="text-xs text-gray-400 mt-1 truncate">
                    {adminEmail}
                  </p>
                )}
              </div>

              <div className="p-2">
                <button
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/admin/settings");
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-orange-500/20 hover:text-orange-400 rounded-lg transition"
                >
                  ⚙️ Settings
                </button>
                <button
                  onClick={() => {
                    setShowProfile(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 rounded-lg transition flex items-center gap-2"
                >
                  <FiLogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </motion.div>
          )}

          {/* Mobile Logout Button */}
          <button
            onClick={handleLogout}
            className="flex md:hidden items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-semibold hover:shadow-xl hover:shadow-orange-500/30 transition-all hover:scale-105"
            aria-label="Logout"
          >
            <FiLogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}