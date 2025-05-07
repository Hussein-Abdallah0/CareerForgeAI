import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import "./styles.css";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <img src="logo-title.svg" alt="logo" className="logo-title" />
      <ul className="nav-ul">
        <li className="nav-link">Home</li>
        <li className="nav-link">Features</li>
        <li className="nav-link">Benefits</li>
      </ul>
      <div className="nav-btn">
        <Button version="primary-small" text="Login" onClick={() => navigate("/login")} />
        <Button version="border-small" text="Sign Up" onClick={() => navigate("/signup")} />
      </div>
    </div>
  );
};

export default Navbar;
