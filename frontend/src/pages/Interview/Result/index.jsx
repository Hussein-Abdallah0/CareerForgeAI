import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import "./styles.css";

const Result = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="result">
        <img src="/interview/image17.png" alt="" />
        <h2 className="result-header">Interview Complete! Lets Review.</h2>
        <p className="result-text">
          Review the feedback for each question below.
          <br /> Try to reflect on what you said from the perspective of an interviewer.
          <br /> Spot areas to improve - then give it another go!
        </p>

        <div className="results">
          {/*------------------------------------ question 1 ---------------------------------*/}
          <div className="result-div">
            <p className="result-number">1/5</p>
            <p className="result-question border-bottom">Can you tell me about yourself?</p>

            <div className="result-section border-bottom">
              <h4 className="result-title">Your Answer</h4>
              <p className="result-answer">
                I'm a recent computer science graduate with passion for building smart, user focused
                web apps. Lately, I've been working on AI-powered career tools to help people
                prepare job applications.
              </p>
            </div>

            <div className="result-section">
              <h4 className="result-title">Feedback</h4>
              <p className="result-feedback">
                Great start! Try adding a brief mention of your key skills or achievements to make
                it more impactful.
              </p>
            </div>
          </div>
          {/*------------------------------------ question 2 ---------------------------------*/}
          <div className="result-div">
            <p className="result-number">1/5</p>
            <p className="result-question border-bottom">Can you tell me about yourself?</p>

            <div className="result-section border-bottom">
              <h4 className="result-title">Your Answer</h4>
              <p className="result-answer">
                I'm a recent computer science graduate with passion for building smart, user focused
                web apps. Lately, I've been working on AI-powered career tools to help people
                prepare job applications.
              </p>
            </div>

            <div className="result-section">
              <h4 className="result-title">Feedback</h4>
              <p className="result-feedback">
                Great start! Try adding a brief mention of your key skills or achievements to make
                it more impactful.
              </p>
            </div>
          </div>
          {/*------------------------------------ question 3 ---------------------------------*/}
          <div className="result-div">
            <p className="result-number">1/5</p>
            <p className="result-question border-bottom">Can you tell me about yourself?</p>

            <div className="result-section border-bottom">
              <h4 className="result-title">Your Answer</h4>
              <p className="result-answer">
                I'm a recent computer science graduate with passion for building smart, user focused
                web apps. Lately, I've been working on AI-powered career tools to help people
                prepare job applications.
              </p>
            </div>

            <div className="result-section">
              <h4 className="result-title">Feedback</h4>
              <p className="result-feedback">
                Great start! Try adding a brief mention of your key skills or achievements to make
                it more impactful.
              </p>
            </div>
          </div>

          <div className="end-session">
            <Button version="secondary" text="End Session" onClick={() => navigate("/interview")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
