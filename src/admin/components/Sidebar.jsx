// src/admin/components/Sidebar.jsx (Fully Responsive & Icon Enhanced)
import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdShoppingCart,
  MdMenuBook,
  MdPeople,
  MdSettings,
} from "react-icons/md";
import { motion } from "framer-motion";

const links = [
  { to: "/admin", icon: MdDashboard, label: "Dashboard" },
  { to: "/admin/orders", icon: MdShoppingCart, label: "Orders" },
  { to: "/admin/products", icon: MdMenuBook, label: "Menu" },
  { to: "/admin/users", icon: MdPeople, label: "Users" },
  { to: "/admin/settings", icon: MdSettings, label: "Settings" },
];

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className="hidden lg:flex flex-col w-64 xl:w-72 bg-[#0a0a0a] border-r border-gray-800 shadow-2xl sticky top-0 h-screen"
    >
      {/* Logo / Brand */}
      <div className="p-6 xl:p-8 border-b border-gray-800">
        <h1 className="text-2xl xl:text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent truncate">
          Village CHEF
        </h1>
        <p className="text-gray-500 text-xs xl:text-sm mt-2">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 xl:p-6 space-y-2 overflow-y-auto">
        {links.map(({ to, icon: Icon, label }, index) => (
          <motion.div
            key={to}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <NavLink
              to={to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 xl:gap-4 px-4 xl:px-6 py-3 xl:py-4 rounded-xl xl:rounded-2xl text-base xl:text-lg font-medium transition-all duration-300 group relative
                ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-xl shadow-orange-500/30"
                    : "text-gray-400 hover:bg-gray-900/50 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-5 h-5 xl:w-6 xl:h-6 flex-shrink-0 transition-all group-hover:scale-110" />
                  <span className="flex-1 truncate">{label}</span>
                  {isActive ? (
                    <span className="w-1.5 h-8 bg-white rounded-l-full absolute right-0" />
                  ) : null}
                </>
              )}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Footer Info */}
      <div className="p-4 xl:p-6 border-t border-gray-800">
        <p className="text-gray-500 text-xs text-center">
          © 2025 Village CHEF<br />
          All rights reserved
        </p>
      </div>
    </motion.aside>
  );
}