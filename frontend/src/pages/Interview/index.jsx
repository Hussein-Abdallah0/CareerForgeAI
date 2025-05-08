import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Interview = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />

      <div className="interview">
        <h2>Practice Real-Time AI-Powered Interviews</h2>
        <p>Get instant feedback, improve your responses, and prepare for your dream role</p>
        <Button text="Start Interview" onClick={() => navigate("/questions")} />
      </div>

      <Footer />
    </div>
  );
};

export default Interview;
