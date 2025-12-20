// src/components/Sidebar.jsx (Modern & Enhanced Version)
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiShoppingBag,
  FiCoffee,
  FiUsers,
  FiSettings,
} from "react-icons/fi";
import { motion } from "framer-motion";

const links = [
  { to: "/admin", icon: FiHome, label: "Dashboard" },
  { to: "/admin/orders", icon: FiShoppingBag, label: "Orders" },
  { to: "/admin/products", icon: FiCoffee, label: "Menu" },
  { to: "/admin/users", icon: FiUsers, label: "Users" },
  { to: "/admin/settings", icon: FiSettings, label: "Settings" },
];

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className="hidden md:flex flex-col w-72 bg-[#0a0a0a] border-r border-gray-800 shadow-2xl"
    >
      {/* Logo / Brand */}
      <div className="p-8 border-b border-gray-800">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
          Village CHEF
        </h1>
        <p className="text-gray-500 text-sm mt-2">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-3">
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
                `flex items-center gap-4 px-6 py-4 rounded-2xl text-lg font-medium transition-all duration-300 group
                ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-black shadow-xl shadow-orange-500/30"
                    : "text-gray-400 hover:bg-gray-900 hover:text-white"
                }`
              }
            >
                {({ isActive }) => (
                  <>
                    <Icon className="w-6 h-6 transition-all group-hover:scale-110" />
                    <span>{label}</span>
                    {isActive ? (
                      <span className="ml-auto w-2 h-10 bg-black rounded-l-full" />
                    ) : null}
                  </>
                )}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Footer Info */}
      <div className="p-6 border-t border-gray-800">
        <p className="text-gray-500 text-xs text-center">
          © 2025 Village CHEF<br />
          All rights reserved
        </p>
      </div>
    </motion.aside>
  );
}