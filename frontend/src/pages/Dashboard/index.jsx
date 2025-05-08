import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      <Navbar />
      {/* ----------------1st section -------------------*/}
      <div className="dashboard1">
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
      {/* ----------------2nd section -------------------*/}

      <div className="dashboard2">
        <h2 className="title">Daily Tips</h2>

        <div className="tips">
          <div>
            <h3>Tip #1</h3>
            <p>
              Start each resume bullet with a verb like 'Improved', 'Designed', or 'Led' - action
              words are powerful.
            </p>
          </div>
          <div>
            <h3>Tip #2</h3>
            <p>Always tailor your resume to each job - generic resumes get overlooked.</p>
          </div>
        </div>
      </div>

      {/* ----------------3rd section -------------------*/}

      <div className="dashboard3">
        <h2 className="title">Video Tutorials</h2>

        <div className="videos">
          <a href="https://www.youtube.com/watch?v=onUx22pgiBM">
            <div>
              <img src="dashboard/image7.png" alt="" />
              <h4> Github Profile Page Tutorial</h4>
            </div>
          </a>
          <a href="https://www.youtube.com/watch?v=R3abknwWX7k">
            <div>
              <img src="dashboard/image8.png" alt="" />
              <h4> How To Write A Better Resume</h4>
            </div>
          </a>
          <a href="https://www.youtube.com/watch?v=HG68Ymazo18">
            <div>
              <img src="dashboard/image9.png" alt="" />
              <h4> Top Interview Tips</h4>
            </div>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
