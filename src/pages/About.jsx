import React, { useState } from "react";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { sendContactMessage } from "../services/contactApi";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await sendContactMessage(form);

      setSuccess("Message sent successfully ✔");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen px-6 py-16 bg-gradient-to-br from-black via-[#1a1208] to-[#3b240f] text-gray-100 overflow-hidden">

      {/* Title */}
      <div className="text-center animate-fadeUp">
        <h1 className="text-3xl md:text-4xl font-semibold text-white">
          Contact Us
        </h1>
        <p className="text-gray-400 mt-2 max-w-xl mx-auto">
          Reach out for reservations, feedback, or any inquiries — we’re always happy to help.
        </p>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-12 mt-16 max-w-6xl mx-auto">

        {/* LEFT INFO */}
        <div className="space-y-8 animate-fadeUp">
          <Info icon={<FiPhone />} title="Phone" value="+91 98765 43210" />
          <Info icon={<FiMail />} title="Email" value="info@villagechef.com" />
          <Info
            icon={<FiMapPin />}
            title="Address"
            value="MG Road, Indore, Madhya Pradesh"
          />

          <p className="pt-4 text-gray-400 leading-relaxed max-w-md">
            We’re open daily from{" "}
            <span className="text-orange-400">10 AM – 11 PM</span>.
            Visit us or send a message anytime.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-black/60 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl animate-fadeUp"
        >
          <Input
            label="Your Name"
            value={form.name}
            onChange={handleChange("name")}
            placeholder="Enter your name"
          />

          <Input
            label="Your Email"
            value={form.email}
            onChange={handleChange("email")}
            placeholder="Enter your email"
            type="email"
          />

          <div className="mt-6">
            <label className="text-sm text-gray-400">Message</label>
            <textarea
              rows="4"
              value={form.message}
              onChange={handleChange("message")}
              placeholder="Write your message..."
              className="w-full mt-2 px-4 py-3 bg-black border border-white/15 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 outline-none transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full py-3 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && (
            <p className="mt-4 text-emerald-400 text-sm">{success}</p>
          )}

          {error && (
            <p className="mt-4 text-red-400 text-sm">{error}</p>
          )}
        </form>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation: fadeUp 0.9s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

/* =========================
   REUSABLE COMPONENTS
========================= */

function Info({ icon, title, value }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-full bg-orange-500/10 text-orange-400">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-gray-200 font-medium">{value}</p>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="mt-6">
      <label className="text-sm text-gray-400">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full mt-2 px-4 py-3 bg-black border border-white/15 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 outline-none transition"
      />
    </div>
  );
}
