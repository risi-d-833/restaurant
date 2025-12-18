import React from "react";
import { FiStar, FiUsers, FiHeart, FiCoffee } from "react-icons/fi";

export default function About() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-[#1a1208] to-[#3b240f] text-gray-100 px-6 py-20 overflow-hidden">

      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto animate-fadeUp">
        <h1 className="text-3xl md:text-4xl font-semibold text-white">
          About <span className="text-orange-400">Village CHEF</span>
        </h1>
        <p className="mt-4 text-gray-400 leading-relaxed">
          Where authentic village flavors meet modern dining experiences.
        </p>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-14 mt-20 max-w-6xl mx-auto items-center">

        {/* Left Text */}
        <div className="space-y-6 animate-fadeUp">
          <h2 className="text-2xl font-semibold text-white">
            Our Story
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Village CHEF was born from a passion for traditional Indian cooking.
            We believe food should not only satisfy hunger but also tell a story.
            Every dish we serve is inspired by village kitchens, slow cooking,
            and hand-picked spices.
          </p>

          <p className="text-gray-400 leading-relaxed">
            From family dinners to celebrations, our mission is to bring people
            together through honest food and warm hospitality.
          </p>
        </div>

        {/* Right Cards */}
        <div className="grid grid-cols-2 gap-6 animate-fadeUp">

          <div className="bg-black/60 border border-white/10 rounded-2xl p-6 hover:-translate-y-2 transition-all">
            <FiStar className="text-orange-400 text-2xl mb-3" />
            <h3 className="text-white font-semibold">Premium Taste</h3>
            <p className="text-sm text-gray-400 mt-2">
              Authentic recipes passed through generations.
            </p>
          </div>

          <div className="bg-black/60 border border-white/10 rounded-2xl p-6 hover:-translate-y-2 transition-all">
            <FiUsers className="text-orange-400 text-2xl mb-3" />
            <h3 className="text-white font-semibold">Family Friendly</h3>
            <p className="text-sm text-gray-400 mt-2">
              A warm place for friends & families.
            </p>
          </div>

          <div className="bg-black/60 border border-white/10 rounded-2xl p-6 hover:-translate-y-2 transition-all">
            <FiHeart className="text-orange-400 text-2xl mb-3" />
            <h3 className="text-white font-semibold">Made with Love</h3>
            <p className="text-sm text-gray-400 mt-2">
              Every dish prepared with care & passion.
            </p>
          </div>

          <div className="bg-black/60 border border-white/10 rounded-2xl p-6 hover:-translate-y-2 transition-all">
            <FiCoffee className="text-orange-400 text-2xl mb-3" />
            <h3 className="text-white font-semibold">Fresh Ingredients</h3>
            <p className="text-sm text-gray-400 mt-2">
              Locally sourced, always fresh.
            </p>
          </div>

        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
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
