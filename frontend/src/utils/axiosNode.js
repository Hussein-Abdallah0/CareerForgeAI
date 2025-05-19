import axios from "axios";

// Base URL for your Node.js AI server
const BaseURL = import.meta.env.VITE_NODE_API_URL;

const axiosNode = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosNode;
