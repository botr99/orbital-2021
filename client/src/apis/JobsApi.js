import axios from "axios";

const API = axios.create({
  baseURL: "https://nus-ccsgp.herokuapp.com/api/jobs",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export default API;
