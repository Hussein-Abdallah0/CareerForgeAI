import React from "react";
import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    navigate("/");
  };
  return (
    <div className="navbar">
      <img src="logo-title.svg" alt="logo" className="logo-title" />
      <ul className="nav-ul">
        <li className="nav-link">Dashboard</li>
        <li className="nav-link">Interview</li>
        <li className="nav-link">Resume</li>
        <li className="nav-link">Salary</li>
      </ul>
      <div className="dropdown">
        <CircleUserRound className="nav-user" />
        <div className="dropdown-content">
          <a href="#" id="logout" onClick={handleLogout}>
            Log Out
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
