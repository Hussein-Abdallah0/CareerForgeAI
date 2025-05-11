import React from "react";
import "./styles.css";

function ResumeTemplate({ formData }) {
  const {
    first_name,
    last_name,
    email,
    phone,
    linkdin,
    github,
    education,
    experience,
    skills,
    projects,
  } = formData;

  const staticSummary =
    "Results-driven software engineer with 3+ years of experience in full-stack development. Specialized in React and Node.js with a strong background in building scalable web applications. Passionate about clean code and efficient problem-solving.";

  return (
    <div className="resume-template">
      {/* Header Section */}
      <header className="resume-header">
        <h1>
          {first_name} {last_name}
        </h1>
        <div className="contact-info">
          {email && <span>{email}</span>}
          {phone && <span>{phone}</span>}
          {linkdin && (
            <span>
              <a
                href={linkdin.startsWith("http") ? linkdin : `https://${linkdin}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </span>
          )}
          {github && (
            <span>
              <a
                href={github.startsWith("http") ? github : `https://${github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </span>
          )}
        </div>
      </header>

      <section className="summary-section">
        <h2>Summary</h2>
        <div className="summary-content">{staticSummary}</div>
      </section>

      {/* Education Section */}
      {education.length > 0 && (
        <section className="resume-section">
          <h2>Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="section-header">
                <h3>
                  {edu.institution && <span>{edu.institution}</span>}
                  {edu.degree && <span>, {edu.degree}</span>}
                </h3>
                <div className="date-range">
                  {edu.startDate && <span>{edu.startDate}</span>}
                  {edu.endDate && <span> - {edu.endDate}</span>}
                </div>
              </div>
              <ul className="achievements-list">
                {edu.points.map((point, i) => point && <li key={i}>{point}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default ResumeTemplate;
