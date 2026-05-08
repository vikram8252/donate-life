import axios from "axios";

const API = axios.create({
  baseURL: "https://donate-backend-8xk6.onrender.com"
  // baseURL: "http://localhost:5000/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
