// src/components/admin/Users.jsx (Modern & Enhanced Version)
import React, { useState } from "react";
import { FiSearch, FiUserPlus, FiEdit, FiTrash2, FiShield } from "react-icons/fi";
import { motion } from "framer-motion";

// Mock Users Data (Replace with real data later)
const initialUsers = [
  { id: 1, name: "Admin", email: "admin@chef.com", role: "Admin", avatar: "A", status: "Active" },
  { id: 2, name: "Rishabh Sharma", email: "rishabh@chef.com", role: "Manager", avatar: "R", status: "Active" },
  { id: 3, name: "Priya Singh", email: "priya@chef.com", role: "Staff", avatar: "P", status: "Active" },
  { id: 4, name: "Amit Patel", email: "amit@chef.com", role: "Staff", avatar: "A", status: "Inactive" },
  { id: 5, name: "Neha Gupta", email: "neha@chef.com", role: "Manager", avatar: "N", status: "Active" },
];

const getRoleColor = (role) => {
  switch (role) {
    case "Admin":
      return "text-red-400 bg-red-500/10";
    case "Manager":
      return "text-orange-400 bg-orange-500/10";
    case "Staff":
      return "text-blue-400 bg-blue-500/10";
    default:
      return "text-gray-400 bg-gray-500/10";
  }
};

const getStatusColor = (status) => {
  return status === "Active" ? "text-green-400" : "text-gray-500";
};

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");

  // Filter users by search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Delete user
  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Users</h2>
          <p className="text-gray-400 mt-2">Manage staff accounts and permissions</p>
        </div>

        <div className="flex gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-6 py-3 bg-[#111] border border-gray-800 rounded-xl focus:border-orange-500 outline-none transition w-full sm:w-64"
            />
          </div>

          {/* Add User Button */}
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-black rounded-full hover:shadow-xl transition">
            <FiUserPlus className="w-5 h-5" />
            Add User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#111] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-black/50">
              <tr>
                <th className="px-6 py-5 text-left text-sm font-semibold text-gray-300">User</th>
                <th className="px-6 py-5 text-left text-sm font-semibold text-gray-300">Email</th>
                <th className="px-6 py-5 text-left text-sm font-semibold text-gray-300">Role</th>
                <th className="px-6 py-5 text-left text-sm font-semibold text-gray-300">Status</th>
                <th className="px-6 py-5 text-left text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-t border-gray-800 hover:bg-white/5 transition"
                >
                  {/* User Name + Avatar */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {user.avatar}
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-5 text-gray-300">{user.email}</td>

                  {/* Role Badge */}
                  <td className="px-6 py-5">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 w-fit ${getRoleColor(user.role)}`}>
                      <FiShield className="w-4 h-4" />
                      {user.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span className={`font-medium ${getStatusColor(user.status)}`}>
                      ● {user.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <button className="p-2 rounded-lg hover:shadow-lg hover:shadow-orange-500/20 transition">
                        <FiEdit className="w-5 h-5 text-orange-400" />
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        className="p-2 rounded-lg hover:bg-red-500/20 transition"
                      >
                        <FiTrash2 className="w-5 h-5 text-red-400" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No users found</p>
            <button className="mt-6 px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-black rounded-full hover:shadow-xl transition">
              Add New User
            </button>
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
          <p className="text-gray-400 text-sm">Showing 1-5 of 12 users</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#0a0a0a] rounded-lg hover:shadow-lg transition">Prev</button>
            <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-black rounded-lg hover:shadow-xl transition">Next</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}