import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export default function ProtectedLayout() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
}
