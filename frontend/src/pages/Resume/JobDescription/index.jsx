import React from "react";
import Button from "../../../components/Button";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { updateField, nextStep, prevStep } from "../../../redux/resumeSlice";

export default function JobDescriptionForm() {
  const dispatch = useDispatch();
  const jobDescription = useSelector((state) => state.resume.formData.jobDescription);

  return (
    <div className="job-desc-form">
      <h2>Job Description</h2>
      <textarea
        className="job-input"
        placeholder="Paste the full job description here..."
        value={jobDescription}
        onChange={(e) => dispatch(updateField({ path: ["jobDescription"], value: e.target.value }))}
        rows={6}
      />
      <div className="form-actions">
        <Button text="Back" version="border" onClick={() => dispatch(prevStep())} />
        <Button
          text="Next"
          onClick={() => dispatch(nextStep())}
          disabled={!jobDescription.trim()}
        />
      </div>
    </div>
  );
}
