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

  const handleChange = (key) => (e) =>
    setForm({ ...form, [key]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSuccess("");

    try {
      setLoading(true);
      await sendContactMessage(form);

      setSuccess("Message sent successfully ✔");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      alert(err.message || "Failed to send message");
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

      <div className="grid md:grid-cols-2 gap-12 mt-16 max-w-6xl mx-auto">

        {/* Info */}
        <div className="space-y-8 animate-fadeUp">
          <Info icon={<FiPhone />} label="Phone" value="+91 98765 43210" />
          <Info icon={<FiMail />} label="Email" value="info@villagechef.com" />
          <Info icon={<FiMapPin />} label="Address" value="MG Road, Indore, MP" />
        </div>

        {/* Form */}
        <form
          onSubmit={submit}
          className="bg-black/60 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl animate-fadeUp"
        >
          <Input label="Your Name" value={form.name} onChange={handleChange("name")} />
          <Input label="Your Email" type="email" value={form.email} onChange={handleChange("email")} />

          <label className="mt-6 block">
            <span className="text-sm text-gray-400">Message</span>
            <textarea
              rows="4"
              value={form.message}
              onChange={handleChange("message")}
              className="w-full mt-2 px-4 py-3 bg-black border border-white/15 rounded-xl text-white focus:ring-2 focus:ring-orange-500 resize-none"
            />
          </label>

          <button
            disabled={loading}
            className="mt-8 w-full py-3 rounded-full bg-orange-500 text-black font-semibold hover:bg-orange-600 transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && (
            <p className="mt-4 text-emerald-400 text-sm">{success}</p>
          )}
        </form>
      </div>
    </section>
  );
}

/* SMALL REUSABLE UI */
const Info = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="p-3 rounded-full bg-orange-500/10 text-orange-400">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-gray-200 font-medium">{value}</p>
    </div>
  </div>
);

const Input = ({ label, type = "text", value, onChange }) => (
  <label className="block mt-6">
    <span className="text-sm text-gray-400">{label}</span>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full mt-2 px-4 py-3 bg-black border border-white/15 rounded-xl text-white focus:ring-2 focus:ring-orange-500"
    />
  </label>
);
