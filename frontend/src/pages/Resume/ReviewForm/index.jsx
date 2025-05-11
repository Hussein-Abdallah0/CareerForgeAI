import React, { useRef } from "react";
import Button from "../../../components/Button";
import ResumeTemplate from "../ResumeTemplate";
import html2pdf from "html2pdf.js";
import "./styles.css";

export default function ReviewForm({ formData, prevStep }) {
  const resumeRef = useRef();

  return (
    <div className="review-form">
      <h2>Review Your Resume</h2>

      <div className="resume-preview-container">
        <div ref={resumeRef} className="resume-preview" style={{ pageBreakInside: "avoid" }}>
          <ResumeTemplate formData={formData} />
        </div>
      </div>

      <div className="form-actions">
        <Button text="Back" version="border" onClick={prevStep} />
        <Button text="Download PDF" onClick={handleDownload} />
      </div>
    </div>
  );
}
