const express = require("express");
const WebSocket = require("ws");
const { processAudio } = require("./services/ai");
const questionsRouter = require("./routes/Questions"); // Import your router
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Mount your router
app.use("/", questionsRouter);

// Create HTTP server
const server = app.listen(8080, () => {
  console.log("Server running on port 8080");
});

// Create WebSocket server on the same port
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", async (audioBlob) => {
    console.log("Received audio blob from client");
    const { audio, text } = await processAudio(audioBlob);
    ws.send(JSON.stringify({ audio, text }));
  });
});
