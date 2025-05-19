function extractJson(content) {
  // 1) Remove code fences ```json or ```
  let cleaned = content.replace(/```json/g, "").replace(/```/g, "");
  // 2) Trim whitespace
  cleaned = cleaned.trim();
  // 3) Drop anything before first `{`
  const first = cleaned.indexOf("{");
  if (first > 0) cleaned = cleaned.slice(first);
  // 4) Drop anything after last `}`
  const last = cleaned.lastIndexOf("}");
  if (last !== -1 && last < cleaned.length - 1) cleaned = cleaned.slice(0, last + 1);
  return cleaned;
}

module.exports = { extractJson };
