import axios from "axios";

const API = axios.create({
  baseURL:import.meta.env.VITE_BASE_URL,
  withCredentials:true,
})

export const registerUser = (userData) => API.post("/register",userData);
export const loginUser = (userData) => API.post("/login",userData);