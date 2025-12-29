// src/admin/routes/AdminRoutes.jsx (Fixed & Working)
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../components/AdminLayout";

// Admin Pages
import Products from "../pages/Products";
import Orders from "../pages/Orders";
import Settings from "../pages/Settings";
import Users from "../pages/AdminUsers";

// Fixed: Import Dashboard properly (assuming your page file is named Overview.jsx)
import Dashboard from "../pages/Dashboard"; // ← Yeh sahi import hai

// Protected Route for Admin
const ProtectedAdmin = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedAdmin>
            <AdminLayout />
          </ProtectedAdmin>
        }
      >
        {/* Default page jab /admin pe jaye */}
        <Route index element={<Dashboard />} />

        {/* Baki pages */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="settings" element={<Settings />} />
        <Route path="users" element={<Users />} />

        {/* Galat admin path pe dashboard pe bhej do */}
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
