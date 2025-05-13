import { useRef, useState } from "react";
import useWebSocket from "./useWebSocket";
import { speakWithOpenAITTS } from "../services/ttsService";
import { saveAnswer } from "../services/questionService";

const useQuestionFlow = ({ questions, sessionId, navigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [aiResponses, setAiResponses] = useState({});
  const [transcriptions, setTranscriptions] = useState({});
  const [questionSpoken, setQuestionSpoken] = useState(false);

  const mediaRecorder = useRef(null);
  const ws = useWebSocket({
    onMessage: async ({ audio, text, userText }) => {
      if (text) {
        speakWithOpenAITTS(text);
        setAiResponses((prev) => ({ ...prev, [currentIndex]: text }));
      }

      if (userText) {
        setTranscriptions((prev) => ({ ...prev, [currentIndex]: userText }));
        if (currentQuestion?.id) await saveAnswer(currentQuestion.id, userText);
      }

      if (audio) {
        const audioBlob = new Blob([audio], { type: "audio/mpeg" });
        const audioUrl = URL.createObjectURL(audioBlob);
        new Audio(audioUrl).play();
      }
    },
  });

  return {
    currentIndex,
    currentQuestion,
    isRecording,
    aiResponses,
    transcriptions,
  };
};

export default useQuestionFlow;
