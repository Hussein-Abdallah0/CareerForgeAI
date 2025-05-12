import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import "./styles.css";

// Mock salary data based on inputs
const getSalaryData = (inputs) => {
  const baseSalaries = {
    "Software Engineer": { min: 80000, max: 150000 },
    "Product Manager": { min: 90000, max: 160000 },
    "Data Scientist": { min: 85000, max: 155000 },
    "UX Designer": { min: 70000, max: 130000 },
    "Marketing Specialist": { min: 60000, max: 110000 },
  };

  const locationMultipliers = {
    Remote: 0.9,
    "New York, NY": 1.2,
    "San Francisco, CA": 1.3,
    "Austin, TX": 1.1,
    "Chicago, IL": 1.15,
  };

  const base = baseSalaries[inputs.jobTitle] || { min: 60000, max: 120000 };
  const multiplier = locationMultipliers[inputs.location] || 1;
  const experienceBoost = inputs.experience * 2500;

  return {
    min: Math.round(base.min * multiplier + experienceBoost),
    max: Math.round(base.max * multiplier + experienceBoost),
    median: Math.round(((base.min + base.max) / 2) * multiplier + experienceBoost),
  };
};

const SalaryResults = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const salaryData = getSalaryData(state);

  return (
    <div className="salary-container">
      <div className="salary-results">
        <h2>Your Salary Estimate</h2>
        <p className="job-title">
          {state.jobTitle} ({state.experience} years experience) in {state.location}
        </p>

        <div className="salary-range">
          <div className="range-bar">
            <div className="range-min">${salaryData.min.toLocaleString()}</div>
            <div className="range-visual">
              <div className="range-track">
                <div
                  className="range-fill"
                  style={{
                    left: "0%",
                    right: `${
                      100 - ((salaryData.max - salaryData.min) / (salaryData.max * 1.2)) * 100
                    }%`,
                  }}
                ></div>
                <div
                  className="range-median"
                  style={{
                    left: `${
                      ((salaryData.median - salaryData.min) / (salaryData.max - salaryData.min)) *
                      100
                    }%`,
                  }}
                >
                  <span>Median: ${salaryData.median.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="range-max">${salaryData.max.toLocaleString()}</div>
          </div>
        </div>

        <div className="salary-insights">
          <h3>Key Insights</h3>
          <ul>
            <li>
              <strong>Location Impact:</strong> Salaries in {state.location} are typically
              {state.location === "Remote" ? " 10% lower" : " 15-30% higher"} than national
              averages.
            </li>
            <li>
              <strong>Experience Boost:</strong> With {state.experience} years of experience, you're
              in the top {state.experience > 5 ? "30%" : "60%"} of candidates.
            </li>
          </ul>
        </div>

        <div className="salary-actions">
          <Button text="Adjust Your Criteria" onClick={() => navigate("/salary/form")} secondary />
          <Button text="Download Report" onClick={() => alert("PDF generated!")} />
        </div>
      </div>
    </div>
  );
};

export default SalaryResults;
