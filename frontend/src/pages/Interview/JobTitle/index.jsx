import React from "react";
import "./styles.css";
import { ArrowBigLeft, ArrowLeft, ChevronRight } from "lucide-react";
import Navbar from "../../../components/Navbar";

const JobTitle = () => {
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
      <p className="job-title">What field do you want to practice for?</p>
      <div className="jobs">
        {jobs.map((job, index) => {
          return (
            <div key={index} className="job">
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
