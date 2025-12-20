// src/components/DownloadAppSection.jsx (Maximum Compact Version)
import React from "react";
import { motion } from "framer-motion";

export default function DownloadAppSection() {
  return (
    <section className="py-6 md:py-8 px-6 md:px-12 bg-black text-white relative overflow-hidden">
      {/* Ultra Minimal Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.img
          src="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=150"
          alt=""
          className="absolute top-3 left-3 w-10 md:w-12 rounded-lg opacity-10"
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
        <motion.img
          src="https://images.unsplash.com/photo-1572448862527-d3c4eb8ab89e?w=150"
          alt=""
          className="absolute bottom-3 right-3 w-10 md:w-12 rounded-lg opacity-10"
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
        />
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-3 items-center relative z-10">
        {/* Left: Text & Logo */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center md:text-left"
        >
          {/* Logo */}
          <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
            <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-orange-600 rounded flex items-center justify-center shadow-sm">
              <span className="text-base font-bold text-black">V</span>
            </div>
            <h3 className="text-lg font-bold text-orange-400">Village CHEF</h3>
          </div>

          <h1 className="text-xl md:text-2xl font-bold mb-1">
            Get the App now!
          </h1>

          <p className="text-xs text-gray-400 mb-3">
            Exclusive offers & discounts
          </p>

          <p className="text-sm font-medium text-orange-400">
            Scan to download
          </p>
        </motion.div>

        {/* Right: Minimal Phone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex justify-center"
        >
          <div className="relative">
            {/* Tiny Phone */}
            <div className="relative w-40 h-56 md:w-48 md:h-64 bg-white rounded-[2.2rem] shadow-xl overflow-hidden p-2">
              {/* Screen */}
              <div className="w-full h-full bg-black rounded-[1.8rem] flex items-center justify-center">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://play.google.com/store/apps/details?id=com.villagechef.app"
                    alt="Download Village CHEF App"
                    className="w-28 h-28 md:w-32 md:h-32"
                  />
                </div>
              </div>

              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-3 bg-black rounded-b-lg" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}