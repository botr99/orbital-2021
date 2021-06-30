import axios from "axios";
import url from "../config/url";

export const JobsApi = axios.create({
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

export const getApprovedJobs = async ({ queryKey }) => {
  // const [, { page, limit, searchTerm, categoriesString }] = queryKey;
  const [_key, { page, limit, searchData }] = queryKey;

  const { searchTerm, categoriesString } = searchData;

  const { data } = await JobsApi.get(
    `/?page=${page}&limit=${limit}&search=${encodeURIComponent(
      searchTerm
    )}&categories=${encodeURIComponent(categoriesString)}`
  );

  return data;
};

export const getUnapprovedJobs = async ({ queryKey }) => {
  const [_key, { page, limit, searchData }] = queryKey;

  const { searchTerm, categoriesString } = searchData;

  const { data } = await JobsApi.get(
    `/unapproved/?page=${page}&limit=${limit}&search=${encodeURIComponent(
      searchTerm
    )}&categories=${encodeURIComponent(categoriesString)}`
  );

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

export const postJob = async (jobFields) => {
  const { data } = await JobsApi.post("/", jobFields);
  return data;
};

export const updateJob = async ({ jobId, jobFields }) => {
  const { data } = await JobsApi.patch(`/${jobId}`, jobFields);
  return data;
};

export const deleteJob = async (jobId) => {
  const { data } = await JobsApi.delete(`/${jobId}`);
  return data;
};
