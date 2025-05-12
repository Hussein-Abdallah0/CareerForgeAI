const express = require("express");
const router = express.Router();
const openai = require("./openaiClient");

router.post("/generate-salary", async (req, res) => {
  const { jobTitle, experience, location, current_salary } = req.body;
  if (!jobTitle || experience == null || !location) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const prompt = `
You are an expert in salary markets. Given these inputs:
• Job title: ${jobTitle}
• Years of experience: ${experience}
• Location: ${location}
• Current salary: $${current_salary}

Please output a JSON object with:
1. "min": realistic minimum salary
2. "max": realistic maximum salary
3. "median": median salary
4. "insights": an array of two strings:
   - one about location impact
   - one about experience impact

Respond *strictly* in JSON, e.g.:

{
  "min": 85000,
  "max": 130000,
  "median": 105000,
  "insights": [
    "Salaries in New York are ~20% above national average.",
    "With 3 years experience, you're in the top 60% of candidates."
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
