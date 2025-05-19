const express = require("express");
const router = express.Router();
const openai = require("./openaiClient");
const { extractJson } = require("../utils/cleanJson");

// helper to parse "MM/YYYY" into a JS Date
function parseMMYYYY(str) {
  const [month, year] = str.split("/").map((v) => parseInt(v, 10));
  return new Date(year, month - 1);
}

// helper to compute months between two dates
function diffInMonths(start, end) {
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
}

// format months into "X years and Y months" or "Z months"
function formatDuration(totalMonths) {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts = [];
  if (years) parts.push(`${years} year${years > 1 ? "s" : ""}`);
  if (months) parts.push(`${months} month${months > 1 ? "s" : ""}`);
  return parts.length ? parts.join(" and ") : "0 months";
}

router.post("/summary", async (req, res) => {
  const { personal, education, experience, projects, skills, jobDescription } = req.body;

  let totalMonths = 0;
  const expLines = experience.map((exp) => {
    const start = parseMMYYYY(exp.startDate);
    const end = exp.endDate.toLowerCase() === "present" ? new Date() : parseMMYYYY(exp.endDate);
    const months = diffInMonths(start, end);
    totalMonths += months;

    // use nice month names
    const fmtStart = start.toLocaleString("en", { month: "short", year: "numeric" });
    const fmtEnd =
      end === "present" ? "Present" : end.toLocaleString("en", { month: "short", year: "numeric" });

    return `• ${exp.position} at ${exp.company} (${fmtStart} - ${fmtEnd})`;
  });

  const experienceDuration = formatDuration(totalMonths);

  const prompt = `
You are an HR expert. Write a concise (max 3 lines) professional summary for this job(the description starts and ends with """"):

""""${jobDescription}""""

Candidate snapshot:
- Education: ${education
    .map((e) => {
      const s = parseMMYYYY(e.startDate);
      const en = parseMMYYYY(e.endDate);
      const fs = s.toLocaleString("en", { month: "short", year: "numeric" });
      const fe = en.toLocaleString("en", { month: "short", year: "numeric" });
      return `${e.degree} at ${e.institution} (${fs} - ${fe})`;
    })
    .join("; ")}
- Professional experience: ${experienceDuration}
${expLines.join("\n")}
- Projects: ${projects
    .map((p) => {
      const s = parseMMYYYY(p.startDate);
      const en = parseMMYYYY(p.endDate);
      const fs = s.toLocaleString("en", { month: "short", year: "numeric" });
      const fe = en.toLocaleString("en", { month: "short", year: "numeric" });
      return `${p.title} (${fs} - ${fe})`;
    })
    .join("; ")}
- Key skills: ${skills.map((s) => s.items.map((i) => i.name).join(", ")).join("; ")}

Keep it punchy, accurate to dates and totals, highlight strengths, echo keywords from the JD, and don't mention the candidate's name.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });
    res.json({ summary: completion.choices[0].message.content.trim() });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

// Improve bullets
router.post("/improve-bullets", async (req, res) => {
  const { experience, projects } = req.body;
  if (!Array.isArray(experience) || !Array.isArray(projects)) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  // Build prompt sections dynamically:
  const expSections = experience
    .map((exp, i) => {
      const header = `Section ${i + 1} (${exp.company}, ${exp.position}):`;
      const bullets = exp.points.map((b) => `- ${b}`).join("\n");
      return `${header}\n${bullets}`;
    })
    .join("\n\n");

  const projSections = projects
    .map((p, i) => {
      const header = `Section ${i + 1} (${p.title}):`;
      const bullets = p.points.map((b) => `- ${b}`).join("\n");
      return `${header}\n${bullets}`;
    })
    .join("\n\n");

  const prompt = `
Here are your EXPERIENCE bullet lists, one section per job:

${expSections}

And here are your PROJECT bullet lists, one section per project:

${projSections}

Please rewrite **each section's** bullets to be more action-oriented, concise, and quantified.  
Return a JSON object exactly like this (with the same keys):

\`\`\`json
{
  "experience": [
    [ /* bullets for experience #1 */ ],
    [ /* bullets for experience #2 */ ],
    /* …and so on, one array per experience entry… */
  ],
  "projects": [
    [ /* bullets for project #1 */ ],
    [ /* … */ ]
  ]
}
\`\`\`

Do **not** include any other fields, numbers, or text outside that JSON.
`;

  try {
    const gptRes = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });
    const raw = gptRes.choices[0].message.content;
    const jsonStr = extractJson(raw);
    const improved = JSON.parse(jsonStr);
    return res.json(improved);
  } catch (err) {
    console.error("AI error:", err);
    return res.status(500).json({ error: "Failed to improve bullets" });
  }
});

module.exports = router;
