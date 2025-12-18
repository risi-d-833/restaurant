import React, { useState, useEffect } from "react";
import { FiCalendar, FiClock, FiUser, FiUsers } from "react-icons/fi";
import { createReservation } from "../services/api.js";

export default function ReservationForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    persons: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const todayISO = new Date().toISOString().slice(0, 10);

  /* =========================
     WATCH FORM (DEBUG)
  ========================= */
  useEffect(() => {
    console.log("FORM STATE:", form);
  }, [form]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.persons || Number(form.persons) < 1)
      e.persons = "Enter number of persons (1 or more).";
    if (!form.date) e.date = "Please choose a date.";
    else if (form.date < todayISO) e.date = "Date cannot be in the past.";
    if (!form.time) e.time = "Please choose a time.";
    return e;
  };

  const handleChange = (key) => (ev) => {
    setForm((s) => ({ ...s, [key]: ev.target.value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    try {
      setLoading(true);

      console.log("SENDING TO API:", form); // ✅ watch payload

      await createReservation(form);

      setSubmitted(true);
      setTimeout(() => {
        setForm({ name: "", persons: 2, date: "", time: "" });
        setSubmitted(false);
        onClose?.();
      }, 1200);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-black/90 backdrop-blur-md rounded-md p-6 text-gray-100 shadow-xl">
      <h3 className="text-xl font-medium mb-2">Reserve Your Table</h3>
      <p className="text-sm text-orange-300 mb-4">
        Book a table in advance to enjoy your time
      </p>

      <form onSubmit={handleSubmit} className="grid gap-3">

        {/* Name */}
        <label>
          <div className="mb-1 text-gray-300">Your Name</div>
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-orange-400" />
            <input
              value={form.name}
              onChange={handleChange("name")}
              className="w-full pl-12 py-3 bg-transparent border border-gray-600 rounded-sm text-white focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </label>

        {/* Persons & Time */}
        <div className="grid grid-cols-2 gap-3">
          <label>
            <div className="mb-1 text-gray-300">Persons</div>
            <div className="relative">
              <FiUsers className="absolute left-3 top-3 text-orange-400" />
              <input
                type="number"
                min="1"
                value={form.persons}
                onChange={handleChange("persons")}
                className="w-full pl-12 py-3 bg-transparent border border-gray-600 text-white"
              />
            </div>
          </label>

          <label>
            <div className="mb-1 text-gray-300">Time</div>
            <div className="relative">
              <FiClock className="absolute left-3 top-3 text-orange-400" />
              <input
                type="time"
                value={form.time}
                onChange={handleChange("time")}
                className="w-full pl-12 py-3 bg-transparent border border-gray-600 text-white"
              />
            </div>
          </label>
        </div>

        {/* Date */}
        <label>
          <div className="mb-1 text-gray-300">Date</div>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-3 text-orange-400" />
            <input
              type="date"
              min={todayISO}
              value={form.date}
              onChange={handleChange("date")}
              className="w-full pl-12 py-3 bg-transparent border border-gray-600 text-white"
            />
          </div>
        </label>

        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          <button
            disabled={loading}
            className="flex-1 bg-orange-500 text-black py-2 rounded-full"
          >
            {loading ? "Booking..." : "Confirm Reservation"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 border border-gray-600 rounded-full"
          >
            Cancel
          </button>
        </div>

        {submitted && (
          <div className="mt-3 bg-emerald-700 p-2 rounded text-sm">
            Reservation confirmed ✔
          </div>
        )}
      </form>
    </div>
  );
}
