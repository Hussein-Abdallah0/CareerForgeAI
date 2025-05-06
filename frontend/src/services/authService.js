import axiosBaseUrl from "../utils/axios";

export const loginUser = async (credentials) => {
  const response = await axiosBaseUrl.post("/login", credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axiosBaseUrl.post("/register", userData);
  return response.data;
};
