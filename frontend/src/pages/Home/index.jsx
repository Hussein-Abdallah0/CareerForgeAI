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

      <Footer />
    </div>
  );
};

export default Home;
