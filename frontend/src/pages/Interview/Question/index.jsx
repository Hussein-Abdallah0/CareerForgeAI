import React, { useState } from "react";
import { ArrowRight, Keyboard, Mic } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../../components/Button";
import "./styles.css";
import { useRef } from "react";
import { useEffect } from "react";
import axiosBaseUrl from "../../../utils/axios";

const Question = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [aiResponses, setAiResponses] = useState({});
  // const [userResponses, setUserResponses] = useState({});
  const [transcriptions, setTranscriptions] = useState({});
  const ws = useRef(null);
  const mediaRecorder = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { sessionId, questions } = location.state || {};
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // Set current question when index changes
  useEffect(() => {
    if (questions && questions.length > currentIndex) {
      setCurrentQuestion(questions[currentIndex]);
    }
  }, [currentIndex, questions]);

  // Initialize WebSocket connection
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onmessage = async (event) => {
      const { audio, text, userText } = JSON.parse(event.data);
      setAiResponses((prev) => ({
        ...prev,
        [currentIndex]: text,
      })); // Display AI text response

      // Get the transcription (user's answer)
      // const transcription = await getLastTranscription();
      setTranscriptions((prev) => ({
        ...prev,
        [currentIndex]: userText,
      }));

      // Store answer in Laravel if we have the question
      if (currentQuestion?.id) {
        try {
          await axiosBaseUrl.patch(`/question/${currentQuestion.id}/answer`, {
            user_answer: userText,
          });
        } catch (err) {
          console.error("Failed to save answer:", err);
        }
      }

      // Play AI audio
      const audioBlob = new Blob([audio], { type: "audio/mpeg" });
      new Audio(URL.createObjectURL(audioBlob)).play();
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [currentIndex, currentQuestion.id]);

  // const getLastTranscription = async () => {
  //   // In a real app, you might want to store this more reliably
  //   return new Promise((resolve) => {
  //     // This is a placeholder - you'll need to track transcriptions
  //     resolve("User's recorded answer transcription");
  //   });
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

  const navigateToResults = async () => {
    try {
      // Finish session in Laravel (now using sessionId)
      await axiosBaseUrl.patch(`/interview/${sessionId}/finish`, {
        ai_feedback: JSON.stringify(aiResponses),
      });

      navigate("/interview/result", {
        state: {
          questions: questions.map((q) => q.text),
          userResponses: transcriptions,
          aiFeedback: aiResponses,
          sessionId,
        },
      });
    } catch (err) {
      console.error("Failed to finish session:", err);
    }
  };

  return (
    <div>
      <div className="question-div">
        <div className="number">
          <p>
            {currentIndex + 1}/{questions.length}
          </p>
        </div>

        <p className="question-text">{questions[currentIndex]}</p>

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
            <button className="keyboard-btn" onClick={() => navigateToResults()}>
              End
            </button>
          ) : (
            <button className="keyboard-btn" onClick={() => goNext()}>
              <ArrowRight />
            </button>
          )}
        </div>
      </div>
      {/* Display AI response */}
      {aiResponses[currentIndex] && (
        <div className="ai-response">
          <p>AI Feedback: {aiResponses[currentIndex]}</p>
        </div>
      )}
    </div>
  );
};

export default Question;
