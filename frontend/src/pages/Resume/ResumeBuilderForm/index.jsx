import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import SkillsInput from "../SkillsInput";
import "./styles.css";

function ResumeBuilderForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    linkdin: "",
    github: "",
    education: [
      { institution: "", degree: "", startDate: "", endDate: "", points: ["", "", "", ""] },
    ],
    experience: [
      { company: "", position: "", startDate: "", endDate: "", points: ["", "", "", ""] },
    ],
    skills: [
      {
        category: "Programming Languages",
        items: [
          { name: "JavaScript", level: "Intermediate" },
          { name: "Python", level: "Beginner" },
        ],
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        points: ["", "", "", ""],
        technologies: "",
      },
    ],
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  // Step names for the progress indicator
  const steps = ["Personal Info", "Education", "Experience", "Skills", "Projects", "Review"];

  // Handle education field changes
  const handleEducationChange = (index, field, value, pointIndex) => {
    const updatedEducation = [...formData.education];

    if (field === "points") {
      updatedEducation[index].points[pointIndex] = value;
    } else {
      updatedEducation[index][field] = value;
    }

    setFormData({ ...formData, education: updatedEducation });
  };

  // Add new education entry
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { institution: "", degree: "", startDate: "", endDate: "", points: ["", "", "", ""] },
      ],
    });
  };

  // Remove education entry
  const removeEducation = (index) => {
    if (formData.education.length <= 1) return; // Keep at least one
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updatedEducation });
  };

  // Handle experience field changes
  const handleExperienceChange = (index, field, value, pointIndex) => {
    const updatedExperience = [...formData.experience];

    if (field === "points") {
      updatedExperience[index].points[pointIndex] = value;
    } else {
      updatedExperience[index][field] = value;
    }

    setFormData({ ...formData, experience: updatedExperience });
  };

  // Add new experience entry
  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        { company: "", position: "", startDate: "", endDate: "", points: ["", "", "", ""] },
      ],
    });
  };

  // Remove experience entry
  const removeExperience = (index) => {
    if (formData.experience.length <= 1) return;
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updatedExperience });
  };

  // Handle projects field changes
  const handleProjectChange = (index, field, value, pointIndex) => {
    const updatedProjects = [...formData.projects];

    if (field === "points") {
      updatedProjects[index].points[pointIndex] = value;
    } else {
      updatedProjects[index][field] = value;
    }

    setFormData({ ...formData, projects: updatedProjects });
  };

  // Add new project entry
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        {
          title: "",
          description: "",
          startDate: "",
          endDate: "",
          points: ["", "", "", ""],
          technologies: "",
        },
      ],
    });
  };

  // Remove project entry
  const removeProject = (index) => {
    if (formData.projects.length <= 1) return;
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updatedProjects });
  };

  return (
    <div className="multi-step-form">
      {/* Progress Indicator */}
      <div className="progress-indicator">
        {steps.map((stepName, index) => (
          <div key={index} className="step-container">
            <div
              className={`step-circle ${step > index + 1 ? "completed" : ""} ${
                step === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </div>
            <div className={`step-label ${step === index + 1 ? "active" : ""}`}>{stepName}</div>
            {index < steps.length - 1 && (
              <div className={`step-connector ${step > index + 1 ? "completed" : ""}`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="form-content">
        {step === 1 && (
          <form>
            <h2>Personal Information</h2>
            <div className="flex">
              <Input
                label="First Name"
                placeholder="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
              <Input
                label="Last Name"
                placeholder="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            <div className="flex">
              <Input
                label="Email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                label="Phone Number"
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="flex">
              <Input
                label="LinkedIn"
                placeholder="LinkedIn"
                name="linkdin"
                value={formData.linkdin}
                onChange={handleChange}
              />
              <Input
                label="Github"
                placeholder="Github"
                name="github"
                value={formData.github}
                onChange={handleChange}
              />
            </div>
            {/* Other fields */}
            <div className="form-actions right">
              <Button text="Next" onClick={nextStep} />
            </div>
          </form>
        )}

        {step === 2 && (
          <form className="education-form">
            <h2>Education</h2>
            <div className="education-entries-container">
              {formData.education.map((edu, eduIndex) => (
                <div key={eduIndex} className="education-entry">
                  <h3>Education #{eduIndex + 1}</h3>

                  <Input
                    type="text"
                    label="Institution"
                    placeholder="Institution"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(eduIndex, "institution", e.target.value)}
                  />
                  <Input
                    type="text"
                    label="Degree"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(eduIndex, "degree", e.target.value)}
                  />

                  <div className="date-inputs">
                    <Input
                      type="text"
                      label="Start Date"
                      placeholder="Start Date (MM/YYYY)"
                      value={edu.startDate}
                      onChange={(e) => handleEducationChange(eduIndex, "startDate", e.target.value)}
                      className="small"
                    />
                    <Input
                      type="text"
                      label="End Date"
                      placeholder="End Date (MM/YYYY)"
                      value={edu.endDate}
                      onChange={(e) => handleEducationChange(eduIndex, "endDate", e.target.value)}
                      className="small"
                    />
                  </div>

                  <div className="education-points">
                    <h4>Key Achievements/Points:</h4>
                    {[0, 1, 2, 3].map((pointIndex) => (
                      <div key={pointIndex} className="point-input">
                        <textarea
                          className="education-text"
                          placeholder={`Point ${
                            pointIndex + 1
                          } (e.g., GPA 3.8, Dean's List, Thesis on...)`}
                          value={edu.points[pointIndex]}
                          onChange={(e) =>
                            handleEducationChange(eduIndex, "points", e.target.value, pointIndex)
                          }
                          rows={2}
                        />
                      </div>
                    ))}
                  </div>

                  {eduIndex > 0 && (
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeEducation(eduIndex)}
                    >
                      Remove Education
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button type="button" className="add-btn" onClick={addEducation}>
              + Add Another Education
            </button>
            {/* <Button text="+ Add Another Education" version="secondary" onClick={addEducation} /> */}

            <div className="form-actions">
              <Button text="Back" version="border" onClick={prevStep} />

              <Button text="Next" onClick={nextStep} />
            </div>
          </form>
        )}

        {step === 3 && (
          <form className="experience-form">
            <h2>Experience</h2>
            <div className="experience-entries-container">
              {formData.experience.map((exp, expIndex) => (
                <div key={expIndex} className="experience-entry">
                  <h3>Experience #{expIndex + 1}</h3>

                  <Input
                    type="text"
                    label="Company"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(expIndex, "company", e.target.value)}
                  />
                  <Input
                    type="text"
                    label="Position"
                    placeholder="Position"
                    value={exp.position}
                    onChange={(e) => handleExperienceChange(expIndex, "position", e.target.value)}
                  />

                  <div className="date-inputs">
                    <Input
                      type="text"
                      label="Start Date"
                      placeholder="Start Date (MM/YYYY)"
                      value={exp.startDate}
                      onChange={(e) =>
                        handleExperienceChange(expIndex, "startDate", e.target.value)
                      }
                      className="small"
                    />
                    <Input
                      type="text"
                      label="End Date"
                      placeholder="End Date (MM/YYYY)"
                      value={exp.endDate}
                      onChange={(e) => handleExperienceChange(expIndex, "endDate", e.target.value)}
                      className="small"
                    />
                  </div>

                  <div className="experience-points">
                    <h4>Key Responsibilities/Achievements:</h4>
                    {[0, 1, 2, 3].map((pointIndex) => (
                      <div key={pointIndex} className="point-input">
                        <textarea
                          className="experience-text"
                          placeholder={`Point ${
                            pointIndex + 1
                          } (e.g., Led team of 5 developers, Increased performance by 20%)`}
                          value={exp.points[pointIndex]}
                          onChange={(e) =>
                            handleExperienceChange(expIndex, "points", e.target.value, pointIndex)
                          }
                          rows={2}
                        />
                      </div>
                    ))}
                  </div>

                  {expIndex > 0 && (
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeExperience(expIndex)}
                    >
                      Remove Experience
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button type="button" className="add-btn" onClick={addExperience}>
              + Add Another Experience
            </button>

            <div className="form-actions">
              <Button text="Back" version="border" onClick={prevStep} />
              <Button text="Next" onClick={nextStep} />
            </div>
          </form>
        )}

        {step === 4 && (
          <div className="skills-form-container">
            <SkillsInput formData={formData} setFormData={setFormData} />
            <div className="form-actions">
              <Button text="Back" version="border" onClick={prevStep} />
              <Button text="Next" onClick={nextStep} />
            </div>
          </div>
        )}

        {step === 5 && (
          <form className="projects-form">
            <h2>Projects</h2>
            <div className="projects-entries-container">
              {formData.projects.map((project, projectIndex) => (
                <div key={projectIndex} className="project-entry">
                  <h3>Project #{projectIndex + 1}</h3>

                  <Input
                    type="text"
                    label="Project Title"
                    placeholder="Project Title"
                    value={project.title}
                    onChange={(e) => handleProjectChange(projectIndex, "title", e.target.value)}
                  />

                  <Input
                    type="text"
                    label="Description"
                    placeholder="Brief description"
                    value={project.description}
                    onChange={(e) =>
                      handleProjectChange(projectIndex, "description", e.target.value)
                    }
                  />

                  <Input
                    type="text"
                    label="Technologies Used"
                    placeholder="e.g., React, Node.js, MongoDB"
                    value={project.technologies}
                    onChange={(e) =>
                      handleProjectChange(projectIndex, "technologies", e.target.value)
                    }
                  />

                  <div className="date-inputs">
                    <Input
                      type="text"
                      label="Start Date"
                      placeholder="Start Date (MM/YYYY)"
                      value={project.startDate}
                      onChange={(e) =>
                        handleProjectChange(projectIndex, "startDate", e.target.value)
                      }
                      className="small"
                    />
                    <Input
                      type="text"
                      label="End Date"
                      placeholder="End Date (MM/YYYY)"
                      value={project.endDate}
                      onChange={(e) => handleProjectChange(projectIndex, "endDate", e.target.value)}
                      className="small"
                    />
                  </div>

                  <div className="project-points">
                    <h4>Key Features/Accomplishments:</h4>
                    {[0, 1, 2, 3].map((pointIndex) => (
                      <div key={pointIndex} className="point-input">
                        <textarea
                          className="project-text"
                          placeholder={`Point ${
                            pointIndex + 1
                          } (e.g., Implemented user authentication, Improved performance by 30%)`}
                          value={project.points[pointIndex]}
                          onChange={(e) =>
                            handleProjectChange(projectIndex, "points", e.target.value, pointIndex)
                          }
                          rows={2}
                        />
                      </div>
                    ))}
                  </div>

                  {projectIndex > 0 && (
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeProject(projectIndex)}
                    >
                      Remove Project
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button type="button" className="add-btn" onClick={addProject}>
              + Add Another Project
            </button>

            <div className="form-actions">
              <Button text="Back" version="border" onClick={prevStep} />
              <Button text="Next" onClick={nextStep} />
            </div>
          </form>
        )}

        {step === 6 && (
          <form onSubmit={handleSubmit} className="review-form">
            <h2>Review Your Resume</h2>

            {/* Personal Information */}
            <div className="review-section">
              <h3 className="section-title">Personal Information</h3>
              <div className="review-grid">
                <div className="review-item">
                  <span className="review-label">Full Name:</span>
                  <span className="review-value">
                    {formData.first_name} {formData.last_name}
                  </span>
                </div>
                <div className="review-item">
                  <span className="review-label">Email:</span>
                  <span className="review-value">{formData.email}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">Phone:</span>
                  <span className="review-value">{formData.phone}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">LinkedIn:</span>
                  <span className="review-value">{formData.linkdin || "Not provided"}</span>
                </div>
                <div className="review-item">
                  <span className="review-label">GitHub:</span>
                  <span className="review-value">{formData.github || "Not provided"}</span>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="review-section">
              <h3 className="section-title">Education</h3>
              {formData.education.map((edu, index) => (
                <div key={index} className="review-item-group">
                  <div className="review-item">
                    <span className="review-label">Institution:</span>
                    <span className="review-value">{edu.institution}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Degree:</span>
                    <span className="review-value">{edu.degree}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Duration:</span>
                    <span className="review-value">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  {edu.points.filter((p) => p.trim() !== "").length > 0 && (
                    <div className="review-item">
                      <span className="review-label">Achievements:</span>
                      <ul className="review-list">
                        {edu.points
                          .filter((p) => p.trim() !== "")
                          .map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                      </ul>
                    </div>
                  )}
                  {index < formData.education.length - 1 && <hr className="section-divider" />}
                </div>
              ))}
            </div>

            {/* Experience */}
            <div className="review-section">
              <h3 className="section-title">Experience</h3>
              {formData.experience.map((exp, index) => (
                <div key={index} className="review-item-group">
                  <div className="review-item">
                    <span className="review-label">Company:</span>
                    <span className="review-value">{exp.company}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Position:</span>
                    <span className="review-value">{exp.position}</span>
                  </div>
                  <div className="review-item">
                    <span className="review-label">Duration:</span>
                    <span className="review-value">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  {exp.points.filter((p) => p.trim() !== "").length > 0 && (
                    <div className="review-item">
                      <span className="review-label">Responsibilities:</span>
                      <ul className="review-list">
                        {exp.points
                          .filter((p) => p.trim() !== "")
                          .map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                      </ul>
                    </div>
                  )}
                  {index < formData.experience.length - 1 && <hr className="section-divider" />}
                </div>
              ))}
            </div>

            {/* Projects */}
            <div className="review-section">
              <h3 className="section-title">Projects</h3>
              {formData.projects.map((project, index) => (
                <div key={index} className="review-item-group">
                  <div className="review-item">
                    <span className="review-label">Title:</span>
                    <span className="review-value">{project.title}</span>
                  </div>
                  {project.description && (
                    <div className="review-item">
                      <span className="review-label">Description:</span>
                      <span className="review-value">{project.description}</span>
                    </div>
                  )}
                  {project.technologies && (
                    <div className="review-item">
                      <span className="review-label">Technologies:</span>
                      <span className="review-value">{project.technologies}</span>
                    </div>
                  )}
                  {project.startDate && project.endDate && (
                    <div className="review-item">
                      <span className="review-label">Duration:</span>
                      <span className="review-value">
                        {project.startDate} - {project.endDate}
                      </span>
                    </div>
                  )}
                  {project.points.filter((p) => p.trim() !== "").length > 0 && (
                    <div className="review-item">
                      <span className="review-label">Key Features:</span>
                      <ul className="review-list">
                        {project.points
                          .filter((p) => p.trim() !== "")
                          .map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                      </ul>
                    </div>
                  )}
                  {index < formData.projects.length - 1 && <hr className="section-divider" />}
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="review-section">
              <h3 className="section-title">Skills</h3>
              <div className="skills-review">
                {formData.skills.map((skillCategory, index) => (
                  <div key={index} className="skill-category-review">
                    <span className="skill-category-name">{skillCategory.category}:</span>
                    <span className="skill-items">
                      {skillCategory.items.map((item) => `${item.name} (${item.level})`).join(", ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <Button text="Back" version="border" onClick={prevStep} />
              <Button text="Generate PDF" onClick={handleSubmit} />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResumeBuilderForm;
