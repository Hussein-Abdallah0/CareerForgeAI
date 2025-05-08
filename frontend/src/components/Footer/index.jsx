import React from "react";
import "./styles.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content footer-top">
        <img src="logo-white.svg" alt="logo" className="logo-title" />
        <ul className="footer-ul">
          <li className="footer-link">
            <a href="/dashboard">Dashboard</a>
          </li>
          <li className="footer-link">
            <a href="">Interview</a>
          </li>
          <li className="footer-link">
            <a href="">Resume</a>
          </li>
          <li className="footer-link">
            <a href="">Salary</a>
          </li>
          <li className="footer-link">
            <a href="">Profile</a>
          </li>
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
