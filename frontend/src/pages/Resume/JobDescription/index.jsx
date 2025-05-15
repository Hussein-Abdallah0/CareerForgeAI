import React from "react";
import Button from "../../../components/Button";
import "./styles.css";

export default function JobDescriptionForm({ formData, setFormData, nextStep, prevStep }) {
  return (
    <div className="job-desc-form">
      <h2>Job Description</h2>
      <textarea
        className="job-input"
        placeholder="Paste the full job description here..."
        value={formData.jobDescription}
        onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
      />
      <div className="form-actions">
        <Button text="Back" version="border" onClick={prevStep} />
        <Button text="Next" onClick={nextStep} disabled={!formData.jobDescription.trim()} />
      </div>
    </div>
  );
}
