import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    if (questions?.[currentIndex]) {
      setCurrentQuestion(questions[currentIndex]);
      setQuestionSpoken(false);
    }
  }, [currentIndex, questions]);

  useEffect(() => {
    if (currentQuestion?.text && !questionSpoken) {
      speakWithOpenAITTS(currentQuestion.text);
      setQuestionSpoken(true);
    }
  }, [currentQuestion, questionSpoken]);

  const toggleRecording = async () => {
    if (!isRecording) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.start();

      mediaRecorder.current.ondataavailable = (e) => {
        if (ws.current?.readyState === WebSocket.OPEN) {
          ws.current.send(JSON.stringify({ questionText: currentQuestion?.text }));
          ws.current.send(e.data);
        }
      };
    } else {
      mediaRecorder.current.stop();
    }
    setIsRecording(!isRecording);
  };

  return {
    currentIndex,
    currentQuestion,
    isRecording,
    aiResponses,
    transcriptions,
    toggleRecording,
  };
};

export default useQuestionFlow;
