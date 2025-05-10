import React from "react";
import "./styles.css";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosBaseUrl from "../../../utils/axios";

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
      const sessionRes = await axiosBaseUrl.post("/interview", {
        job_title: job,
      });

      const sessionId = sessionRes.data.payload.id;

      const questionsRes = await fetch("http://localhost:8080/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job }),
      });

      const questionsData = await questionsRes.json();

      if (questionsData.questions) {
        // 3. Store questions in Laravel
        const questionsWithIds = await Promise.all(
          questionsData.questions.map(async (question) => {
            const res = await axiosBaseUrl.post(`/interview/${sessionId}/question`, { question });
            return {
              text: question,
              id: res.data.payload.id,
            };
          })
        );

        // 4. Navigate with both questions and session ID
        navigate("/interview/questions", {
          state: {
            questions: questionsWithIds,
            sessionId,
          },
        });
      }
    } catch (err) {
      console.error("Error:", err);
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
