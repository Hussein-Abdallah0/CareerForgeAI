import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export default function GuestLayout() {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Outlet />;
}
