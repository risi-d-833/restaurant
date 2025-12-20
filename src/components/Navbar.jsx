// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  FiSearch,
  FiShoppingCart,
  FiLogIn,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { NavLink, Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  // close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // close menu on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Menu", to: "/menu" },
    // { label: "Admin", to: "/admin" },
    { label: "Contact", to: "/contact" },
  ];

  const getNavLinkClass = ({ isActive }) =>
    `relative py-2 px-1 inline-block ${
      isActive ? "text-yellow-300" : "text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#080808] to-[#161616] border-b border-white/10">
      <div
        ref={wrapperRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="h-16 flex items-center justify-between">
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-3 hover:scale-105 transition"
          >
            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black">
              V
            </div>
            <div>
              <p className="text-yellow-400 font-semibold leading-none">
                Village
              </p>
              <p className="text-white font-bold text-sm leading-none">
                CHEF
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={getNavLinkClass}
              >
                {item.label}
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-400 group-hover:w-full transition-all" />
              </NavLink>
            ))}
          </nav>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              onClick={() => navigate("/search")}
              className="p-2 rounded-full text-white hover:scale-110 transition"
              aria-label="Search"
            >
              <FiSearch className="text-xl" />
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate("/cart")}
              className="p-2 rounded-full text-white hover:scale-110 transition"
              aria-label="Cart"
            >
              <FiShoppingCart className="text-xl" />
            </button>

            {/* Login */}
            <Link
              to="/login"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400 text-black font-semibold hover:scale-105 transition"
            >
              <FiLogIn />
              Login
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-md text-white"
            >
              {open ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden bg-[#0b0b0b] transition-all overflow-hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md ${
                  isActive ? "text-yellow-300" : "text-white"
                } hover:bg-white/5`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <div className="pt-3 border-t border-white/10 flex gap-3">
            <Link
              to="/cart"
              onClick={() => setOpen(false)}
              className="p-2 rounded-full text-white hover:scale-110"
            >
              <FiShoppingCart size={20} />
            </Link>

            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="ml-auto px-4 py-2 rounded-full bg-yellow-400 text-black font-semibold"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
