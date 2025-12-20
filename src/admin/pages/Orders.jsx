// src/components/admin/Orders.jsx (Modern & Enhanced Version)
import React from "react";
import { FiSearch, FiFilter, FiEye, FiTruck } from "react-icons/fi";
import { motion } from "framer-motion";

// Mock Orders Data (Replace with real data later)
const orders = [
  { id: "#1023", customer: "Rishabh Sharma", amount: 450, status: "Preparing", date: "Today, 2:30 PM" },
  { id: "#1022", customer: "Priya Singh", amount: 680, status: "Delivered", date: "Today, 1:15 PM" },
  { id: "#1021", customer: "Amit Patel", amount: 320, status: "Out for Delivery", date: "Today, 12:45 PM" },
  { id: "#1020", customer: "Neha Gupta", amount: 890, status: "Completed", date: "Yesterday, 6:20 PM" },
  { id: "#1019", customer: "Vikram Rao", amount: 210, status: "Cancelled", date: "Yesterday, 4:10 PM" },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
    case "Completed":
      return "text-green-400 bg-green-500/10";
    case "Preparing":
      return "text-orange-400 bg-orange-500/10";
    case "Out for Delivery":
      return "text-blue-400 bg-blue-500/10";
    case "Cancelled":
      return "text-red-400 bg-red-500/10";
    default:
      return "text-gray-400 bg-gray-500/10";
  }
};

export default function Orders() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold text-white">Orders</h2>
          <p className="text-gray-400 mt-2">Manage and track all customer orders</p>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-4">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-12 pr-6 py-3 bg-[#111] border border-gray-800 rounded-xl focus:border-orange-500 outline-none transition w-full sm:w-64"
            />
          </div>
          <button className="p-3 bg-[#111] border border-gray-800 rounded-xl hover:border-orange-500 transition">
            <FiFilter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#111] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/50">
              <tr>
                <th className="px-6 py-5 text-left text-sm font-semibold text-gray-300">Order ID</th>
                <th className="px-6 py-5 text-left text-sm font-semibold text-gray-300">Customer</th>
                <th className="px-6 py-5 text-left text-sm font-semibold text-gray-300">Date & Time</th>
                <th className="px-6 py-5 text-left text-sm font-semibold text-gray-300">Amount</th>
                <th className="px-6 py-5 text-left text-sm font-semibold text-gray-300">Status</th>
                <th className="px-6 py-5 text-left text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-t border-gray-800 hover:bg-white/5 transition"
                >
                  <td className="px-6 py-5 font-medium">{order.id}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold">
                        {order.customer[0]}
                      </div>
                      <span>{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-gray-400">{order.date}</td>
                  <td className="px-6 py-5 font-semibold text-xl">₹{order.amount}</td>
                  <td className="px-6 py-5">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <button className="p-2 rounded-lg hover:shadow-lg hover:shadow-orange-500/20 transition">
                        <FiEye className="w-5 h-5 text-orange-400" />
                      </button>
                      {order.status === "Preparing" && (
                        <button className="p-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition">
                          <FiTruck className="w-5 h-5 text-blue-400" />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination (Optional) */}
        <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
          <p className="text-gray-400 text-sm">Showing 1-5 of 48 orders</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#0a0a0a] rounded-lg hover:shadow-lg transition">Prev</button>
            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-black rounded-lg hover:shadow-xl transition">Next</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}