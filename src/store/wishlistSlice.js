// src/store/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
  },
  reducers: {
    /* ======================
       TOGGLE WISHLIST ITEM
    ====================== */
    toggleWishlist: (state, action) => {
      const itemId = action.payload;
      const exists = state.items.find((id) => id === itemId);

      if (exists) {
        state.items = state.items.filter((id) => id !== itemId);
      } else {
        state.items.push(itemId);
      }
    },

    /* ======================
       ADD TO WISHLIST
    ====================== */
    addToWishlist: (state, action) => {
      const itemId = action.payload;
      if (!state.items.includes(itemId)) {
        state.items.push(itemId);
      }
    },

    /* ======================
       REMOVE FROM WISHLIST
    ====================== */
    removeFromWishlist: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((id) => id !== itemId);
    },

    /* ======================
       SET WISHLIST
    ====================== */
    setWishlist: (state, action) => {
      state.items = action.payload;
    },

    /* ======================
       CLEAR WISHLIST
    ====================== */
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const {
  toggleWishlist,
  addToWishlist,
  removeFromWishlist,
  setWishlist,
  clearWishlist,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
