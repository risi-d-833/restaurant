import axios from "axios";

/* ================= AXIOS INSTANCE ================= */

const API = axios.create({
  baseURL: "http://localhost:5000/api/admin/orders",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= API FUNCTIONS ================= */

/* GET ALL ORDERS */
export const fetchAdminOrders = async () => {
  const res = await API.get("/");
  return res.data;
};

/* GET SINGLE ORDER (optional) */
export const fetchAdminOrderById = async (id) => {
  const res = await API.get(`/${id}`);
  return res.data;
};

/* UPDATE ORDER STATUS */
export const updateOrderStatus = async (id, status) => {
  const res = await API.put(`/${id}/status`, { status });
  return res.data;
};

/* DELETE ORDER (optional) */
export const deleteAdminOrder = async (id) => {
  const res = await API.delete(`/${id}`);
  return res.data;
};
