import React, { useState } from "react";
import { ArrowRight, Keyboard, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import "./styles.css";
import { useRef } from "react";
import { useEffect } from "react";

const Question = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const ws = useRef(null);
  const mediaRecorder = useRef(null);
  const navigate = useNavigate();

  // Initialize WebSocket connection
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onmessage = (event) => {
      const { audio, text } = JSON.parse(event.data);
      setAiResponse(text); // Display AI text response

      // Play AI audio
      const audioBlob = new Blob([audio], { type: "audio/mpeg" });
      new Audio(URL.createObjectURL(audioBlob)).play();
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, []);

  // ws.current.onmessage = (event) => {
  //   const { audio, text, transcription } = JSON.parse(event.data);
  //   setAiResponse(`You said: "${transcription}". AI replied: "${text}"`);

  //   const audioBlob = new Blob([audio], { type: "audio/mpeg" });
  //   new Audio(URL.createObjectURL(audioBlob)).play();
  // };

  // Start/stop voice recording
  const toggleRecording = async () => {
    if (!isRecording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.start();

      mediaRecorder.current.ondataavailable = (e) => {
        if (ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(e.data); // Send audio blob to Node.js BFF
        }
      };
    } else {
      mediaRecorder.current.stop();
    }
    setIsRecording(!isRecording);
  };

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
        <p>
          {currentIndex + 1}/{questions.length}
        </p>
      </div>

      <p className="question-text">{questions[currentIndex]}</p>
      {/* Display AI response */}
      {aiResponse && (
        <div className="ai-response">
          <p>AI Feedback: {aiResponse}</p>
        </div>
      )}

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
