// src/store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    /* ======================
       SET CART (FROM BACKEND)
    ====================== */
    setCart: (state, action) => {
      state.items = action.payload;
    },

    /* ======================
       ADD ITEM
    ====================== */
    addItem: (state, action) => {
      const item = action.payload;
      const exists = state.items.find((i) => i.id === item.id);

      if (exists) {
        exists.qty += item.qty || 1;
      } else {
        state.items.push({ ...item, qty: item.qty || 1 });
      }
    },

    /* ======================
       UPDATE QTY
    ====================== */
    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) item.qty = qty;
    },

    /* ======================
       REMOVE ITEM
    ====================== */
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    /* ======================
       CLEAR CART
    ====================== */
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  setCart,
  addItem,
  updateQty,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
