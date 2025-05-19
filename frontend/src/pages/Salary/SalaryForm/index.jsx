import React from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useSalaryEstimate } from "../../../hooks/useSalaryEstimate";
import "./styles.css";

export default function SalaryForm() {
  const { form, loading, updateField, submit } = useSalaryEstimate();

  return (
    <div className="salary-container">
      <div className="salary-form">
        <h2>Salary Estimator</h2>
        <p>Get personalized salary data based on your role and experience</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className="form-group">
            <Input
              label="Job Title"
              value={form.jobTitle}
              onChange={(e) => updateField("jobTitle", e.target.value)}
              placeholder="Job Title"
            />
          </div>
          <div className="form-group">
            <label>Years of Experience: {form.experience}</label>
            <input
              type="range"
              min="0"
              max="20"
              value={form.experience}
              onChange={(e) => updateField("experience", e.target.value)}
            />
          </div>
          <div className="form-group">
            <Input
              label="Location"
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="Location"
            />
          </div>
          <div className="form-group">
            <Input
              label="Current Salary"
              value={form.currentSalary}
              onChange={(e) => updateField("currentSalary", e.target.value)}
            />
          </div>
          <Button type="submit" text={loading ? "Calculating…" : "Calculate Salary"} />
        </form>
      </div>
    </div>
  );
}
