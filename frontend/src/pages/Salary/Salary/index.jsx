import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Salary = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />

      <div className="salary">
        <h2>Get Accurate Salary Estimates</h2>
        <p>Discover competitive salary ranges tailored to your role, experience, and location</p>
        <Button text="Check Salary" onClick={() => navigate("/salary/form")} />
      </div>

      <div className="instructions-section">
        <h4 className="salary-how">How It Works?</h4>
        <div className="instructions">
          <div>
            <img src="salary/image31.png" alt="" />
            <p>Enter Job Details</p>
          </div>
          <div>
            <img src="salary/image28.png" alt="" />
            <p>Enter Your Current Info</p>
          </div>
          <div>
            <img src="salary/image29.png" alt="" />
            <p>View Salary Range</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Salary;
