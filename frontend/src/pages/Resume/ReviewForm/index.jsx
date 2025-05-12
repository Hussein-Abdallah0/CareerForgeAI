import React, { useEffect, useRef, useState } from "react";
import Button from "../../../components/Button";
import ResumeTemplate from "../ResumeTemplate";
import html2pdf from "html2pdf.js";
import axios from "axios";
import "./styles.css";

export default function ReviewForm({ formData, prevStep }) {
  const resumeRef = useRef();
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  const fetchSummary = async () => {
    setLoadingSummary(true);
    try {
      const res = await axios.post("/api/resume/summary", {
        personal: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
        },
        education: formData.education,
        experience: formData.experience,
        projects: formData.projects,
        skills: formData.skills,
      });
      setSummary(res.data.summary);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSummary(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

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
      <div className="ai-summary">
        <h3>Professional Summary</h3>
        {loadingSummary ? <p>Generating…</p> : <p>{summary}</p>}
        <Button
          text="Regenerate Summary"
          version="secondary-small"
          onClick={fetchSummary}
          disabled={loadingSummary}
        />
      </div>

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
