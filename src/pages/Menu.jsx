import React, { useState } from "react";
import dish1 from "../assets/dish1.jpg";
import dish2 from "../assets/dish2.jpg";
import dish3 from "../assets/dish3.jpg";
import dish4 from "../assets/dish4.jpg";

export default function Menu() {
  const [active, setActive] = useState("Starters");

  const menuItems = {
    Starters: [
      { name: "Crispy Veg Tikki", price: "$8", img: dish1 },
      { name: "Paneer Fingers", price: "$10", img: dish2 },
      { name: "Honey Chilli Potato", price: "$9", img: dish3 },
      { name: "Veg Spring Roll", price: "$7", img: dish4 },
      { name: "Hara Bhara Kebab", price: "$9", img: dish1 },
      { name: "Crispy Corn", price: "$8", img: dish2 },
    ],
    Main: [
      { name: "Butter Chicken", price: "$18", img: dish3 },
      { name: "Veg Biryani", price: "$15", img: dish4 },
      { name: "Paneer Lababdar", price: "$16", img: dish1 },
      { name: "Chicken Tikka Masala", price: "$20", img: dish2 },
      { name: "Dal Makhani", price: "$14", img: dish3 },
      { name: "Kadhai Paneer", price: "$15", img: dish4 },
    ],
    Desserts: [
      { name: "Gulab Jamun", price: "$6", img: dish1 },
      { name: "Chocolate Lava Cake", price: "$7", img: dish2 },
      { name: "Ice Cream Sundae", price: "$5", img: dish3 },
      { name: "Rasmalai", price: "$6", img: dish4 },
      { name: "Brownie with Ice Cream", price: "$8", img: dish1 },
      { name: "Kheer", price: "$5", img: dish2 },
    ],
    Drinks: [
      { name: "Cold Coffee", price: "$5", img: dish3 },
      { name: "Fresh Lime Soda", price: "$4", img: dish4 },
      { name: "Virgin Mojito", price: "$6", img: dish2 },
      { name: "Masala Chai", price: "$2", img: dish1 },
      { name: "Iced Tea", price: "$3", img: dish3 },
      { name: "Hot Chocolate", price: "$5", img: dish4 },
    ],
  };

  return (
    <section className="min-h-screen px-6 py-16 bg-gradient-to-br from-black via-[#1a1208] to-[#3b240f] text-gray-100 overflow-hidden">

      {/* Title */}
      <div className="text-center animate-fadeUp">
        <h1 className="text-3xl md:text-4xl font-semibold text-white">
          Our Menu
        </h1>
        <p className="text-gray-400 mt-2 max-w-xl mx-auto">
          Explore the finest dishes crafted with passion and authentic flavors.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mt-12 flex-wrap">
        {Object.keys(menuItems).map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              active === cat
                ? "bg-orange-500 text-black scale-105 shadow-lg"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-7xl mx-auto">
        {menuItems[active].map((item, i) => (
          <div
            key={item.name}
            className="group bg-black/60 border border-white/10 rounded-2xl overflow-hidden shadow-xl transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 animate-fadeUp"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <div className="relative overflow-hidden">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>
            </div>

            <div className="p-5">
              <h3 className="text-white text-lg font-semibold">
                {item.name}
              </h3>
              <p className="text-orange-400 font-semibold mt-1">
                {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeUp {
          animation: fadeUp 0.9s ease-out forwards;
        }
      `}</style>

    </section>
  );
}
