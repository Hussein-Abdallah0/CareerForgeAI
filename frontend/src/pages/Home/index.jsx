import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./styles.css";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <Navbar type="home" />

      <div className="home1">
        <h1 className="title">Supercharge Your Job Search</h1>
        <p className="text">AI-powered tools to help you land your dream job</p>
        <div className="dash-features">
          <div className="dash-feature background1">
            <h2>Interview Simulator</h2>
            <p>Practice questions, get feedback and be ready for your next interview</p>
            <Button text="Start Interview" onClick={() => navigate("/interview")} />
          </div>
          <div className="dash-feature background2">
            <h2>Resume Tailoring</h2>
            <p>Generate tailored, ATS-friendly resumes for your dream job</p>
            <Button text="Build Resume" onClick={() => navigate("/resume")} />
          </div>
          <div className="dash-feature background3">
            <h2>Salary Estimator</h2>
            <p>Explore salary benchmarks and get market insights</p>
            <Button text="Analyze Salary" onClick={() => navigate("/salary")} />
          </div>
        </div>
      </div>
      {/* ----------------2nd section -------------------*/}

      <div className="home2">
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

      <div className="home3">
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
      {/* <div className="home1">
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
              <Button
                version="secondary"
                text="Start Interview"
                onClick={() => navigate("/login")}
              />
            </div>
            <img src="home/image1.png" alt="" />
          </div>

          <div className="feature">
            <img src="home/image2.png" alt="" />
            <div className="feature-details">
              <h2>Resume Tailoring</h2>
              <p>Create an ATS-optimized resume tailored to your dream job.</p>
              <Button version="secondary" text="Build Resume" onClick={() => navigate("/login")} />
            </div>
          </div>

          <div className="feature">
            <div className="feature-details">
              <h2>Salary Negotiator</h2>
              <p>Know your worth, get market insights and pay range suggestions.</p>
              <Button
                version="secondary"
                text="Analyze Salary"
                onClick={() => navigate("/login")}
              />
            </div>
            <img src="home/image3.png" alt="" />
          </div>
        </div>
      </div>
      <div className="home2">
        <h1 className="title">Benefits</h1>
        <p>Why CareerForgeAI?</p>
        <div className="benefits">
          <div>
            <p>Save Time</p>
            <img src="home/image4.png" alt="" />
          </div>
          <div className="border">
            <p>Be Interview-ready</p>
            <img src="home/image5.png" alt="" />
          </div>
          <div>
            <p>Get Higher Offers</p>
            <img src="home/image6.png" alt="" />
          </div>
        </div>
      </div> */}

      <Footer />
    </div>
  );
};

export default Home;
