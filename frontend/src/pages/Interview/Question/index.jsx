import React from "react";
import { ArrowRight, Keyboard, Mic } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../../components/Button";
import "./styles.css";
import useWebSocket from "../../../hooks/useWebSocket";
import useQuestionFlow from "../../../hooks/useQuestionFlow";
import { speakWithOpenAITTS } from "../../../services/ttsService";
import { saveAnswer, finishSession } from "../../../services/questionService";

const Question = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sessionId, questions } = location.state || {};

  const [aiResponses, setAiResponses] = React.useState({});
  const [transcriptions, setTranscriptions] = React.useState({});

  const {
    currentIndex,
    currentQuestion,
    isLastQuestion,
    goNext,
    questionSpoken,
    setQuestionSpoken,
  } = useQuestionFlow(questions);

  const handleWebSocketMessage = async (data) => {
    if (data.audio) {
      const audio = new Audio(URL.createObjectURL(new Blob([data.audio], { type: "audio/mpeg" })));
      audio.play();
    }

    if (data.text) {
      speakWithOpenAITTS(data.text);
      setAiResponses((prev) => ({ ...prev, [currentIndex]: data.text }));
    }

    if (data.userText) {
      setTranscriptions((prev) => ({ ...prev, [currentIndex]: data.userText }));
      if (currentQuestion?.id) await saveAnswer(currentQuestion.id, data.userText);
    }
  };

  const { isRecording, toggleRecording } = useWebSocket(handleWebSocketMessage);

  React.useEffect(() => {
    if (currentQuestion?.text && !questionSpoken) {
      speakWithOpenAITTS(currentQuestion.text);
      setQuestionSpoken(true);
    }
  }, [currentQuestion, questionSpoken, setQuestionSpoken]);

  const navigateToResults = async () => {
    try {
      await finishSession(sessionId, aiResponses);
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
            {currentIndex + 1}/{questions?.length}
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
              onClick={() => toggleRecording(currentQuestion?.text)}
            />
            <button className="keyboard-btn">
              <Keyboard />
            </button>
          </div>
          {isLastQuestion ? (
            <button className="keyboard-btn" onClick={navigateToResults}>
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
