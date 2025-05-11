import React, { useRef } from "react";
import Button from "../../../components/Button";
import ResumeTemplate from "../ResumeTemplate";
import html2pdf from "html2pdf.js";
import "./styles.css";

export default function ReviewForm({ formData, prevStep }) {
  const resumeRef = useRef();

  const handleDownload = () => {
    const element = resumeRef.current;

    const opt = {
      margin: 0, // Set all margins to 0
      filename: `${formData.first_name}_${formData.last_name}_Resume.pdf`,
      html2canvas: {
        scale: 4,
        dpi: 300,
        windowWidth: 794,
        useCORS: true,
        letterRendering: true,
        logging: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: {
        mode: "avoid-all",
        before: "#avoid-before-element",
      },
    };

    html2pdf().set(opt).from(element).save();
  };

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
