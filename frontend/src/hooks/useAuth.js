import { useEffect, useState } from "react";
import axiosBaseUrl from "../utils/axios";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axiosBaseUrl.get("/me");
      setUser(res.data.payload);
    } catch (err) {
      console.error("Failed to load user", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return { user, loading };
};
