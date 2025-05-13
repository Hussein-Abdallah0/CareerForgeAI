import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const GuestRoute = ({ children }) =>
  isAuthenticated() ? <Navigate to="/dashboard" replace /> : children;

export default GuestRoute;
