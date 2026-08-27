import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
})

export const registerUser = (userData) => API.post("/register", userData);
export const loginUser = (userData) => API.post("/login", userData);
export const updateProfile = (userData) => API.post("/profile/update", userData);
export const logoutUser = () => API.get("/logout");


export const jobById = (id) => API.get(`/job/get/${id}`);
export const getAdminJob = () => API.get("/job/getadminjobs");
export const registerJob = (userdata) => API.post("/job/post", userdata);
export const allJobs = (searchedQuery = "") => API.get("/job/get", { params: { keyword: searchedQuery || "" } });


export const applyJob = (id) => API.get(`/application/apply/${id}`);
export const applicants = (id) => API.get(`/application/${id}/applicants`)
export const updateStatus = (id, userdata) => API.post(`application/status/${id}/update`, userdata);
export const getAppliedJob = () => API.get("/application/get");


export const registerNewCompany = (userData) => API.post("/company/register", userData);
export const updateCompany = (userData, id) => API.put(`/company/update/${id}`, userData);
export const getCompanyById = (id) => API.get(`/company/get/${id}`);
export const getAllCompany = () => API.get("/company/get");