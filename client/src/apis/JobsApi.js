import axios from "axios";
import url from "../config/url";

const JobsApi = axios.create({
  baseURL: `${url}/api/jobs`,
});

JobsApi.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const getCategories = async () => {
  const { data } = await JobsApi.get("/categories");
  return data;
};

export const getApprovedJobs = async () => {
  const { data } = await JobsApi.get("/");
  return data;
};

export const getUnapprovedJobs = async () => {
  const { data } = await JobsApi.get("/unapproved");
  return data;
};

export const getJobRegistrations = async (jobId) => {
  const { data } = await JobsApi.get(`/${jobId}/registrations`);
  return data;
};

export const getJobDetail = async (jobId) => {
  const { data } = await JobsApi.get(`/${jobId}`);
  return data;
};

export const postJobRegistration = async (jobId) => {
  const { data } = await JobsApi.post(`/${jobId}/registrations`);
  return data;
};

export const postJob = async () => {
  const { data } = await JobsApi.post("/");
  return data;
};

export const updateJob = async (jobId) => {
  const { data } = await JobsApi.patch(`/${jobId}`);
  return data;
};

export const deleteJob = async (jobId) => {
  const { data } = await JobsApi.delete(`/${jobId}`);
  return data;
};
