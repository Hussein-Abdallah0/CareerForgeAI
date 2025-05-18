import { useState } from "react";
import axiosBaseUrl from "../../utils/axios";
import Navbar from "../../components/Navbar";
import "./styles.css";

export default function AddTip() {
  const [text, setText] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await axiosBaseUrl.post("/tip", { tip_text: text });
      setSuccess("Tip saved!");
      setText("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save tip.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="tip">
      <Navbar />
      <h1>Create a New Tip</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your tip here…"
          rows={4}
          required
        />
        <button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save Tip"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
}
