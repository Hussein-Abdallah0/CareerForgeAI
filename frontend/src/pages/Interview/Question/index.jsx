import React from "react";
import { ArrowRight, Keyboard, Mic } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../../components/Button";
import useQuestionFlow from "./useQuestionFlow";
import "./styles.css";

const Question = () => {
  const navigate = useNavigate();
  const { sessionId, questions } = useLocation().state || {};
  const {
    currentIndex,
    currentQuestion,
    isRecording,
    aiResponses,
    toggleRecording,
    goNext,
    endInterview,
  } = useQuestionFlow({ questions, sessionId, navigate });

  return (
    <div>
      <div className="question-div">
        <div className="number">
          <p>
            {currentIndex + 1}/{questions.length}
          </p>
        </div>

        <p className="question-text">{currentQuestion?.text}</p>

        <div className="buttons">
          <div className="left-btn">
            <Button
              text={
                <span>
                  {isRecording ? "Stop" : "Answer"} <Mic size={24} />
                </span>
              }
              onClick={toggleRecording}
            />
            <button className="keyboard-btn">
              <Keyboard />
            </button>
          </div>
          {currentIndex === questions.length - 1 ? (
            <button className="keyboard-btn" onClick={endInterview}>
              End
            </button>
          ) : (
            <button className="keyboard-btn" onClick={goNext}>
              <ArrowRight />
            </button>
          )}
        </div>
      </div>

      {aiResponses[currentIndex] && (
        <div className="ai-response">
          <h3>AI Feedback:</h3>
          <p>{aiResponses[currentIndex]}</p>
        </div>
      )}
    </div>
  );
};

export default Question;
