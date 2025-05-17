import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

console.log("Frontend VITE_LARAVEL_API_URL:", import.meta.env.VITE_LARAVEL_API_URL);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
