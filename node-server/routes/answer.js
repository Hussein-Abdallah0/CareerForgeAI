const express = require("express");
const router = express.Router();
const { processAudio, processText } = require("../services/ai");

// Audio processing route
router.post("/audio", async (req, res) => {
  try {
    const { audio, questionText } = req.body;
    const result = await processAudio(Buffer.from(audio, "base64"), questionText);

    res.json({
      audio: Buffer.from(result.audio).toString("base64"),
      text: result.text,
      userText: result.userText,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Text processing route
router.post("/text", async (req, res) => {
  try {
    const { questionText, userText } = req.body;
    const result = await processText(questionText, userText);

    res.json({
      audio: Buffer.from(result.audio).toString("base64"),
      text: result.text,
      userText: result.userText,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
