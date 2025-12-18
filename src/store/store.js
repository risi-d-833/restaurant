// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
// import other reducers as needed (theme, auth, etc.)

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // theme: themeReducer, ...
  },
});
