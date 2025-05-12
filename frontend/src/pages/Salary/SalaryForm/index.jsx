import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import axios from "axios";

import "./styles.css";
import axiosBaseUrl from "../../../utils/axios";

const SalaryForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: "",
    experience: 3,
    location: "",
    current_salary: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // get ai generated salary analysis
      const res = await axios.post("http://localhost:8080/api/salary/generate-salary", formData);
      const aiResult = res.data.payload;

      // save to laravel backend
      await axiosBaseUrl.post("/analysis", {
        job_title: formData.jobTitle,
        location: formData.location,
        experience_level: formData.experience,
        current_salary: formData.current_salary,
        suggested_range: `${aiResult.min} - ${aiResult.max}`,
      });

      navigate("/salary/result", { state: { ...formData, ...res.data.payload } });
    } catch (err) {
      console.error("Salary generation error:", err);
      alert("Failed to fetch salary data.");
    } finally {
      setLoading(false);
    }
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

          <Button type="submit" text={loading ? "Calculating…" : "Calculate Salary"} />
        </form>
      </div>
    </div>
  );
};

export default SalaryForm;
