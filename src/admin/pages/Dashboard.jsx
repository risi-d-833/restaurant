// src/components/Dashboard.jsx (Modern & Enhanced Version)
import React from "react";
import { FiTrendingUp, FiDollarSign, FiUsers, FiPackage } from "react-icons/fi";
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon, trend }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative bg-gradient-to-br from-[#111] to-black border border-gray-800 rounded-2xl p-6 overflow-hidden shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-2"
    >
      {/* Subtle Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="p-4 bg-orange-500/10 rounded-2xl group-hover:bg-orange-500/20 transition-colors">
          {React.cloneElement(icon, { className: "w-8 h-8 text-orange-400" })}
        </div>
        {trend && (
          <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
            <FiTrendingUp className="w-5 h-5" />
            {trend}
          </div>
        )}
      </div>

      <div className="relative z-10">
        <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-2">{title}</h3>
        <p className="text-4xl font-bold text-white">{value}</p>
      </div>
    </motion.div>
  );
};

export default function Dashboard() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Dashboard Overview</h2>
        <p className="text-gray-400 text-lg">Welcome back! Here's what's happening with your cafe today.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          title="Total Orders"
          value="1,240"
          icon={<FiPackage />}
          trend="+12.5%"
        />
        <StatCard
          title="Revenue"
          value="₹2,45,000"
          icon={<FiDollarSign />}
          trend="+8.3%"
        />
        <StatCard
          title="Customers"
          value="540"
          icon={<FiUsers />}
          trend="+5.2%"
        />
        <StatCard
          title="Menu Items"
          value="38"
          icon={<FiPackage />}
        />
      </div>
    </div>
  );
}