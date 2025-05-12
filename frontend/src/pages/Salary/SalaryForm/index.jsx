import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import "./styles.css";

const SalaryForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: "",
    experience: 3,
    location: "",
    current_salary: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/salary/result", { state: formData });
  };

  return (
    <div className="salary-container">
      <div className="salary-form">
        <h2>Salary Estimator</h2>
        <p>Get personalized salary data based on your role and experience</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Input
              label="Job Title"
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              placeholder="Job Title"
            />
          </div>

          <div className="form-group">
            <label>Years of Experience: {formData.experience}</label>
            <input
              type="range"
              min="0"
              max="20"
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
            />
          </div>

          <div className="form-group">
            <Input
              label="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Location"
            />
          </div>

          <div className="form-group">
            <Input
              label="Current Salary"
              value={formData.current_salary}
              onChange={(e) => setFormData({ ...formData, current_salary: e.target.value })}
            />
          </div>

          <Button type="submit" text="Calculate Salary" />
        </form>
      </div>
    </div>
  );
};

export default SalaryForm;
