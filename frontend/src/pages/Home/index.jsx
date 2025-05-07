import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./styles.css";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar type="home" />

      <div className="home1">
        <h1 className="title">Level Up Your Career With AI-Driven Tools</h1>
        <p>Practice interviews, tailor your resume, and negotiate salaries all powered by AI</p>
        <Button text="Get Started" onClick={() => navigate("/login")} />
      </div>
      <div className="home2">
        <h1 className="title">Features</h1>
        <div className="features">
          <div className="feature">
            <div className="feature-details">
              <h2>Interview Simulator</h2>
              <p>Simulate real-time voice interviews with AI and get instant feedback.</p>
              <Button version="secondary" text="Start Interview" />
            </div>
            <img src="home/image1.png" alt="" />
          </div>

          <div className="feature">
            <img src="home/image2.png" alt="" />
            <div className="feature-details">
              <h2>Resume Tailoring</h2>
              <p>Create an ATS-optimized resume tailored to your dream job.</p>
              <Button version="secondary" text="Build Resume" />
            </div>
          </div>

          <div className="feature">
            <div className="feature-details">
              <h2>Salary Negotiator</h2>
              <p>Know your worth, get market insights and pay range suggestions.</p>
              <Button version="secondary" text="Analyze Salary" />
            </div>
            <img src="home/image3.png" alt="" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
