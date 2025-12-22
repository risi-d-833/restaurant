// src/admin/pages/Dashboard.jsx (Fully Responsive & Icon Enhanced)
import React from "react";
import { FiTrendingUp, FiDollarSign, FiUsers, FiPackage } from "react-icons/fi";
import { MdDashboard, MdTrendingUp } from "react-icons/md";
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon: Icon, trend }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative bg-gradient-to-br from-[#111] to-black border border-gray-800 rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 overflow-hidden shadow-lg hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-2"
    >
      {/* Subtle Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex items-center justify-between mb-4 sm:mb-6">
        <div className="p-2.5 sm:p-4 bg-orange-500/10 rounded-lg sm:rounded-2xl group-hover:bg-orange-500/20 transition-colors">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-orange-400" />
        </div>
        {trend && (
          <div className="flex items-center gap-1.5 sm:gap-2 text-green-400 text-xs sm:text-sm font-semibold">
            <MdTrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
            {trend}
          </div>
        )}
      </div>

      <div className="relative z-10">
        <h3 className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider mb-1 sm:mb-2">
          {title}
        </h3>
        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white truncate">
          {value}
        </p>
      </div>
    </motion.div>
  );
};

export default function Dashboard() {
  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-3">
          Dashboard Overview
        </h2>
        <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
          Welcome back! Here's what's happening with your cafe today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        <StatCard
          title="Total Orders"
          value="1,240"
          icon={FiPackage}
          trend="+12.5%"
        />
        <StatCard
          title="Revenue"
          value="₹2.4L"
          icon={FiDollarSign}
          trend="+8.3%"
        />
        <StatCard
          title="Customers"
          value="540"
          icon={FiUsers}
          trend="+5.2%"
        />
        <StatCard
          title="Menu Items"
          value="38"
          icon={MdDashboard}
        />
      </div>

      {/* Additional Section - Responsive Charts Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
      >
        {/* Sales Chart Placeholder */}
        <div className="bg-gradient-to-br from-[#111] to-black border border-gray-800 rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Recent Sales</h3>
          <div className="h-48 sm:h-56 lg:h-64 bg-black/50 rounded-lg flex items-center justify-center text-gray-500">
            <p className="text-sm sm:text-base">Chart Placeholder</p>
          </div>
        </div>

        {/* Activity Placeholder */}
        <div className="bg-gradient-to-br from-[#111] to-black border border-gray-800 rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3 sm:space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-black/50 rounded-lg"
              >
                <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-gray-300 truncate">Activity item {item}</p>
                  <p className="text-xs text-gray-500">Just now</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}