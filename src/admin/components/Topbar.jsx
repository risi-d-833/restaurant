// src/components/Topbar.jsx (With Proper Working Logout)
import React from "react";
import { FiBell, FiLogOut, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Added for navigation

export default function Topbar() {
  const navigate = useNavigate();

  // Logout function - clears auth and redirects to login/home
  const handleLogout = () => {
    // Clear any auth tokens/localStorage (adjust based on your auth method)
    localStorage.removeItem("authToken");     // Example: remove token
    localStorage.removeItem("userRole");      // Example: remove role
    sessionStorage.clear();                   // Optional: clear session

    // Redirect to login page or home
    navigate("/login"); // Change to "/" if you want to go to home page
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-gray-800 bg-black/50 backdrop-blur-md sticky top-0 z-50"
    >
      {/* Left: Title */}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
          Admin Panel
        </h1>
        <span className="hidden md:block text-gray-500 text-sm">My Cafe Delight</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-5">
        {/* Notification Bell */}
        <button
          className="relative p-3 rounded-full hover:bg-orange-500/10 transition-all hover:scale-110"
          aria-label="Notifications"
        >
          <FiBell className="w-6 h-6 text-gray-300 hover:text-orange-400 transition" />
          {/* Notification Badge */}
          <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        </button>

        {/* User Profile + Logout */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-black font-bold shadow-lg">
            A
          </div>

          {/* Logout Button - Now Fully Working */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-black font-semibold hover:shadow-xl hover:shadow-orange-500/30 transition-all hover:scale-105"
          >
            <FiLogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}