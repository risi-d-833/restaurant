// src/App.jsx (Updated & Best Version - Clean, Modern, Protected Admin Routes)
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import ShakesCarousel from "./components/ShakesCarousel";
import ShakeDetails from "./components/ShakeDetails";
import CoffeeCarousel from "./components/CoffeeCarousel";

// Admin Routes (Protected inside AdminRoutes.jsx)
import AdminRoutes from "./admin/routes/AdminRoutes";

export default function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a1208] to-[#3b240f] text-gray-100 flex flex-col">
      {/* Navbar & Footer sirf public pages pe dikhao */}
      {!isAdminPath && <Navbar />}

      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shakes" element={<ShakesCarousel />} />
          <Route path="/coffee" element={<CoffeeCarousel />} />
          <Route path="/shake/:id" element={<ShakeDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Auth />} />

          {/* Admin Routes - Protected inside AdminRoutes component */}
          <Route path="/admin/*" element={<AdminRoutes />} />

          {/* 404 - Home pe redirect */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Footer sirf public pages pe dikhao */}
      {!isAdminPath && <Footer />}
    </div>
  );
}