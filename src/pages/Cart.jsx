// src/pages/Cart.jsx
import React, { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import {
  setCart,
  addItem,
  updateQty,
  removeItem,
  clearCart,
} from "../store/cartSlice";

import {
  fetchCart,
  updateCartQty,
  removeFromCart,
  clearCartApi,
} from "../services/api";

import { FiShoppingBag, FiCreditCard, FiTrash2 } from "react-icons/fi";

function formatCurrency(n) {
  return `₹${Number(n).toFixed(0)}`;
}

export default function Cart() {
  const items = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCart = async () => {
      try {
        const res = await fetchCart();
        dispatch(setCart(res.items || []));
      } catch (err) {
        console.error("Failed to load cart", err);
      }
    };
    loadCart();
  }, [dispatch]);

  const subtotal = useMemo(
    () => items.reduce((acc, it) => acc + it.price * it.qty, 0),
    [items]
  );

  const tax = subtotal * 0.05;
  const delivery = items.length ? 30 : 0;
  const total = subtotal + tax + delivery;

  const increaseQty = async (item) => {
    const qty = item.qty + 1;
    dispatch(updateQty({ id: item.id, qty }));
    await updateCartQty({ id: item.id, qty });
  };

  const decreaseQty = async (item) => {
    const qty = Math.max(1, item.qty - 1);
    dispatch(updateQty({ id: item.id, qty }));
    await updateCartQty({ id: item.id, qty });
  };

  const removeItemHandler = async (id) => {
    dispatch(removeItem(id));
    await removeFromCart(id);
  };

  const clearCartHandler = async () => {
    dispatch(clearCart());
    await clearCartApi();
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-[#1a1208] to-[#3b240f] text-gray-100 px-6 py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT - Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <FiShoppingBag className="w-6 h-6 text-orange-400" />
            <h1 className="text-2xl font-bold">Your Cart</h1>
          </div>

          {items.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white/5 text-center border border-white/10">
              <p className="text-gray-300">Your cart is empty.</p>
              <p className="mt-3 text-sm text-gray-400">
                Browse the menu and add items to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((it) => (
                <CartItem
                  key={it.id}
                  item={it}
                  onInc={() => increaseQty(it)}
                  onDec={() => decreaseQty(it)}
                  onRemove={() => removeItemHandler(it.id)}
                />
              ))}
            </div>
          )}

          <div className="flex items-center justify-between gap-4 mt-6">
            <button
              onClick={clearCartHandler}
              className="flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-800 rounded-full text-sm transition"
            >
              <FiTrash2 /> Clear cart
            </button>

            <div className="text-sm text-gray-400">
              <span>Secure checkout</span>
            </div>
          </div>
        </div>

        {/* RIGHT - Order Summary */}
        <aside className="rounded-2xl p-6 bg-white/5 backdrop-blur-sm border border-white/10">
          <h3 className="text-lg font-semibold">Order Summary</h3>

          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Tax (5%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Delivery</span>
              <span>{formatCurrency(delivery)}</span>
            </div>

            <div className="border-t border-white/10 mt-3 pt-3 flex justify-between items-center">
              <div>
                <div className="text-sm text-gray-400">Total</div>
                <div className="text-2xl font-bold">
                  {formatCurrency(total)}
                </div>
              </div>

              <button
                onClick={() => alert("Proceed to payment")}
                className="px-4 py-2 bg-orange-500 text-black rounded-full font-semibold hover:bg-orange-600 transition"
              >
                <div className="flex items-center gap-2">
                  <FiCreditCard /> Checkout
                </div>
              </button>
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        .scrollbar::-webkit-scrollbar { height: 8px; width: 8px; }
        .scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.06);
          border-radius: 999px;
        }
      `}</style>
    </section>
  );
}