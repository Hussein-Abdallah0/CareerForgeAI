import axios from "axios";

// Base URL for your Node.js AI server
const BaseURL = "http://localhost:8080";

const axiosNode = axios.create({
  baseURL: BaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosNode;
