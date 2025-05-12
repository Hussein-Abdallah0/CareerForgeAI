import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import "./styles.css";

const SalaryResults = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { jobTitle, experience, location, min, max, median, insights } = state;

  return (
    <div className="salary-container">
      <div className="salary-results">
        <h2>Your Salary Estimate</h2>
        <p className="job-title">
          {jobTitle} ({experience} years) in {location}
        </p>

        <div className="salary-range">
          <div className="range-bar">
            <div className="range-min">${min.toLocaleString()}</div>
            <div className="range-visual">
              <div className="range-track">
                <div
                  className="range-fill"
                  style={{
                    left: "0%",
                    right: `${100 - ((max - min) / (max * 1.2)) * 100}%`,
                  }}
                ></div>
                <div
                  className="range-median"
                  style={{
                    left: `${((median - min) / (max - min)) * 100}%`,
                  }}
                >
                  <span>Median: ${median.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="range-max">${max.toLocaleString()}</div>
          </div>
        </div>

        <div className="salary-insights">
          <h3>Key Insights</h3>
          <ul>
            {insights.map((insight, i) => (
              <li key={i}>{insight}</li>
            ))}
          </ul>
        </div>

        <div className="salary-actions">
          <Button text="Adjust Criteria" onClick={() => navigate("/salary/form")} secondary />
        </div>
      </div>
    </div>
  );
};

export default SalaryResults;
