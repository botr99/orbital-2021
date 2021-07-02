import axios from "axios";
import url from "../config/url";

export const API = axios.create({
  baseURL: `${url}/api/user`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const login = (formData) => API.post("/login", formData);
export const signup = (formData) => API.post("/signup", formData);
// export const adminsignup = (formData) => API.post("/adminsignup", formData);

export const getRegisteredJobs = async (userId) => {
  const { data } = await API.get(`/${userId}/registeredJobs`);
  return data;
};
