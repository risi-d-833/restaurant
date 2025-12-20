// src/components/ProcessSection.jsx
import React from "react";
import { GiCoffeeBeans, GiFire, GiCoffeeCup } from "react-icons/gi"; // Using game-icons for better matching icons
import { FaCoffee } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ProcessSection() {
  const processes = [
    {
      icon: <GiCoffeeBeans className="w-10 h-10 text-orange-400" />,
      title: "Drying the beans",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      icon: <GiFire className="w-10 h-10 text-orange-400" />,
      title: "Roasting",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      icon: <FaCoffee className="w-10 h-10 text-orange-400" />,
      title: "Grinding",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      icon: <GiCoffeeCup className="w-10 h-10 text-orange-400" />,
      title: "Perfect Coffee",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-black via-[#1a1208] to-[#3b240f] text-gray-100 relative overflow-hidden">
      {/* Subtle Background Image Overlay (Optional – Add your coffee image URL) */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTYzfHxjYWZlfGVufDB8fDB8fHww')] bg-cover bg-center opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-100"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          We Create Delicious Memories
        </motion.h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {processes.map((process, index) => (
            <motion.div
              key={index}
              className="bg-[#111]/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10 hover:shadow-orange-500/30 transition-all duration-500 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.4 } }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                {process.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-center mb-2 group-hover:text-orange-400 transition-colors duration-300">
                {process.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm text-center">
                {process.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}