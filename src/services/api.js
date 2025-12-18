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
   AUTH APIs
========================= */
export const loginUser = (data) =>
  API.post("/auth/login", data);

export const signupUser = (data) =>
  API.post("/auth/signup", data);

export const googleLogin = (data) =>
  API.post("/auth/google", data);

/* =========================
   RESERVATION APIs
========================= */
export const createReservation = (payload) =>
  API.post("/reservations", payload);

export const getReservations = () =>
  API.get("/reservations");

/* =========================
   CART APIs (DYNAMIC)
========================= */
export const fetchCart = () =>
  API.get("/cart");

export const addToCart = (data) =>
  API.post("/cart/add", data);

export const updateCartQty = (data) =>
  API.put("/cart/qty", data);

export const removeFromCart = (id) =>
  API.delete(`/cart/${id}`);

export const clearCartApi = () =>
  API.delete("/cart");

/* =========================
   EXPORT DEFAULT INSTANCE
========================= */
export default API;
