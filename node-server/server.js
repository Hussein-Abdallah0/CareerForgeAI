import { Server } from "ws";
import { processAudio } from "./services/ai";

const wss = new Server({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("message", async (audioBlob) => {
    // Process audio → AI response
    const { audio, text } = await processAudio(audioBlob);
    ws.send(JSON.stringify({ audio, text })); // Send back AI voice+text
  });
});
