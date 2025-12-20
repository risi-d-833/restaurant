// src/components/ShakesCarousel.jsx (BUY NOW button, Heart icon, and Price removed)
import React, { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CoffeeCarousel from "./CoffeeCarousel";
import ProcessSection from "./ProcessSection";
import DownloadAppSection from "./DownloadAppSection";

const SHAKES = [
  { id: 1, name: "Mocha Shake", price: 20, img: "https://media.istockphoto.com/id/1308045723/photo/cold-coffee-frappuccino.jpg?s=612x612&w=0&k=20&c=drB225PkXKnjRzym-06I3rQs2dawXXb2mxsdbkj9aK0=" },
  { id: 2, name: "Lavender Shake", price: 20, img: "https://www.havocinthekitchen.com/wp-content/uploads/2024/08/Blueberry-Lemon-Lavender-Milkshake-1.jpg" },
  { id: 3, name: "Caramel Shake", price: 20, img: "https://plus.unsplash.com/premium_photo-1695035005979-0682199ef755?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNhcmFtZWwlMjBzaGFrZXxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 4, name: "Vanilla Bean", price: 18, img: "https://www.tastingtable.com/img/gallery/old-fashioned-vanilla-milkshake-recipe/l-intro-1669762595.jpg" },
  { id: 5, name: "Strawberry Bliss", price: 19, img: "https://www.southernliving.com/thmb/gee_M98UezeOVrpk622i-zYkCKY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/strawberry-milkshake-3-df5b8b02a0844dfdb47c860476e1b974.jpg" },
  { id: 6, name: "Chocolate Dream", price: 21, img: "https://www.hillcountrychocolate.com/cdn/shop/articles/the-ultimate-chocolate-milkshake-recipe-creamy-and-delicious-1804730_1024x1024.jpg?v=1753741861" },
  { id: 7, name: "Mango Tango", price: 17, img: "https://untoldrecipesbynosheen.com/wp-content/uploads/2025/02/mango-milkshake-featured.jpg" },
  { id: 8, name: "Pistachio Shake", price: 22, img: "https://www.seriouseats.com/thmb/sbMbAeET2X_QfaqxtqHQ_6Z2Y6c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__20110316-milkshake-primary-0ca1da0a253d40218d41520d5dc7649e.jpg" },
  { id: 9, name: "Oreo Fantasy", price: 20, img: "https://www.prairiefarms.com/wp-content/uploads/files/2023/beverage-CookiesNCreamMilkShake.jpg" },
  { id: 10, name: "Berry Burst", price: 18, img: "https://www.southernliving.com/thmb/7pIGBWeSZ8xIxBi5CJKc9w-8mkQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SL-27810_OE_Brambleberry-Smoothies-3621-142c15c0b2d54427b84354e43ba14602.jpg" },
];

export default function ShakesCarousel() {
  const scrollerRef = useRef(null);

  const scrollBy = (dir = "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("[data-card]")?.offsetWidth || 300;
    const gap = 24;
    const offset = cardWidth + gap;
    const distance = dir === "right" ? offset * 2 : -offset * 2;
    el.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <>
      <motion.section
        className="py-20 px-6 md:px-12 bg-gradient-to-br from-black via-[#1a1208] to-[#3b240f] text-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-wide">Top Milk Shakes</h2>
              <p className="text-gray-400 text-sm">
                Explore the recent most bought shakes this week
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => scrollBy("left")} className="p-3 rounded-full bg-[#111]/80 hover:bg-orange-500 hover:scale-110 transition-all shadow-lg">
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => scrollBy("right")} className="p-3 rounded-full bg-[#111]/80 hover:bg-orange-500 hover:scale-110 transition-all shadow-lg">
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div ref={scrollerRef} className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory no-scrollbar">
              {SHAKES.map((shake) => (
                <Link
                  key={shake.id}
                  to={`/shake/${shake.id}`}
                  className="snap-start flex-none w-[300px] group"
                >
                  <motion.div
                    data-card
                    className="bg-[#111]/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/5
                    hover:shadow-orange-500/30 hover:shadow-2xl
                    relative overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: shake.id * 0.1 }}
                    whileHover={{ scale: 1.05, y: -10, transition: { duration: 0.3 } }}
                  >
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Image */}
                    <div className="mt-4 mb-6 flex justify-center relative z-10">
                      <div className="w-40 h-40 rounded-xl overflow-hidden bg-[#0a0a0a] shadow-xl ring-4 ring-orange-500/20">
                        <img
                          src={shake.img}
                          alt={shake.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Name Only */}
                    <h3 className="text-xl font-bold text-center relative z-10 group-hover:text-orange-400 transition-colors">
                      {shake.name}
                    </h3>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Gradient Edges */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#1a1208]/80 to-transparent"></div>
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#3b240f]/80 to-transparent"></div>
          </div>
        </div>

        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </motion.section>

      <ProcessSection/>
      <DownloadAppSection/>
      <CoffeeCarousel />
    </>
  );
}