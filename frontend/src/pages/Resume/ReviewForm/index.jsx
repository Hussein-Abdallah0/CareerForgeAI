import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import ResumeTemplate from "../ResumeTemplate";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";
import { prevStep } from "../../../redux/resumeSlice";
import useResumeAI from "../../../hooks/useResumeAI";
import "./styles.css";

export default function ReviewForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((s) => s.resume.formData);
  const {
    draft,
    summary,
    loadingSummary,
    loadingImprove,
    saving,
    fetchSummary,
    improveBullets,
    saveResume,
  } = useResumeAI(formData);

  const resumeRef = useRef();

  const handleDownloadAndSave = async () => {
    html2pdf()
      .set({
        margin: 0,
        filename: `${draft.first_name}_${draft.last_name}_Resume.pdf`,
        html2canvas: { scale: 4, dpi: 300, useCORS: true, letterRendering: true, logging: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: "avoid-all", before: "#avoid-before-element" },
      })
      .from(resumeRef.current)
      .save();

    await saveResume();
  };

  return (
    <div className="review-form">
      <h2>Review Your Resume</h2>

      <div className="ai-summary">
        <h3>Regenerate Summary</h3>
        {loadingSummary ? (
          <p>Generating Summary…</p>
        ) : (
          <p>Click below to regenerate your summary.</p>
        )}
        <Button
          text="Regenerate"
          version="secondary"
          onClick={fetchSummary}
          disabled={loadingSummary}
        />
      </div>

      <div className="ai-bullets-improvement">
        <h3>Improve Experience & Project Bullets</h3>
        {loadingImprove ? (
          <p>Improving bullet points…</p>
        ) : (
          <p>Click below to make your bullets more action-driven and concise.</p>
        )}
        <Button
          text="Improve Bullets"
          version="secondary"
          onClick={improveBullets}
          disabled={loadingImprove}
        />
      </div>

      <div className="resume-preview-container">
        <div ref={resumeRef} className="resume-preview" style={{ pageBreakInside: "avoid" }}>
          <ResumeTemplate formData={{ ...draft, summary }} />
        </div>
      </div>

      <div className="form-actions">
        <Button text="Back" version="border" onClick={() => dispatch(prevStep())} />
        <Button
          text={saving ? "Saving…" : "Download"}
          onClick={handleDownloadAndSave}
          disabled={saving}
        />
        <Button text="End" version="secondary" onClick={() => navigate("/dashboard")} />
      </div>
    </div>
  );
}
