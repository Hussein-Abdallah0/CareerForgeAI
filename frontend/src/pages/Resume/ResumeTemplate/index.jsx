import React from "react";
import "./styles.css";

function ResumeTemplate({ formData }) {
  const {
    first_name,
    last_name,
    email,
    phone,
    linkedin,
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
          {linkedin && (
            <span>
              <a
                href={linkedin.startsWith("http") ? linkedin : `https://${linkedin}`}
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

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className="resume-section">
          <h2>Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="section-header">
                <h3>
                  {exp.company && <span>{exp.company}</span>}
                  {exp.position && <span>, {exp.position}</span>}
                </h3>
                <div className="date-range">
                  {exp.startDate && <span>{exp.startDate}</span>}
                  {exp.endDate && <span> - {exp.endDate}</span>}
                </div>
              </div>
              <ul className="achievements-list">
                {exp.points.map((point, i) => point && <li key={i}>{point}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="resume-section">
          <h2>Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="project-item">
              <div className="section-header">
                <h3>{project.title}</h3>
                <div className="date-range">
                  {project.startDate && <span>{project.startDate}</span>}
                  {project.endDate && <span> - {project.endDate}</span>}
                </div>
              </div>
              {project.technologies && (
                <div className="technologies">
                  <strong>Technologies:</strong> {project.technologies}
                </div>
              )}
              {project.description && <p className="project-description">{project.description}</p>}
              <ul className="achievements-list">
                {project.points.map((point, i) => point && <li key={i}>{point}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="resume-section skills-section">
          <h2>Skills</h2>
          {skills.map((skillGroup, index) => (
            <div key={index} className="skill-line">
              <span className="skill-category">{skillGroup.category}</span>
              <span className="skill-items">
                {skillGroup.items.map((skill, i) => (
                  <span key={i} className="skill-item">
                    {skill.name} ({skill.level})
                  </span>
                ))}
              </span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default ResumeTemplate;
