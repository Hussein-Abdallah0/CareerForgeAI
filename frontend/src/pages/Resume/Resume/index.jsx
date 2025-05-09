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

      <div className="interview">
        <h2>Tailor Your Resume with AI</h2>
        <p>Get a personalized, ATS-friendly resume crafted for your desired job</p>
        <Button text="Build Resume" onClick={() => navigate("/resume/start")} />
      </div>

      <Footer />
    </div>
  );
};

export default Resume;
