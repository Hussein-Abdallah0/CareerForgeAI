import { useRef, useEffect } from "react";

const useWebSocket = ({ onMessage }) => {
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      onMessage(parsed);
    };

    return () => {
      ws.current?.close();
    };
  }, [onMessage]);

  return ws;
};

export default useWebSocket;
