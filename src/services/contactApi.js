import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://restorent-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendContactMessage = (data) =>
  API.post("/contact", data);

export default API;
