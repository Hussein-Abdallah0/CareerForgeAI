import React, { useEffect, useRef, useState } from "react";
import Button from "../../../components/Button";
import ResumeTemplate from "../ResumeTemplate";
import html2pdf from "html2pdf.js";
import axios from "axios";
import "./styles.css";

export default function ReviewForm({ formData, prevStep }) {
  const resumeRef = useRef();
  const hasFetchedSummary = useRef(false); // fix: track first fetch
  const [draftData, setDraftData] = useState(formData);
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingImprove, setLoadingImprove] = useState(false);

  const fetchSummary = async () => {
    setLoadingSummary(true);
    try {
      const res = await axios.post("http://localhost:8080/api/resume/summary", {
        personal: {
          first_name: draftData.first_name,
          last_name: draftData.last_name,
          email: draftData.email,
          phone: draftData.phone,
        },
        education: draftData.education,
        experience: draftData.experience,
        projects: draftData.projects,
        skills: draftData.skills,
      });
      setSummary(res.data.summary);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSummary(false);
    }
  };

  useEffect(() => {
    if (!hasFetchedSummary.current) {
      hasFetchedSummary.current = true;
      fetchSummary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const improveBullets = async () => {
    setLoadingImprove(true);
    try {
      const bullets = [
        ...draftData.experience.flatMap((e) => e.points),
        ...draftData.projects.flatMap((p) => p.points),
      ];

      const res = await axios.post("http://localhost:8080/api/resume/improve-bullets", { bullets });
      const improved = res.data.improved;

      let idx = 0;
      const newExperience = draftData.experience.map((exp) => {
        const newPoints = improved.slice(idx, idx + exp.points.length);
        idx += exp.points.length;
        return { ...exp, points: newPoints };
      });

      const newProjects = draftData.projects.map((proj) => {
        const newPoints = improved.slice(idx, idx + proj.points.length);
        idx += proj.points.length;
        return { ...proj, points: newPoints };
      });

      setDraftData({
        ...draftData,
        experience: newExperience,
        projects: newProjects,
      });
    } catch (err) {
      console.error("Failed to improve bullets:", err);
    } finally {
      setLoadingImprove(false);
    }
  };

  const handleDownload = () => {
    const element = resumeRef.current;

    const opt = {
      margin: 0,
      filename: `${draftData.first_name}_${draftData.last_name}_Resume.pdf`,
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
        <h3>Regenerate Summary</h3>
        {loadingImprove ? (
          <p>Generating Summary…</p>
        ) : (
          <p>Click below to regenerate summary if you want.</p>
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
          <p>Click below to improve your bullet points to be more action-driven and concise.</p>
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
          <ResumeTemplate formData={{ ...draftData, summary }} />
        </div>
      </div>

      <div className="form-actions">
        <Button text="Back" version="border" onClick={prevStep} />
        <Button text="Download PDF" onClick={handleDownload} />
      </div>
    </div>
  );
}
