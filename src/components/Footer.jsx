// src/components/Footer.jsx (More Modern UI with Hover Effects & Animations)
import React, { useState } from "react";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiCheck,
  FiMail,
  FiPhoneCall,
  FiMapPin,
  FiArrowRight,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { subscribeEmail } from "../services/subscriberApi";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email) return;

    try {
      setLoading(true);
      await subscribeEmail({ email });
      setMsg("Subscribed successfully ✔");
      setEmail("");
    } catch (err) {
      setMsg(err.message || "Already subscribed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-black text-gray-300 pt-16 pb-10 border-t border-[#222] relative overflow-hidden">
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Village CHEF
          </h2>
          <p className="text-gray-400 mt-3 max-w-xs">
            Authentic flavors, warm hospitality, unforgettable experiences.
          </p>
          <div className="flex gap-4 mt-6">
            {[FiFacebook, FiInstagram, FiTwitter].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                className="p-3 border border-gray-700 rounded-full text-gray-300 hover:text-orange-400 hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300"
                whileHover={{ scale: 1.15, rotate: 5 }}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-white font-semibold mb-5 text-xl">Quick Links</h3>
          <ul className="space-y-4">
            {["Home", "About Us", "Menu", "Reservation", "Contact"].map((l) => (
              <motion.li
                key={l}
                className="hover:text-orange-400 cursor-pointer transition-all duration-300 group"
                whileHover={{ x: 8 }}
              >
                <span className="group-hover:underline">{l}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-white font-semibold mb-5 text-xl">Contact</h3>
          <ul className="space-y-4">
            <motion.li
              className="flex gap-3 items-center hover:text-orange-400 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <FiPhoneCall className="w-5 h-5" /> +91 98765 43210
            </motion.li>
            <motion.li
              className="flex gap-3 items-center hover:text-orange-400 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <FiMail className="w-5 h-5" /> info@villagechef.com
            </motion.li>
            <motion.li
              className="flex gap-3 items-center hover:text-orange-400 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <FiMapPin className="w-5 h-5" /> Indore, MP
            </motion.li>
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-white font-semibold mb-5 text-xl">Subscribe</h3>
          <p className="text-gray-400 mb-4">Get offers & updates</p>

          <div className="relative group">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-3 bg-[#111] border border-gray-800 rounded-full text-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition duration-300 group-hover:border-orange-500/50"
            />
            <motion.button
              onClick={submit}
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 text-black px-4 py-2 rounded-full hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-orange-500/50 hover:scale-105 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? "..." : "Join"}
              <FiArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          {msg && <p className="mt-3 text-sm text-emerald-400 flex items-center gap-2"><FiCheck /> {msg}</p>}
        </motion.div>
      </div>

      <div className="mt-12 pt-6 border-t border-[#1a1a1a] text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Village CHEF
      </div>
    </footer>
  );
}