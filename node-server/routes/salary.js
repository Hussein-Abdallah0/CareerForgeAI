const express = require("express");
const router = express.Router();
const openai = require("./openaiClient");

router.post("/generate-salary", async (req, res) => {
  const { jobTitle, experience, location, current_salary } = req.body;
  if (!jobTitle || experience == null || !location) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const prompt = `
You are an expert in salary benchmarking. Your task is to estimate realistic salary ranges for professionals based on job role, experience, and location.

Important constraints:
- The salary must be in USD/month.
- Do NOT assume US or Western salary standards.
- Base your estimate on realistic salaries in ${location}, considering its cost of living and market.
- Typical ranges in ${location} are between $400 and $2,000/month depending on profession.

Given the following:
• Job title: ${jobTitle}
• Years of experience: ${experience}
• Location: ${location}
• Current salary: $${current_salary}

Return a JSON object in this format:

{
  "min": number,      // realistic minimum monthly salary in USD
  "max": number,      // realistic maximum monthly salary in USD
  "median": number,   // midpoint of the range
  "insights": [
    "Insight about how ${location} affects salary.",
    "Insight about how ${experience} years of experience affects salary."
  ]
}
`.trim();

  try {
    const chatRes = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    // Parse the assistant’s JSON
    const text = chatRes.choices[0].message.content;
    const payload = JSON.parse(text);

    return res.json({ payload });
  } catch (err) {
    console.error("OpenAI error:", err);
    return res.status(500).json({ error: "Failed to generate salary data" });
  }
});

module.exports = router;
