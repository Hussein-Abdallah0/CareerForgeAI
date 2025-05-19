// src/pages/interview/Result.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import "./styles.css";

const Result = () => {
  const navigate = useNavigate();
  const {
    questions = [],
    userResponses = [],
    aiFeedback = [],
    bodyLanguageFeedback = [],
    videoEnabled = false,
  } = useLocation().state || {};

  const answered = questions
    .map((q, i) => ({
      text: q,
      answer: userResponses[i],
      feedback: aiFeedback[i],
      bodyTip: bodyLanguageFeedback[i],
    }))
    .filter((item) => item.answer && item.answer.trim() !== "");

  return (
    <div className="result">
      <img src="/interview/image17.png" alt="" />
      <h2 className="result-header">Interview Complete! Let’s Review.</h2>
      <p className="result-text">
        Review the feedback for each question you answered.
        <br /> Spot areas to improve—and then give it another go!
      </p>

      <div className="results">
        {answered.map((item, idx) => (
          <div key={idx} className="result-div">
            <p className="result-number">
              {idx + 1}/{answered.length}
            </p>
            <p className="result-question border-bottom">{item.text}</p>

            <div className="result-section border-bottom">
              <h4 className="result-title">Your Answer</h4>
              <p className="result-answer">{item.answer}</p>
            </div>

            <div className="result-section">
              <h4 className="result-title">Feedback</h4>
              <p className="result-feedback">{item.feedback || "No feedback available"}</p>
            </div>

            {videoEnabled && (
              <div className="result-section">
                <h4 className="result-title">Body-Language Tip</h4>
                <p className="result-feedback">{item.bodyTip || "No tip available"}</p>
              </div>
            )}
          </div>
        ))}

        {answered.length === 0 && <p className="no-answers">You didn’t answer any questions.</p>}

        <div className="end-session">
          <Button version="secondary" text="End Session" onClick={() => navigate("/interview")} />
        </div>
      </div>
    </div>
  );
};

export default Result;
