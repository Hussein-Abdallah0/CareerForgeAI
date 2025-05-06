import axiosBaseUrl from "../utils/axios";

export const loginUser = async (credentials) => {
  const response = await axiosBaseUrl.post("/login", credentials);
  return response.data;
};
