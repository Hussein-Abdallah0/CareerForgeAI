import Button from "../../../components/Button";
import "./styles.css";

const ReviewForm = ({ formData, prevStep }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };
  return (
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
  );
};

export default ReviewForm;
