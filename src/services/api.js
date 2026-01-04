// src/services/api.js (Final & Best Version - Fully Working)
import axios from "axios";

/* =========================
   AXIOS INSTANCE
========================= */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://restorent-backend.onrender.com",
});

/* =========================
   REQUEST INTERCEPTOR (AUTO TOKEN + FORM DATA HANDLING)
========================= */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Important: Don't set Content-Type when sending FormData
    // Let browser set it with correct boundary
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else if (config.data) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR (CLEAN DATA + BETTER ERRORS)
========================= */
API.interceptors.response.use(
  (response) => {
    // Return response.data directly
    return response.data;
  },
  (error) => {
    // Log the failing URL to help debug "Route not found" errors
    console.error("API Request Failed at:", error?.config?.baseURL + error?.config?.url);

    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error.message ||
      "Network error - please try again";

    // Return rejected promise with clean error message
    return Promise.reject(new Error(message));
  }
);

/* =========================
   AUTH APIs
========================= */
export const loginUser = (data) => API.post("/auth/login", data);
export const signupUser = (data) => API.post("/auth/signup", data);
export const googleLogin = (data) => API.post("/auth/google", data);

/* =========================
   RESERVATION APIs
========================= */
export const createReservation = (payload) => API.post("/reservations", payload);
export const getReservations = () => API.get("/reservations");

/* =========================
   CART APIs
========================= */
export const fetchCart = () => API.get("/cart");
export const addToCart = (data) => API.post("/cart/add", data);
export const updateCartQty = (data) => API.put("/cart/qty", data);
export const removeFromCart = (id) => API.delete(`/cart/${id}`);
export const clearCartApi = () => API.delete("/cart");

/* =========================
   SETTINGS APIs (PUT + FormData Support)
========================= */
export const fetchSettings = () => API.get("/settings");

export const saveSettings = (data) => {
  // data can be plain object or FormData (for logo upload)
  return API.post("/settings", data);
};

/* =========================
   PRODUCTS APIs (Full CRUD with Image Upload)
========================= */
export const fetchProducts = async () => {
  try {
    const response = await API.get("/products");
    // Handle different response shapes
    if (response?.success && Array.isArray(response.products)) {
      return response.products;
    }
    if (Array.isArray(response)) {
      return response;
    }
    return [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const addProduct = (data) => {
  // data = FormData (name, price, category, img file)
  return API.post("/products", data);
};

export const updateProduct = (id, data) => {
  // data = FormData (optional img)
  return API.put(`/products/${id}`, data);
};

export const deleteProduct = (id) => API.delete(`/products/${id}`);
/* ================= ADMIN USERS APIs ================= */

export const fetchAdminUsers = () => API.get("/admin-users");
export const addAdminUser = (data) => API.post("/admin-users", data);
export const updateAdminUser = (id, data) =>
  API.put(`/admin-users/${id}`, data);
export const deleteAdminUserApi = (id) =>
  API.delete(`/admin-users/${id}`);


/* =========================
   EXPORT DEFAULT
========================= */
export default API;
