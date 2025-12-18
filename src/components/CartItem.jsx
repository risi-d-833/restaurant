// src/components/CartItem.jsx
import React from "react";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

export default function CartItem({ item, onInc, onDec, onRemove }) {
  return (
    <div className="flex gap-4 items-center p-4 bg-white/3 rounded-2xl shadow-sm hover:shadow-lg transition transform hover:-translate-y-1">
      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800 flex items-center justify-center">
        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-white text-lg font-semibold truncate">{item.name}</h4>
        <p className="text-sm text-gray-400 mt-1">₹{(item.price / 1).toFixed(0)}</p>
        <div className="mt-2 flex items-center gap-2">
          <button onClick={onDec} aria-label="decrease" className="p-2 rounded-md bg-white/5 hover:bg-white/10 transition">
            <FiMinus className="text-white" />
          </button>
          <div className="px-3 py-1 rounded-md bg-white/6 text-white">{item.qty}</div>
          <button onClick={onInc} aria-label="increase" className="p-2 rounded-md bg-white/5 hover:bg-white/10 transition">
            <FiPlus className="text-white" />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="text-white font-semibold">₹{(item.price * item.qty).toFixed(0)}</div>
        <button onClick={onRemove} aria-label="remove" className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition">
          <FiTrash2 className="text-white" />
        </button>
      </div>
    </div>
  );
}
