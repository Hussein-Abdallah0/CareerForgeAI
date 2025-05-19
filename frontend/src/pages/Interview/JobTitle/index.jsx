import React, { useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useInterviewSession } from "../../../hooks/useInterviewSession";
import "./styles.css";

export default function JobTitle() {
  const jobs = [
    "Software Engineer",
    "Data Analytics",
    "IT Support",
    "UX Design",
    "Project Management",
    "Cyber Security",
  ];
  const [custom, setCustom] = useState("");
  const { loading, start } = useInterviewSession();
  const [videoEnabled, setVideoEnabled] = useState(false);

  const handle = (job) => {
    if (!loading) start(job, videoEnabled);
  };

  return (
    <div>
      <p className="job-p">What field do you want to practice for?</p>
      <div className="arrow-div">
        <Link to="/interview">
          <ArrowLeft className="arrow" />
        </Link>
        <div className="jobs">
          {jobs.map((job, i) => (
            <div key={i} className={`job ${loading ? "disabled" : ""}`} onClick={() => handle(job)}>
              {job}
              <ChevronRight />
            </div>
          ))}
        </div>
      </div>
      <div className="custom-job-input">
        <Input
          placeholder="Enter your field..."
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
        />
        <Button
          version="secondary-small"
          onClick={() => custom.trim() && handle(custom.trim())}
          text="Start"
        />
      </div>
      {loading && <p className="loading">Fetching questions, please wait...</p>}

      {/* Video toggle */}
      <div className="video-toggle">
        <label>
          <input
            type="checkbox"
            checked={videoEnabled}
            onChange={() => setVideoEnabled((v) => !v)}
          />{" "}
          Enable video interview
        </label>
      </div>
    </div>
  );
}
