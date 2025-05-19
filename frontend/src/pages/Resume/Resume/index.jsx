import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Resume = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="center">
        <div className="resume">
          <h2>Tailor Your Resume with AI</h2>
          <p>Get a personalized, ATS-friendly resume crafted for your desired job</p>
          <Button text="Build Resume" onClick={() => navigate("/resume/form")} />
        </div>
        <img src="/resume/image32.jpg" alt="" />
      </div>

      <div className="instructions-section">
        <h4 className="resume-how">How It Works?</h4>
        <div className="instructions">
          <div>
            <img src="resume/image31.png" alt="" />
            <p>Fill Information</p>
          </div>
          <div>
            <img src="resume/image28.png" alt="" />
            <p>Preview Resume</p>
          </div>
          <div>
            <img src="resume/image29.png" alt="" />
            <p>Change with AI and Download</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Resume;
