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

      <div className="instructions-section">
        <h4 className="interview-how">How It Works?</h4>
        <div className="instructions">
          <div>
            <img src="resume/image14.png" alt="" />
            <p>Pick field of work</p>
          </div>
          <div>
            <img src="resume/image16.png" alt="" />
            <p>Answer questions</p>
          </div>
          <div>
            <img src="resume/image15.png" alt="" />
            <p>Get feedback</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Interview;
