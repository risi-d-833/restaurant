// src/components/ShakeDetails.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiHeart, FiPlus, FiMinus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../store/wishlistSlice";
import { motion } from "framer-motion";

const SHAKES = [
  { id: 1, name: "Mocha Shake", price: 20, img: "https://media.istockphoto.com/id/1308045723/photo/cold-coffee-frappuccino.jpg?s=612x612&w=0&k=20&c=drB225PkXKnjRzym-06I3rQs2dawXXb2mxsdbkj9aK0=", description: "Rich coffee flavor blended with chocolate and cream." },
  { id: 2, name: "Lavender Shake", price: 20, img: "https://www.havocinthekitchen.com/wp-content/uploads/2024/08/Blueberry-Lemon-Lavender-Milkshake-1.jpg", description: "Soothing lavender-infused creamy delight." },
  { id: 3, name: "Caramel Shake", price: 20, img: "https://plus.unsplash.com/premium_photo-1695035005979-0682199ef755?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNhcmFtZWwlMjBzaGFrZXxlbnwwfHwwfHx8MA%3D%3D", description: "Sweet caramel swirls in a thick milkshake." },
  { id: 4, name: "Vanilla Bean", price: 18, img: "https://www.tastingtable.com/img/gallery/old-fashioned-vanilla-milkshake-recipe/l-intro-1669762595.jpg", description: "Classic vanilla with real bean specks." },
  { id: 5, name: "Strawberry Bliss", price: 19, img: "https://www.southernliving.com/thmb/gee_M98UezeOVrpk622i-zYkCKY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/strawberry-milkshake-3-df5b8b02a0844dfdb47c860476e1b974.jpg", description: "Fresh strawberries blended to perfection." },
  { id: 6, name: "Chocolate Dream", price: 21, img: "https://www.hillcountrychocolate.com/cdn/shop/articles/the-ultimate-chocolate-milkshake-recipe-creamy-and-delicious-1804730_1024x1024.jpg?v=1753741861", description: "Indulgent chocolate overload." },
  { id: 7, name: "Mango Tango", price: 17, img: "https://untoldrecipesbynosheen.com/wp-content/uploads/2025/02/mango-milkshake-featured.jpg", description: "Tropical mango explosion." },
  { id: 8, name: "Pistachio Shake", price: 22, img: "https://www.seriouseats.com/thmb/sbMbAeET2X_QfaqxtqHQ_6Z2Y6c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__20110316-milkshake-primary-0ca1da0a253d40218d41520d5dc7649e.jpg", description: "Nutty pistachio creaminess." },
  { id: 9, name: "Oreo Fantasy", price: 20, img: "https://www.prairiefarms.com/wp-content/uploads/files/2023/beverage-CookiesNCreamMilkShake.jpg", description: "Crunchy Oreo cookie mix-in." },
  { id: 10, name: "Berry Burst", price: 18, img: "https://www.southernliving.com/thmb/7pIGBWeSZ8xIxBi5CJKc9w-8mkQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SL-27810_OE_Brambleberry-Smoothies-3621-142c15c0b2d54427b84354e43ba14602.jpg", description: "Mixed berries for a tangy burst." },
];

export default function ShakeDetails() {
  const { id } = useParams();
  const shake = SHAKES.find((s) => s.id === Number(id));
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.includes(shake?.id);
  const [quantity, setQuantity] = useState(1);

  if (!shake) {
    return (
      <motion.div
        className="min-h-screen bg-black text-white flex items-center justify-center text-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Shake not found!
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-black text-white py-16 px-6 md:px-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Back Icon Only */}
        <Link
          to="/"
          className="inline-block mb-10 p-3 rounded-full bg-[#111] hover:bg-orange-500/20 transition-all hover:scale-110"
        >
          <FiArrowLeft className="w-6 h-6" />
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="relative group">
              <div className="w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl ring-8 ring-orange-500/10">
                <img
                  src={shake.img}
                  alt={shake.name}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 rounded-3xl ring-8 ring-orange-500/0 group-hover:ring-orange-500/30 transition-all duration-500 pointer-events-none" />
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            {/* Name & Description */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                {shake.name}
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                {shake.description}
              </p>
            </div>

            {/* Price & Wishlist */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm uppercase tracking-wider">Price</p>
                <p className="text-5xl font-bold text-orange-400 mt-2">₹{shake.price}</p>
              </div>

              <button
                onClick={() => dispatch(toggleWishlist(shake.id))}
                className="p-5 rounded-full bg-[#111] hover:bg-orange-500/20 transition-all hover:scale-110"
              >
                <FiHeart
                  className={`w-8 h-8 transition-all ${
                    isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`}
                />
              </button>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-6">
              <p className="text-gray-400 text-lg">Quantity</p>
              <div className="flex items-center gap-4 bg-[#111] rounded-full px-6 py-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-white/10 rounded-full transition"
                >
                  <FiMinus className="w-5 h-5" />
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-white/10 rounded-full transition"
                >
                  <FiPlus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div>
              <button className="w-full py-6 text-2xl font-bold rounded-full bg-orange-500 hover:bg-orange-600 shadow-2xl hover:shadow-orange-500/50 transition-all hover:scale-105 active:scale-100">
                ADD TO CART
              </button>
            </div>

            {/* Features */}
            <div className="pt-8 border-t border-gray-800">
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-center gap-3">
                  <span className="text-orange-400">✓</span> Made with real fruit & premium milk
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-orange-400">✓</span> No artificial flavors
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-orange-400">✓</span> Served chilled with whipped cream
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}