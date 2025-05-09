import React, { useState } from "react";
import { ArrowRight, Keyboard, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import "./styles.css";

const Question = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      console.log(currentIndex);
      setCurrentIndex(currentIndex + 1);
    }
  };
  const questions = [
    "What is your name?",
    "What field do you want to work in?",
    "How many years of experience do you have?",
    "What field do you want to work in?",
    "What is your name?",
  ];
  return (
    <div className="question-div">
      <div className="number">
        <p>{currentIndex + 1}/5</p>
      </div>

      <p className="question-text">{questions[currentIndex]}</p>

      <div className="buttons">
        <div className="left-btn">
          <Button
            text={
              <span>
                Answer <Mic size={24} />
              </span>
            }
          />
          <button className="keyboard-btn">
            <Keyboard />
          </button>
        </div>
        {currentIndex === 4 ? (
          <button className="keyboard-btn" onClick={() => navigate("/interview/result")}>
            End
          </button>
        ) : (
          <button className="keyboard-btn" onClick={() => goNext()}>
            <ArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;
