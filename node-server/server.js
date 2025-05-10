const WebSocket = require("ws");
const { processAudio } = require("./services/ai");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("message", async (audioBlob) => {
    console.log("🎧 Received audio blob from client");
    const { audio, text } = await processAudio(audioBlob);
    ws.send(JSON.stringify({ audio, text }));
  });
});
