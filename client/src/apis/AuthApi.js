import axios from "axios";

export const API = axios.create({ baseURL: "http://localhost:5000/api/user" });

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
