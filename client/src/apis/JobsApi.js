import axios from "axios";
import url from "../config/url";

const API = axios.create({
  baseURL: `${url}/api/jobs`,
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
