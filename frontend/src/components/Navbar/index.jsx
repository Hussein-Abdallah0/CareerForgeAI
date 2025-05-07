import React from "react";
import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import "./styles.css";

const Navbar = ({ type }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="navbar">
      <img src="logo-title.svg" alt="logo" className="logo-title" />
      {type == "home" ? (
        <ul className="nav-ul">
          <li className="nav-link">Home</li>
          <li className="nav-link">Features</li>
          <li className="nav-link">Benefits</li>
        </ul>
      ) : (
        <ul className="nav-ul">
          <li className="nav-link">Dashboard</li>
          <li className="nav-link">Interview</li>
          <li className="nav-link">Resume</li>
          <li className="nav-link">Salary</li>
        </ul>
      )}

      {type == "home" ? (
        <div className="nav-btn">
          <Button version="primary-small" text="Login" onClick={() => navigate("/login")} />
          <Button version="border-small" text="Sign Up" onClick={() => navigate("/signup")} />
        </div>
      ) : (
        <div className="dropdown">
          <CircleUserRound className="nav-user" />
          <div className="dropdown-content">
            <a href="#" id="logout" onClick={handleLogout}>
              Log Out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
