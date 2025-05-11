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
  //this is for the audio to check if its question or feedback
  const [questionSpoken, setQuestionSpoken] = useState(false);

  useEffect(() => {
    if (questions && questions.length > currentIndex) {
      const question = questions[currentIndex];
      setCurrentQuestion(question);

      // Reset questionSpoken when question changes
      setQuestionSpoken(false);
    }
  }, [currentIndex, questions]);

  useEffect(() => {
    if (currentQuestion?.text && !questionSpoken) {
      speakWithOpenAITTS(currentQuestion.text);
      setQuestionSpoken(true);
    }
  }, [currentQuestion, questionSpoken]);

  // Initialize WebSocket connection
  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onmessage = async (event) => {
      const { audio, text, userText } = JSON.parse(event.data);

      if (audio) {
        const audioBlob = new Blob([audio], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(audioBlob);
        new Audio(audioUrl).play();
      }

      // Play AI feedback immediately
      if (text) {
        speakWithOpenAITTS(text);
      }
      // Then store it in state
      setAiResponses((prev) => ({
        ...prev,
        [currentIndex]: text,
      }));

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
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [currentIndex, currentQuestion]);

  // Start/stop voice recording
  const toggleRecording = async () => {
    if (!isRecording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.start();

      mediaRecorder.current.ondataavailable = (e) => {
        if (ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(
            JSON.stringify({
              questionText: currentQuestion?.text,
            })
          );
          ws.current.send(e.data);
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

  const speakWithOpenAITTS = async (text) => {
    try {
      const response = await fetch("https://api.openai.com/v1/audio/speech", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "tts-1",
          voice: "onyx",
          input: text,
        }),
      });
      //nova if you want a female interviewer

      if (!response.ok) throw new Error("TTS request failed");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (err) {
      console.error("OpenAI TTS error:", err);
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

        <p className="question-text">{questions[currentIndex]?.text}</p>

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
          <h3>AI Feedback:</h3>
          <p> {aiResponses[currentIndex]}</p>
        </div>
      )}
    </div>
  );
};

export default Question;
