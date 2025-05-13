import { useState, useRef, useEffect } from "react";

const useWebSocket = (onMessage) => {
  const [isRecording, setIsRecording] = useState(false);
  const ws = useRef(null);
  const mediaRecorder = useRef(null);
  const streamRef = useRef(null);
  const questionTextRef = useRef("");

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    return () => {
      if (ws.current) ws.current.close();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (ws.current) {
      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage(data);
      };
    }
  }, [onMessage]);

  const toggleRecording = async (questionText) => {
    if (!isRecording) {
      questionTextRef.current = questionText;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.start();

        mediaRecorder.current.ondataavailable = (e) => {
          if (ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({ questionText: questionTextRef.current }));
            ws.current.send(e.data);
          }
        };
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    } else {
      mediaRecorder.current.stop();
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsRecording((prev) => !prev);
  };

  return { isRecording, toggleRecording };
};

export default useWebSocket;
