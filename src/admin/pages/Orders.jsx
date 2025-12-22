// src/admin/pages/Orders.jsx (Fully Responsive & Icon Enhanced)
import React, { useState } from "react";
import { FiSearch, FiFilter, FiEye, FiTruck } from "react-icons/fi";
import { motion } from "framer-motion";

// Mock Orders Data
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

const OrderRow = ({ order, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-[#111] border border-gray-800 rounded-lg p-4 sm:p-6 mb-4 hover:shadow-lg hover:shadow-orange-500/10 transition"
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
      {/* Order ID */}
      <div className="flex flex-col sm:col-span-1">
        <p className="text-xs sm:text-sm text-gray-500 mb-1">Order ID</p>
        <p className="text-sm sm:text-base font-bold text-white">{order.id}</p>
      </div>

      {/* Customer */}
      <div className="flex flex-col sm:col-span-1 lg:col-span-2">
        <p className="text-xs sm:text-sm text-gray-500 mb-1">Customer</p>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
            {order.customer[0]}
          </div>
          <span className="text-sm sm:text-base text-white truncate">{order.customer}</span>
        </div>
      </div>

      {/* Date & Time */}
      <div className="flex flex-col sm:col-span-1">
        <p className="text-xs sm:text-sm text-gray-500 mb-1">Date</p>
        <p className="text-xs sm:text-sm text-gray-400">{order.date}</p>
      </div>

      {/* Amount */}
      <div className="flex flex-col sm:col-span-1">
        <p className="text-xs sm:text-sm text-gray-500 mb-1">Amount</p>
        <p className="text-sm sm:text-lg font-bold text-white">₹{order.amount}</p>
      </div>

      {/* Status */}
      <div className="flex flex-col sm:col-span-1">
        <p className="text-xs sm:text-sm text-gray-500 mb-1">Status</p>
        <span className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-medium w-fit ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-end gap-2 sm:col-span-1 lg:col-span-1">
        <button
          className="flex-1 sm:flex-none p-2 rounded-lg hover:shadow-lg hover:shadow-orange-500/20 transition"
          title="View Order"
        >
          <FiEye className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 mx-auto" />
        </button>
        {order.status === "Preparing" && (
          <button
            className="flex-1 sm:flex-none p-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/20 transition"
            title="Dispatch Order"
          >
            <FiTruck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mx-auto" />
          </button>
        )}
      </div>
    </div>
  </motion.div>
);

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.includes(searchTerm)
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-6 sm:space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Orders</h2>
          <p className="text-gray-400 text-sm sm:text-base mt-1 sm:mt-2">
            Manage and track all customer orders
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2 sm:gap-4">
          <div className="relative flex-1 sm:flex-none">
            <FiSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 sm:pl-12 pr-4 py-2 sm:py-3 bg-[#111] border border-gray-800 rounded-lg sm:rounded-xl focus:border-orange-500 outline-none transition text-sm sm:text-base"
            />
          </div>
          <button className="p-2 sm:p-3 bg-[#111] border border-gray-800 rounded-lg sm:rounded-xl hover:border-orange-500 transition">
            <FiFilter className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Orders List - Desktop Table View */}
      <div className="hidden lg:block bg-[#111] rounded-xl lg:rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-300">Order ID</th>
                <th className="px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-300">Customer</th>
                <th className="px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-300">Date & Time</th>
                <th className="px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-300">Amount</th>
                <th className="px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-300">Status</th>
                <th className="px-6 py-4 text-left text-xs sm:text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-t border-gray-800 hover:bg-white/5 transition"
                >
                  <td className="px-6 py-5 font-medium text-sm sm:text-base">{order.id}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                        {order.customer[0]}
                      </div>
                      <span className="text-sm sm:text-base">{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-gray-400 text-xs sm:text-sm">{order.date}</td>
                  <td className="px-6 py-5 font-semibold text-sm sm:text-lg">₹{order.amount}</td>
                  <td className="px-6 py-5">
                    <span className={`inline-block px-3 py-2 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(order.status)}`}>
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

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-gray-400 text-sm">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#0a0a0a] rounded-lg hover:shadow-lg transition text-sm">
              Prev
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-black rounded-lg hover:shadow-xl transition text-sm font-medium">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order, index) => (
            <OrderRow key={order.id} order={order} index={index} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">No orders found</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}