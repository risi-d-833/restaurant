import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://restorent-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const subscribeEmail = (data) =>
  API.post("/subscribers", data);

export default API;
