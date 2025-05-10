// In routes or services file
const express = require("express");
const router = express.Router();
const openai = require("./openaiClient"); // your OpenAI setup
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/generate-questions", async (req, res) => {
  const { job } = req.body;

  if (!job) return res.status(400).json({ error: "Job title is required" });

  const prompt = `Generate 5 interview questions for the role of a ${job}.`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4",
    });

    const text = completion.choices[0].message.content;
    const questions = text
      .split("\n")
      .filter((q) => q.trim())
      .map((q) => q.replace(/^\d+\.\s*/, ""));

    res.json({ questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate questions" });
  }
});

module.exports = router;
