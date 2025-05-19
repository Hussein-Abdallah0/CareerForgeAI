import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Interview = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="center">
        <div className="interview">
          <h2>Practice Real-Time AI-Powered Interviews</h2>
          <p>Get instant feedback, improve your responses, and prepare for your dream role</p>
          <Button text="Start Interview" onClick={() => navigate("/interview/start")} />
        </div>
        <img src="/interview/image18.jpg" alt="" />
      </div>

      <div className="instructions-section">
        <h4 className="interview-how">How It Works?</h4>
        <div className="instructions">
          <div>
            <img src="interview/image11.png" alt="" />
            <p>Pick field of work</p>
          </div>
          <div>
            <img src="interview/image12.png" alt="" />
            <p>Answer questions</p>
          </div>
          <div>
            <img src="interview/image13.png" alt="" />
            <p>Get feedback</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Interview;
