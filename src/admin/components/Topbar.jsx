import React, { useState, useEffect } from "react";
import { FiBell, FiLogOut, FiChevronDown, FiMenu } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Topbar({ onMenuToggle, user }) {
  const navigate = useNavigate();

  const [adminName, setAdminName] = useState("Admin");
  const [adminEmail, setAdminEmail] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  /* ==============================
     LOAD ADMIN DATA (FIXED)
  ============================== */
  useEffect(() => {
    // 1️⃣ If user is passed via props
    if (user) {
      setAdminName(user.name || "Admin");
      setAdminEmail(user.email || "");
      return;
    }

    // 2️⃣ Read from localStorage.user (MAIN FIX)
    const loadUser = () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser) {
          setAdminName(storedUser.name || "Admin");
          setAdminEmail(storedUser.email || "");
          return;
        }

        // 3️⃣ Fallback (old keys support)
        setAdminName(
          localStorage.getItem("adminName") ||
          localStorage.getItem("userName") ||
          "Admin"
        );
        setAdminEmail(
          localStorage.getItem("adminEmail") ||
          localStorage.getItem("userEmail") ||
          ""
        );
      } catch (err) {
        console.error("Failed to load admin user");
      }
    };

    loadUser();

    // Real-time updates
    const handleStorageChange = (e) => {
      if (e.key === "user") loadUser();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userUpdated", loadUser);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userUpdated", loadUser);
    };
  }, [user]);

  /* ==============================
     LOGOUT
  ============================== */
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "A";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-800 bg-black/60 backdrop-blur sticky top-0 z-40"
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-900 transition"
        >
          <FiMenu className="w-6 h-6 text-orange-400" />
        </button>

        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
          Admin
        </h1>
        <span className="hidden sm:block text-gray-500 text-sm">dashboard</span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-3 rounded-full hover:bg-orange-500/10 transition">
          <FiBell className="w-6 h-6 text-gray-300 hover:text-orange-400" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
        </button>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-3 px-4 py-2 rounded-full hover:bg-gray-900 transition"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-black font-bold">
              {getInitials(adminName)}
            </div>

            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-semibold text-white">
                {adminName}
              </span>
              {adminEmail && (
                <span className="text-xs text-gray-400 truncate max-w-[160px]">
                  {adminEmail}
                </span>
              )}
            </div>

            <FiChevronDown className="hidden md:block text-gray-400" />
          </button>

          {/* Dropdown */}
          {showProfile && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 mt-2 w-56 bg-[#111] border border-gray-800 rounded-xl shadow-xl z-50"
            >
              <div className="p-4 border-b border-gray-800">
                <p className="text-sm font-semibold text-white">{adminName}</p>
                {adminEmail && (
                  <p className="text-xs text-gray-400 truncate">{adminEmail}</p>
                )}
              </div>

              <div className="p-2">
                <button
                  onClick={() => {
                    setShowProfile(false);
                    navigate("/admin/settings");
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-orange-500/20 hover:text-orange-400 rounded-lg"
                >
                  ⚙️ Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/20 rounded-lg flex items-center gap-2"
                >
                  <FiLogOut />
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
