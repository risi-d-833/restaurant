// src/components/admin/AdminUsers.jsx
import React, { useEffect, useState } from "react";
import {
  FiSearch,
  FiUserPlus,
  FiEdit,
  FiTrash2,
  FiX,
  FiShield,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchAdminUsers,
  addAdminUser,
  updateAdminUser,
  deleteAdminUserApi,
} from "../../services/api";

export default function AdminUsers() {
  /* ================= STATE ================= */
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Staff",
    status: "Active",
  });

  /* ================= LOAD USERS ================= */
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchAdminUsers();
        setUsers(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  /* ================= FILTER ================= */
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= MODAL HANDLERS ================= */
  const openAdd = () => {
    setEditUser(null);
    setForm({ name: "", email: "", role: "Staff", status: "Active" });
    setError("");
    setModalOpen(true);
  };

  const openEdit = (user) => {
    setEditUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setError("");
    setModalOpen(true);
  };

  /* ================= SUBMIT ================= */
  const submit = async () => {
    if (!form.name.trim() || !form.email.trim()) {
      setError("Name and Email are required");
      return;
    }

    try {
      setSaving(true);
      setError("");

      if (editUser) {
        const updated = await updateAdminUser(editUser._id, form);
        setUsers(users.map((u) => (u._id === updated._id ? updated : u)));
      } else {
        const created = await addAdminUser(form);
        setUsers([created, ...users]);
      }

      setModalOpen(false);
    } catch (err) {
      setError(err.message || "Failed to save user");
    } finally {
      setSaving(false);
    }
  };

  /* ================= DELETE ================= */
  const remove = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;

    try {
      await deleteAdminUserApi(id);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold text-white">Admin Users</h2>
          <p className="text-gray-400">Manage staff roles & access</p>
        </div>

        <button
          onClick={openAdd}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500
          rounded-full text-black font-semibold flex items-center gap-2"
        >
          <FiUserPlus /> Add User
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative w-64">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-12 pr-4 py-3 bg-[#111] border border-gray-800
          rounded-xl w-full focus:border-orange-500 outline-none"
        />
      </div>

      {/* LIST */}
      <div className="bg-[#111] rounded-2xl border border-gray-800 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400">Loading users...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-10 text-center text-gray-400">No users found</div>
        ) : (
          filteredUsers.map((u) => (
            <div
              key={u._id}
              className="flex justify-between items-center px-6 py-4
              border-b border-gray-800 hover:bg-white/5 transition"
            >
              <div>
                <p className="font-semibold text-white">{u.name}</p>
                <p className="text-gray-400 text-sm">{u.email}</p>
                <span className="inline-flex items-center gap-1 mt-1
                  text-xs px-3 py-1 rounded-full bg-orange-500/10 text-orange-400">
                  <FiShield size={12} /> {u.role}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`text-sm ${
                    u.status === "Active"
                      ? "text-green-400"
                      : "text-gray-500"
                  }`}
                >
                  ● {u.status}
                </span>

                <button onClick={() => openEdit(u)}>
                  <FiEdit className="text-orange-400 hover:scale-110 transition" />
                </button>
                <button onClick={() => remove(u._id)}>
                  <FiTrash2 className="text-red-400 hover:scale-110 transition" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur
            flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-[#111] p-8 rounded-2xl w-full max-w-md
              border border-gray-800 shadow-2xl"
            >
              <div className="flex justify-between mb-6">
                <h3 className="text-2xl font-bold">
                  {editUser ? "Edit User" : "Add User"}
                </h3>
                <FiX
                  className="cursor-pointer"
                  onClick={() => setModalOpen(false)}
                />
              </div>

              {error && (
                <div className="mb-4 text-red-400 bg-red-500/10
                border border-red-500/30 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <input
                placeholder="Full Name"
                className="input mb-3"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                placeholder="Email Address"
                className="input mb-3"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <select
                className="input mb-3"
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
              </select>

              <select
                className="input"
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <button
                onClick={submit}
                disabled={saving}
                className="mt-6 w-full py-3 rounded-full font-semibold
                bg-gradient-to-r from-orange-500 to-pink-500 text-black
                hover:shadow-xl transition disabled:opacity-70"
              >
                {saving ? "Saving..." : "Save User"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
