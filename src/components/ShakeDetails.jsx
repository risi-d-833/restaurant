// src/components/ShakeDetails.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft, FiHeart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../store/wishlistSlice";

// Reuse the same SHAKES data
const SHAKES = [
  { id: 1, name: "Mocha Shake", price: 20, img: "https://media.istockphoto.com/id/1308045723/photo/cold-coffee-frappuccino.jpg?s=612x612&w=0&k=20&c=drB225PkXKnjRzym-06I3rQs2dawXXb2mxsdbkj9aK0=", description: "Rich coffee flavor blended with chocolate and cream." },
  { id: 2, name: "Lavender Shake", price: 20, img: "https://www.havocinthekitchen.com/wp-content/uploads/2024/08/Blueberry-Lemon-Lavender-Milkshake-1.jpg", description: "Soothing lavender-infused creamy delight." },
  { id: 3, name: "Caramel Shake", price: 20, img: "https://plus.unsplash.com/premium_photo-1695035005979-068bf5C5e859?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyYW1lbCUyMHNoYWtlfGVufDB8fDB8fHww", description: "Sweet caramel swirls in a thick milkshake." },
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

  if (!shake) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Shake not found!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition">
          <FiArrowLeft className="w-5 h-5" /> Back to Menu
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Large Image */}
          <div className="flex justify-center">
            <div className="w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-orange-500/50 transition-shadow">
              <img
                src={shake.img}
                alt={shake.name}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold mb-4 group-hover:text-orange-400 transition-colors">{shake.name}</h1>
              <p className="text-gray-400 text-lg">
                {shake.description}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <p className="text-gray-500 text-sm">Price</p>
                <p className="text-4xl font-bold text-orange-400">₹{shake.price}</p>
              </div>

              <button
                onClick={() => dispatch(toggleWishlist(shake.id))}
                className="p-4 rounded-full bg-[#111] hover:bg-orange-500/20 transition"
              >
                <FiHeart
                  className={`w-8 h-8 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                />
              </button>
            </div>

            <div className="pt-8">
              <button className="w-full md:w-auto px-12 py-5 text-xl font-bold rounded-full bg-orange-500 hover:bg-orange-600 shadow-xl hover:shadow-orange-500/50 transition-all hover:scale-105">
                ADD TO CART
              </button>
            </div>

            <div className="text-sm text-gray-500 space-y-2">
              <p>• Made with real fruit & premium milk</p>
              <p>• No artificial flavors</p>
              <p>• Served chilled with whipped cream</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}