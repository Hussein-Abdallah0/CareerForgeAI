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

// Improve bullets
router.post("/improve-bullets", async (req, res) => {
  const { bullets } = req.body; // Array<string>
  if (!Array.isArray(bullets)) return res.status(400).json({ error: "Invalid bullets" });

  const prompt = `
    Here are some resume bullet points. Rewrite each to be more action-oriented, concise, and quantify where possible.
    Original:
    ${bullets.map((b, i) => `${i + 1}. ${b}`).join("\n")}

    Return a JSON array of the improved bullets, in the same order.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });
    // Assume response is JSON array
    const improved = JSON.parse(completion.choices[0].message.content);
    res.json({ improved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to improve bullets" });
  }
});

module.exports = router;
