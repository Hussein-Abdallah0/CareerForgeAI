import { useState, useLayoutEffect } from "react";
import useWebSocket from "./useWebSocket";
import { speakWithOpenAITTS } from "../services/ttsService";
import { saveAnswer } from "../services/questionService";
import axiosNode from "../utils/axiosNode";

export default function useAnswerFlow(question) {
  const [textAnswer, setTextAnswer] = useState("");
  const [showTextInput, setShowTextInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [feedback, setFeedback] = useState("");

  // reset on new question
  useLayoutEffect(() => {
    setTextAnswer("");
    setShowTextInput(false);
    setTranscription("");
    setFeedback("");
  }, [question?.id]);

  // WebSocket path
  const handleWS = async (data) => {
    if (data.userText) {
      setTranscription(data.userText);
      await saveAnswer(question.id, data.userText);
    }
    if (data.text) {
      setFeedback(data.text);
      speakWithOpenAITTS(data.text);
    }
    if (data.audio) {
      new Audio(URL.createObjectURL(new Blob([data.audio], { type: "audio/mpeg" }))).play();
    }
  };
  const { isRecording, toggleRecording } = useWebSocket(handleWS);

  // Text path
  const submitText = async () => {
    const trimmed = textAnswer.trim();
    if (!trimmed) return;

    setIsSubmitting(true);
    try {
      await saveAnswer(question.id, trimmed);
      setTranscription(trimmed);
      const res = await axiosNode.post("/api/answer/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionText: question.text, userText: trimmed }),
      });
      const data = await res.json();
      if (data.text) {
        setFeedback(data.text);
        speakWithOpenAITTS(data.text);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleKeyboard = () => {
    if (isRecording) toggleRecording();
    setShowTextInput((v) => !v);
  };

  return {
    isRecording,
    toggleRecording,
    showTextInput,
    toggleKeyboard,
    textAnswer,
    setTextAnswer,
    isSubmitting,
    submitText,
    transcription,
    feedback,
  };
}
