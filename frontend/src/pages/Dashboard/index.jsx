import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <h1 className="title">Welcome Back!</h1>
        <p className="text">What would you like to do today?</p>
        <div className="dash-features">
          <div className="dash-feature">
            <h2>Interview Simulator</h2>
            <p>Practice questions, get feedback and be ready for your next interview</p>
            <Button text="Start Interview" onClick={() => navigate("/interview")} />
          </div>
          <div className="dash-feature">
            <h2>Resume Tailoring</h2>
            <p>Generate tailored, ATS-friendly resumes for your dream job</p>
            <Button text="Build Resume" onClick={() => navigate("/resume")} />
          </div>
          <div className="dash-feature">
            <h2>Salary Negotiator</h2>
            <p>Explore salary benchmarks and get negotiation tips</p>
            <Button text="Analyze Salary" onClick={() => navigate("/salary")} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
