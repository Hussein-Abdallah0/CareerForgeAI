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

  const handleJobClick = async (job) => {
    try {
      const res = await fetch("http://localhost:8080/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job }),
      });

      const data = await res.json();

      if (data.questions) {
        navigate("/interview/questions", { state: { questions: data.questions } });
      }
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  return (
    <div>
      <p className="job-title">What field do you want to practice for?</p>
      <div className="jobs">
        {jobs.map((job, index) => {
          return (
            <div key={index} className="job" onClick={() => handleJobClick(job)}>
              {job}
              <ChevronRight />
            </div>
          );
        })}
      </div>
      <a href="/interview">
        <ArrowLeft className="arrow" />
      </a>
    </div>
  );
};

export default JobTitle;
