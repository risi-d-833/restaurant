// src/components/admin/Products.jsx (Full Final Best Version)
import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiX, FiSave, FiImage } from "react-icons/fi";
import { motion } from "framer-motion";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "../../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({ name: "", price: "", category: "", img: null });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setMessage("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, img: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const openAddModal = () => {
    setEditProduct(null);
    setForm({ name: "", price: "", category: "", img: null });
    setPreview(null);
    setMessage("");
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      img: null,
    });
    setPreview(product.img);
    setMessage("");
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    // Validation
    if (!form.name.trim() || !form.price || !form.category.trim() || (!editProduct && !form.img)) {
      setMessage("Please fill all fields and select an image for new products");
      return;
    }

    setSaving(true);
    setMessage("");

    const data = new FormData();
    data.append("name", form.name.trim());
    data.append("price", form.price);
    data.append("category", form.category.trim());
    if (form.img) data.append("img", form.img);

    try {
      let result;
      if (editProduct) {
        result = await updateProduct(editProduct._id, data);
        setProducts(products.map((p) => (p._id === editProduct._id ? result : p)));
      } else {
        result = await addProduct(data);
        setProducts([result, ...products]);
      }
      setModalOpen(false);
      setMessage("Product saved successfully!");
    } catch (err) {
      setMessage(err.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product permanently?")) return;

    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
      setMessage("Product deleted successfully");
    } catch (err) {
      setMessage("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-gray-400">Loading menu items...</p>
      </div>
    );
  }

  return (
    <motion.div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <h2 className="text-5xl font-bold text-white leading-tight">Menu Items</h2>
          <p className="text-gray-400 mt-3 text-lg">Add, edit, and manage all your cafe's delicious offerings</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-6 py-3.5 bg-[#111]/80 border border-gray-800 rounded-full focus:border-orange-500 outline-none transition w-full min-w-64"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openAddModal}
            className="flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-pink-500 text-black font-bold rounded-full shadow-xl hover:shadow-orange-500/50 transition"
          >
            <FiPlus className="w-6 h-6" />
            Add New Item
          </motion.button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-5 rounded-2xl text-center font-medium text-lg shadow-lg ${
            message.includes("successfully")
              ? "bg-green-900/60 text-green-300 border border-green-800"
              : "bg-red-900/60 text-red-300 border border-red-800"
          }`}
        >
          {message}
        </motion.div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -12, scale: 1.03 }}
            className="group bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl hover:shadow-orange-500/40 border border-gray-800 transition-all duration-500"
          >
            <div className="h-56 overflow-hidden">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-400 text-sm mt-1">{product.category}</p>
              </div>

              <p className="text-4xl font-bold text-orange-400">₹{product.price}</p>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openEditModal(product)}
                  className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-black font-semibold rounded-xl shadow-md hover:shadow-lg transition"
                >
                  <FiEdit className="inline mr-2" /> Edit
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(product._id)}
                  className="flex-1 py-3 bg-red-500/20 text-red-400 font-semibold rounded-xl hover:bg-red-500 hover:text-white transition"
                >
                  <FiTrash2 className="inline mr-2" /> Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-32">
          <div className="mb-10">
            <FiImage className="w-32 h-32 mx-auto text-gray-600 opacity-40" />
          </div>
          <p className="text-3xl text-gray-400 mb-8">Your menu is empty</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openAddModal}
            className="px-12 py-6 bg-gradient-to-r from-orange-500 to-pink-500 text-black text-2xl font-bold rounded-full shadow-2xl hover:shadow-orange-500/60 transition"
          >
            Add Your First Delicious Item
          </motion.button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-[#111] to-[#1a1a1a] p-10 rounded-3xl shadow-2xl border border-gray-800 w-full max-w-4xl max-h-[95vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-bold text-white">
                {editProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <FiX className="w-8 h-8" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Form */}
              <div className="space-y-8">
                <div>
                  <label className="block text-gray-300 text-lg mb-3">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    placeholder="e.g. Spicy Treat Shake"
                    className="w-full px-6 py-4 bg-black/50 border border-gray-700 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none text-white text-lg transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-lg mb-3">Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleFormChange}
                      placeholder="323"
                      className="w-full px-6 py-4 bg-black/50 border border-gray-700 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none text-white text-lg transition"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-lg mb-3">Category *</label>
                    <input
                      type="text"
                      name="category"
                      value={form.category}
                      onChange={handleFormChange}
                      placeholder="shake"
                      className="w-full px-6 py-4 bg-black/50 border border-gray-700 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none text-white text-lg transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-lg mb-3">
                    Product Image {editProduct ? "(Optional)" : "*"}
                  </label>
                  <label className="block w-full px-8 py-12 bg-black/30 border-2 border-dashed border-gray-600 rounded-3xl cursor-pointer hover:border-orange-500 transition text-center">
                    <FiImage className="mx-auto w-16 h-16 text-gray-500 mb-4" />
                    <p className="text-gray-400 text-lg">Drop image here or click to browse</p>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Large Preview */}
              <div className="flex flex-col items-center justify-center">
                <p className="text-gray-300 text-xl mb-6">Live Preview</p>
                <div className="w-full max-w-md h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800">
                  <img
                    src={preview || "https://via.placeholder.com/600x600/111/666?text=No+Image+Yet"}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <motion.button
                onClick={handleSubmit}
                disabled={saving}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-4 px-12 py-5 bg-gradient-to-r from-orange-500 to-pink-500 text-black text-xl font-bold rounded-full shadow-2xl hover:shadow-orange-500/60 transition disabled:opacity-70"
              >
                <FiSave className="w-7 h-7" />
                {saving ? "Saving..." : editProduct ? "Update Product" : "Add to Menu"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}