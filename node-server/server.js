const express = require("express");
const WebSocket = require("ws");
const { processAudio, processText } = require("./services/ai");
const questionsRouter = require("./routes/Questions");
const resumeRouter = require("./routes/resume");
const salaryRouter = require("./routes/salary");
const answerRouter = require("./routes/answer");
const bodyLangRouter = require("./routes/bodyLanguage");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Mount your router
app.use("/", questionsRouter);
app.use("/api/answer", answerRouter);
app.use("/api/resume", resumeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/body-language", bodyLangRouter);

// Create HTTP server
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Create WebSocket server on the same port
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  let currentQuestionText = "";

  ws.on("message", async (data, isBinary) => {
    if (!isBinary) {
      // First message is metadata (JSON with question text)
      try {
        const parsed = JSON.parse(data.toString());
        currentQuestionText = parsed.questionText || "";
      } catch (err) {
        console.error("Failed to parse metadata:", err);
      }
    } else {
      // This is the raw audio
      console.log("Received audio blob from client");

      try {
        const audioBuffer = Buffer.from(data);
        const { audio, text, userText } = await processAudio(audioBuffer, currentQuestionText);
        ws.send(JSON.stringify({ audio, text, userText }));
      } catch (err) {
        console.error("Failed to process audio:", err);
        ws.send(JSON.stringify({ audio: null, text: "Error processing audio", userText: "" }));
      }

      questionText = ""; // Reset after processing
    }
  });
});
