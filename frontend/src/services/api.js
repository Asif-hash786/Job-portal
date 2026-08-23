import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
})

export const registerUser = (userData) => API.post("/register", userData);
export const loginUser = (userData) => API.post("/login", userData);
export const updateProfile = (userData) => API.post("/profile/update", userData);
export const logoutUser = () => API.get("/logout");

export const allJobs = () => API.get("/job/get");
export const jobById = (id) => API.get(`/job/get/${id}`);


export const applyJob = (id) => API.get(`/application/apply/${id}`);



export const registerNewCompany = (userData) => API.post("/company/register", userData);
export const updateCompany = (userData, id) => API.put(`/company/update/${id}`, userData);
export const getCompanyById = (id) => API.get(`/company/get/${id}`);
export const getAllCompany = () => API.get("/company/get");