import React, { useState } from "react";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiMail,
  FiPhoneCall,
  FiMapPin,
} from "react-icons/fi";
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
      <div className="absolute inset-0 bg-gradient-to-b from-black to-black/50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">Village CHEF</h2>
          <p className="text-gray-400 mt-2">
            Authentic flavors, warm hospitality, unforgettable experiences.
          </p>
          <div className="flex gap-4 mt-5">
            {[FiFacebook, FiInstagram, FiTwitter].map((Icon, i) => (
              <a key={i} href="#" className="p-2 border border-gray-700 rounded-full hover:text-orange-400 hover:border-orange-500 transition">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            {["Home", "About Us", "Menu", "Reservation", "Contact"].map((l) => (
              <li key={l} className="hover:text-orange-400 cursor-pointer">
                {l}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <ul className="space-y-3">
            <li className="flex gap-2"><FiPhoneCall /> +91 98765 43210</li>
            <li className="flex gap-2"><FiMail /> info@villagechef.com</li>
            <li className="flex gap-2"><FiMapPin /> Indore, MP</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">Subscribe</h3>
          <p className="text-gray-400 mb-3">Get offers & updates</p>

          <div className="relative">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-3 bg-black border border-gray-800 rounded-full text-white focus:ring-2 focus:ring-orange-500"
            />
            <button
              onClick={submit}
              disabled={loading}
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-orange-500 text-black px-5 py-2 rounded-full hover:bg-orange-600 transition"
            >
              {loading ? "..." : "Join"}
            </button>
          </div>

          {msg && <p className="mt-3 text-sm text-emerald-400">{msg}</p>}
        </div>
      </div>

      <div className="mt-14 pt-6 border-t border-[#1a1a1a] text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Village CHEF
      </div>
    </footer>
  );
}
