const express = require("express");
const router = express.Router();
const openai = require("../services/openaiClient");

// Generate resume summary
router.post("/summary", async (req, res) => {
  const { personal, education, experience, projects, skills } = req.body;
  const prompt = `
    Create a professional 2–3 sentence summary for a resume based on:
    Personal: ${personal.first_name} ${personal.last_name}, ${personal.email}, ${personal.phone}
    Education: ${education.map((e) => `${e.degree} at ${e.institution}`).join("; ")}
    Experience and Projects: ${[...experience, ...projects]
      .flatMap((item) => item.points)
      .join("; ")}
    Skills: ${skills.map((s) => s.items.map((i) => i.name).join(", ")).join("; ")}.

    The tone should be concise and highlight strengths.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });
    res.json({ summary: completion.choices[0].message.content.trim() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

module.exports = router;
