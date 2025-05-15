// src/pages/ResumeBuilder/ReviewForm.jsx
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import ResumeTemplate from "../ResumeTemplate";
import html2pdf from "html2pdf.js";
import axios from "axios";
import axiosBaseUrl from "../../../utils/axios";
import { useNavigate } from "react-router-dom";
import { prevStep } from "../../../redux/resumeSlice";
import "./styles.css";

export default function ReviewForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resumeRef = useRef();
  const hasFetchedSummary = useRef(false);

  // pull the full formData from Redux
  const formData = useSelector((state) => state.resume.formData);

  // local draftData so we can improve bullets independently
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
        jobDescription: draftData.jobDescription,
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
    // we only want this on mount
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

      setDraftData({ ...draftData, experience: newExperience, projects: newProjects });
    } catch (err) {
      console.error("Failed to improve bullets:", err);
    } finally {
      setLoadingImprove(false);
    }
  };

  const mapLevelToProficiency = (level) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return 1;
      case "intermediate":
        return 2;
      case "advanced":
        return 3;
      case "expert":
        return 4;
      default:
        return 1;
    }
  };

  const saveInDatabase = async (data) => {
    try {
      const resumeResponse = await axiosBaseUrl.post("/resume", {
        summary,
        job_title: "null",
        experience: data.experience,
        education: data.education,
      });

      const skillsToSave = data.skills.flatMap((category) =>
        category.items.map((item) => ({
          name: item.name,
          proficiency: mapLevelToProficiency(item.level),
        }))
      );

      for (const skill of skillsToSave) {
        try {
          await axiosBaseUrl.post("/skill", {
            skill_name: skill.name,
            proficiency: skill.proficiency,
          });
        } catch (err) {
          console.error(`Failed to save skill ${skill.name}:`, err);
        }
      }

      return resumeResponse.data;
    } catch (err) {
      console.error("Error saving resume:", err);
    }
  };

  const handleDownload = async () => {
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
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: "avoid-all", before: "#avoid-before-element" },
    };

    html2pdf().set(opt).from(element).save();

    try {
      await saveInDatabase(draftData);
    } catch (err) {
      console.error("Failed to save data:", err);
    }
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
          <ResumeTemplate formData={{ ...draftData, summary }} />
        </div>
      </div>

      <div className="form-actions">
        <Button text="Back" version="border" onClick={() => dispatch(prevStep())} />
        <Button text="Download PDF" onClick={handleDownload} />
        <Button text="End" version="secondary" onClick={() => navigate("/dashboard")} />
      </div>
    </div>
  );
}
