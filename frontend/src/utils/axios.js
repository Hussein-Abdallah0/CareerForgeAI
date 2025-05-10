import axios from "axios";

const BaseURL = "http://127.0.0.1:8000";
const Endpoint = "/api/v1";

const token = localStorage.getItem("token");

const axiosBaseUrl = axios.create({
  baseURL: `${BaseURL}${Endpoint}`,
  headers: {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export default axiosBaseUrl;
