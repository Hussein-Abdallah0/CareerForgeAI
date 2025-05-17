import axios from "axios";

const BaseURL = import.meta.env.VITE_LARAVEL_API_URL;
const Endpoint = "/api/v1";

const token = localStorage.getItem("token");
console.log("Frontend VITE_LARAVEL_API_URL:", import.meta.env.VITE_LARAVEL_API_URL);

const axiosBaseUrl = axios.create({
  baseURL: `${BaseURL}${Endpoint}`,
  headers: {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export default axiosBaseUrl;
