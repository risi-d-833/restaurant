// src/components/CoffeeCarousel.jsx (Fixed & Properly Structured)
import React, { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

const COFFEE_ITEMS = [
  { name: "Iced Coffee", img: "https://images.pexels.com/photos/1193335/pexels-photo-1193335.jpeg" },
  { name: "Coffee Cake", img: "https://www.kingarthurbaking.com/sites/default/files/recipe_legacy/6321-3-large.jpg" },
  { name: "Croissant", img: "https://media.istockphoto.com/id/960924058/photo/cup-of-cappuccino-coffee-with-croissants.jpg?s=612x612&w=0&k=20&c=mGeJTwQ2OOPdTRZgsBsCq6KxrGSLKjwW_pETwyVl9fM=" },
  { name: "Coffee Beans", img: "https://media.istockphoto.com/id/1290860484/photo/close-up-of-roasted-coffee-beans-on-a-black-smokey-background.jpg?s=170667a&w=0&k=20&c=zlOChA7swqycWmmmQ_pNIIR6Df0GIh_T-Br0jA5YVkk=" },
  { name: "Coffee Shops", img: "https://thumbs.dreamstime.com/b/cozy-coffee-shop-ambiance-warm-lighting-rustic-decor-relaxed-gatherings-warm-inviting-coffee-shop-interior-379611880.jpg" },
  { name: "Espresso", img: "https://media.istockphoto.com/id/157509191/photo/double-espresso-shot.jpg?s=612x612&w=0&k=20&c=HOOwVH_kMb8iRAGDFAc6b7tG3ENQZh6bbXt0Doo78zc=" },
  { name: "Latte", img: "https://columbiametro.com/wp-content/uploads/2018/10/Latte.jpg" },
  { name: "Cappuccino", img: "https://media.istockphoto.com/id/1130142242/photo/coffee-espresso-in-white-cup-of-marble-table-background-top-view.jpg?s=612x612&w=0&k=20&c=VKUYDiky8OTv2FstGN92bvP4jAMbIFOPdCejKJsekuI=" },
  { name: "Mocha", img: "https://media.gettyimages.com/id/521618573/photo/hot-chocolate.jpg?s=612x612&w=gi&k=20&c=9LR3k2w5OFzFHnVKolQ63xAtMSsfwFTI_OMIvEkXorQ=" },
  { name: "Americano", img: "https://media.istockphoto.com/id/2158812697/photo/high-angle-view-of-a-cup-of-black-coffee-on-a-wooden-table-beside-a-window.jpg?s=612x612&w=0&k=20&c=iujeo6R0MEMzJhEu7ePs-2gyuT7-7pRu8ZV6H1EzD-4=" },
];

export default function CoffeeCarousel() {
  const scrollerRef = useRef(null);

  const scrollBy = (dir = "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const itemWidth = el.querySelector(".item")?.offsetWidth || 140;
    const gap = 32;
    const offset = itemWidth + gap;
    const distance = dir === "right" ? offset * 3 : -offset * 3;
    el.scrollBy({ left: distance, behavior: "smooth" });
  };

  return (
    <section className="py-16 px-6 md:px-12 bg-gradient-to-br from-black via-[#1a1208] to-[#3b240f] text-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide">Top Coffee</h2>
          <p className="text-gray-400 text-sm mt-2">Explore our finest coffee selections</p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scrollBy("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[#111]/80 hover:bg-orange-500 hover:scale-110 transition-all duration-500 shadow-lg"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scrollBy("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[#111]/80 hover:bg-orange-500 hover:scale-110 transition-all duration-500 shadow-lg"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>

          {/* Scroller */}
          <div
            ref={scrollerRef}
            className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar pb-6 px-12 md:px-20"
          >
            {/* Left Spacer */}
            <div className="flex-none w-6 md:w-16" aria-hidden="true" />

            {COFFEE_ITEMS.map((item, index) => (
              <motion.div
                key={index}
                className="item flex-none flex flex-col items-center gap-4 group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{
                  scale: 1.08,
                  y: -6,
                  transition: { duration: 0.6, ease: "easeOut" }
                }}
              >
                {/* Image Container */}
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-2xl ring-4 ring-orange-500/20 group-hover:ring-orange-400 transition-all duration-700">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    loading="lazy"
                  />
                </div>

                {/* Name */}
                <p className="text-sm md:text-base font-medium group-hover:text-orange-400 transition-colors duration-500">
                  {item.name}
                </p>
              </motion.div>
            ))}

            {/* Right Spacer */}
            <div className="flex-none w-6 md:w-16" aria-hidden="true" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}