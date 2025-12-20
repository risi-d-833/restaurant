import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero.jpg"; // replace with your image
import { FiX } from "react-icons/fi";
import ReservationForm from "./ReservationForm";

export default function Hero() {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  // close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // close when clicking outside modal content
  const onBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) setOpen(false);
  };

  return (
    <>
      <section className="relative w-full h-[75vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center brightness-50"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-light italic tracking-wide">
            Exotic and Delicious
          </h1>

          <p className="mt-4 text-gray-200 text-base md:text-lg max-w-2xl mx-auto">
            Experience handcrafted flavors in a beautiful ambience.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button onClick={() => navigate("/menu")} className="px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
              View Menu
            </button>

            {/* Book Table opens modal */}
            <button
              onClick={() => setOpen(true)}
              className="px-6 py-3 border border-white text-white rounded-full hover:bg-white/10 transition"
            >
              Book Table
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {open && (
        <div
          onMouseDown={onBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          aria-modal="true"
          role="dialog"
          aria-labelledby="reservation-modal-title"
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-3xl mx-auto"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close reservation"
              className="absolute -top-4 -right-4 bg-white/10 text-white rounded-full p-2 hover:bg-white/20 transition"
            >
              <FiX />
            </button>

            {/* Modal content (ReservationForm) */}
            <ReservationForm onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
