// src/admin/components/MobileSidebar.jsx (Mobile Navigation)
import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdShoppingCart,
  MdMenuBook,
  MdPeople,
  MdSettings,
  MdClose,
} from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/admin", icon: MdDashboard, label: "Dashboard" },
  { to: "/admin/orders", icon: MdShoppingCart, label: "Orders" },
  { to: "/admin/products", icon: MdMenuBook, label: "Menu" },
  { to: "/admin/users", icon: MdPeople, label: "Users" },
  { to: "/admin/settings", icon: MdSettings, label: "Settings" },
];

export default function MobileSidebar({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-0 bottom-0 w-80 bg-[#0a0a0a] border-r border-gray-800 shadow-2xl z-50 flex flex-col overflow-y-auto"
          >
            {/* Close Button */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                Village CHEF
              </h1>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-900 rounded-lg transition-all"
                aria-label="Close menu"
              >
                <MdClose className="w-6 h-6 text-gray-400 hover:text-white" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {links.map(({ to, icon: Icon, label }, index) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.3 }}
                >
                  <NavLink
                    to={to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-6 py-4 rounded-xl text-lg font-medium transition-all duration-300 group
                      ${
                        isActive
                          ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/30"
                          : "text-gray-400 hover:bg-gray-900/50 hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className="w-6 h-6 flex-shrink-0 transition-all group-hover:scale-110" />
                        <span className="flex-1">{label}</span>
                        {isActive ? (
                          <span className="w-1.5 h-8 bg-white rounded-l-full" />
                        ) : null}
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-gray-800">
              <p className="text-gray-500 text-xs text-center">
                © 2025 Village CHEF<br />
                All rights reserved
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
