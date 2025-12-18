import axios from "axios";

/* =========================
   AXIOS INSTANCE
========================= */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   REQUEST INTERCEPTOR
   (AUTO TOKEN ATTACH)
========================= */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR
   (RETURN DATA ONLY)
========================= */
API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Server error";
    return Promise.reject({ message });
  }
);

/* =========================
   CART APIs
========================= */
export const fetchCart = () =>
  API.get("/cart");

export const updateCartQty = (data) =>
  API.put("/cart/item", data);

export const removeFromCart = (id) =>
  API.delete(`/cart/item/${id}`);

export const clearCartApi = () =>
  API.delete("/cart");
