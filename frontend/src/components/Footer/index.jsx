import React from "react";
import "./styles.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content footer-top">
        <img src="logo-white.svg" alt="logo" className="logo-title" />
        <ul className="footer-ul">
          <li className="footer-link">Dashboard</li>
          <li className="footer-link">Interview</li>
          <li className="footer-link">Resume</li>
          <li className="footer-link">Salary</li>
          <li className="footer-link">Profile</li>
        </ul>
      </div>
      <div className="footer-content footer-bottom">
        <p className="copyright">© 2025 CareerForgeAI. All rights reserved.</p>
        <p className="email">hussein.abdallah.dev@gmail.com</p>
      </div>
    </div>
  );
};

export default Footer;
