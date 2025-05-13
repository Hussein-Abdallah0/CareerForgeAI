import { useState } from "react";

const useQuestionFlow = ({ questions, sessionId, navigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [aiResponses, setAiResponses] = useState({});
  const [transcriptions, setTranscriptions] = useState({});
  const [questionSpoken, setQuestionSpoken] = useState(false);

  return {
    currentIndex,
    currentQuestion,
    isRecording,
    aiResponses,
    transcriptions,
  };
};

export default useQuestionFlow;
