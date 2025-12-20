// src/components/admin/Products.jsx (Modern & Enhanced Version)
import React, { useState } from "react";
import { FiEdit, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

// Mock Menu Data (Replace with real data/Redux later)
const initialProducts = [
  { id: 1, name: "Mocha Shake", price: 199, category: "Shakes", img: "https://media.istockphoto.com/id/1308045723/photo/cold-coffee-frappuccino.jpg?s=612x612&w=0&k=20&c=drB225PkXKnjRzym-06I3rQs2dawXXb2mxsdbkj9aK0=" },
  { id: 2, name: "Oreo Shake", price: 220, category: "Shakes", img: "https://www.prairiefarms.com/wp-content/uploads/files/2023/beverage-CookiesNCreamMilkShake.jpg" },
  { id: 3, name: "Vanilla Shake", price: 179, category: "Shakes", img: "https://www.tastingtable.com/img/gallery/old-fashioned-vanilla-milkshake-recipe/l-intro-1669762595.jpg" },
  { id: 4, name: "Mango Tango", price: 189, category: "Shakes", img: "https://untoldrecipesbynosheen.com/wp-content/uploads/2025/02/mango-milkshake-featured.jpg" },
  { id: 5, name: "Strawberry Bliss", price: 209, category: "Shakes", img: "https://www.southernliving.com/thmb/gee_M98UezeOVrpk622i-zYkCKY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/strawberry-milkshake-3-df5b8b02a0844dfdb47c860476e1b974.jpg" },
  { id: 6, name: "Chocolate Dream", price: 229, category: "Shakes", img: "https://www.hillcountrychocolate.com/cdn/shop/articles/the-ultimate-chocolate-milkshake-recipe-creamy-and-delicious-1804730_1024x1024.jpg?v=1753741861" },
];

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");

  // Filter products by search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Delete product
  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-10"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Menu Items</h2>
          <p className="text-gray-400 mt-2">Manage your cafe's menu – add, edit, or remove items</p>
        </div>

        <div className="flex gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search menu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-6 py-3 bg-[#111] border border-gray-800 rounded-xl focus:border-orange-500 outline-none transition w-full sm:w-64"
            />
          </div>

          {/* Add Button */}
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-black rounded-full hover:shadow-xl transition">
            <FiPlus className="w-5 h-5" />
            Add Item
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -10 }}
            className="group relative bg-[#111] rounded-2xl overflow-hidden shadow-lg hover:shadow-orange-500/30 transition-all duration-500"
          >
            {/* Image */}
            <div className="h-48 overflow-hidden">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold group-hover:text-orange-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm">{product.category}</p>
              </div>

              <p className="text-3xl font-bold text-orange-400">
                ₹{product.price}
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-black rounded-xl hover:shadow-lg transition-all">
                  <FiEdit className="inline mr-2" /> Edit
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="flex-1 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                >
                  <FiTrash2 className="inline mr-2" /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-xl">No menu items found</p>
          <button className="mt-6 px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-black rounded-full hover:shadow-xl transition">
            Add New Item
          </button>
        </div>
      )}
    </motion.div>
  );
}