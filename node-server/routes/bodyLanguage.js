const express = require("express");
const router = express.Router();
const { processBodyLanguage } = require("../services/ai");

router.post("/", async (req, res) => {
  try {
    const { bodyMetrics } = req.body;
    if (!Array.isArray(bodyMetrics)) {
      return res.status(400).json({ error: "bodyMetrics must be an array" });
    }
    const tips = await processBodyLanguage(bodyMetrics);
    res.json({ tips });
  } catch (err) {
    console.error("Body-language processing error:", err);
    res.status(500).json({ error: "Failed to generate body-language tips" });
  }
});

module.exports = router;
