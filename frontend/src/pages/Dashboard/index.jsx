import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import axiosBaseUrl from "../../utils/axios";
import { useEffect, useState } from "react";
import "./styles.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tips, setTips] = useState([]);

  const loadTips = async () => {
    try {
      const res = await axiosBaseUrl.get("/tips");
      setTips(res.data.payload);
    } catch (err) {
      console.error("Failed to load user", err);
    }
  };

  useEffect(() => {
    loadTips();
  }, []);

  return (
    <div className="dashboard">
      <Navbar />
      {/* ----------------1st section -------------------*/}
      <div className="dashboard1">
        <h1 className="title">Your Career Growth Starts Here</h1>
        <p className="text">Explore tools to level up your career</p>
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

      <div className="dashboard2">
        <h2 className="title">Daily Tips</h2>

        {tips.length > 0 && (
          <div className="tips">
            <div>
              <h3>Tip #{tips[0].id}</h3>
              <p>{tips[0].tip_text}</p>
            </div>
            <div>
              <h3>Tip #{tips[1].id}</h3>
              <p>{tips[1].tip_text}</p>
            </div>
          </div>
        )}
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
