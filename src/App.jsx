// src/App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import ShakesCarousel from "./components/ShakesCarousel";
import ShakeDetails from "./components/ShakeDetails";
import AdminRoutes from "./admin/routes/AdminRoutes";
import CoffeeCarousel from "./components/CoffeeCarousel";

export default function App() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      {!isAdminPath && <Navbar />}

      <main>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/shakes" element={<ShakesCarousel />} />
          <Route path="/coffee" element={<CoffeeCarousel />} />
          <Route path="/shake/:id" element={<ShakeDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />

          {/* ADMIN ROUTES */}
        </Routes>

        {/* ADMIN ROUTES (handled by its own Routes inside AdminRoutes) */}
        <AdminRoutes />
      </main>

      {!isAdminPath && <Footer />}
    </div>
  );
}
