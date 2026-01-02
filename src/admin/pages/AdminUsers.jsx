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
    fetchAdminUsers()
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  /* ================= FILTER ================= */
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= MODAL ================= */
  const openAdd = () => {
    setEditUser(null);
    setForm({ name: "", email: "", role: "Staff", status: "Active" });
    setError("");
    setModalOpen(true);
  };

  const openEdit = (u) => {
    setEditUser(u);
    setForm(u);
    setError("");
    setModalOpen(true);
  };

  /* ================= SAVE ================= */
  const submit = async () => {
    if (!form.name || !form.email) {
      setError("Name & Email are required");
      return;
    }

    try {
      setSaving(true);
      if (editUser) {
        const updated = await updateAdminUser(editUser._id, form);
        setUsers(users.map((u) => (u._id === updated._id ? updated : u)));
      } else {
        const created = await addAdminUser(form);
        setUsers([created, ...users]);
      }
      setModalOpen(false);
    } catch (e) {
      setError(e.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  /* ================= DELETE ================= */
  const remove = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;
    await deleteAdminUserApi(id);
    setUsers(users.filter((u) => u._id !== id));
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Admin Users</h1>
          <p className="text-gray-400 mt-1">
            Manage staff access & permissions
          </p>
        </div>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-6 py-3 rounded-full
          bg-orange-500 hover:bg-orange-600 text-black font-semibold transition"
        >
          <FiUserPlus /> Add User
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative max-w-sm">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/40
          border border-white/10 focus:border-orange-500 outline-none"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-10 text-center text-gray-400">
            Loading users...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-10 text-center text-gray-400">
            No users found
          </div>
        ) : (
          filteredUsers.map((u) => (
            <div
              key={u._id}
              className="grid grid-cols-[1.5fr_1fr_1fr_120px]
              gap-4 items-center px-6 py-5 border-b border-white/10
              hover:bg-white/5 transition"
            >
              {/* USER */}
              <div>
                <p className="font-semibold">{u.name}</p>
                <p className="text-sm text-gray-400">{u.email}</p>
              </div>

              {/* ROLE */}
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 text-xs
                rounded-full w-fit ${
                  u.role === "Admin"
                    ? "bg-red-500/10 text-red-400"
                    : u.role === "Manager"
                    ? "bg-purple-500/10 text-purple-400"
                    : "bg-orange-500/10 text-orange-400"
                }`}
              >
                <FiShield size={12} /> {u.role}
              </span>

              {/* STATUS */}
              <span
                className={`text-sm font-medium ${
                  u.status === "Active"
                    ? "text-green-400"
                    : "text-gray-500"
                }`}
              >
                ● {u.status}
              </span>

              {/* ACTIONS */}
              <div className="flex items-center gap-4">
                <FiEdit
                  onClick={() => openEdit(u)}
                  className="cursor-pointer text-orange-400 hover:scale-110 transition"
                />
                <FiTrash2
                  onClick={() => remove(u._id)}
                  className="cursor-pointer text-red-400 hover:scale-110 transition"
                />
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
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur
            flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-md bg-[#0f0f0f]
              border border-white/10 rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex justify-between mb-6">
                <h3 className="text-2xl font-bold">
                  {editUser ? "Edit User" : "Add User"}
                </h3>
                <FiX
                  className="cursor-pointer text-gray-400 hover:text-white"
                  onClick={() => setModalOpen(false)}
                />
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl text-sm
                bg-red-500/10 text-red-400 border border-red-500/30">
                  {error}
                </div>
              )}

              <Input
                placeholder="Full Name"
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
              />
              <Input
                placeholder="Email Address"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
              />

              <Select
                value={form.role}
                onChange={(v) => setForm({ ...form, role: v })}
                options={["Admin", "Manager", "Staff"]}
              />
              <Select
                value={form.status}
                onChange={(v) => setForm({ ...form, status: v })}
                options={["Active", "Inactive"]}
              />

              <button
                onClick={submit}
                disabled={saving}
                className="mt-6 w-full py-3 rounded-full
                bg-orange-500 hover:bg-orange-600 text-black
                font-semibold transition"
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

/* ================= UI HELPERS ================= */

const Input = ({ value, onChange, placeholder }) => (
  <input
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value)}
    className="w-full mb-3 px-4 py-3 rounded-xl
    bg-black/40 border border-white/10
    focus:border-orange-500 outline-none"
  />
);

const Select = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full mb-3 px-4 py-3 rounded-xl
    bg-black/40 border border-white/10
    focus:border-orange-500 outline-none"
  >
    {options.map((o) => (
      <option key={o}>{o}</option>
    ))}
  </select>
);
