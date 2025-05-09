import React from "react";
import "./styles.css";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobTitle = () => {
  const navigate = useNavigate();
  const jobs = [
    "Software Engineer",
    "Data Analytics",
    "IT Support",
    "UX Design",
    "Project Management",
    "Cyber Security",
  ];
  return (
    <div>
      <p className="job-title">What field do you want to tailor your resume for?</p>
      <div className="jobs">
        {jobs.map((job, index) => {
          return (
            <div key={index} className="job" onClick={() => navigate("/resume/form")}>
              {job}
              <ChevronRight />
            </div>
          );
        })}
      </div>
      <a href="/resume">
        <ArrowLeft className="arrow" />
      </a>
    </div>
  );
};

export default JobTitle;
