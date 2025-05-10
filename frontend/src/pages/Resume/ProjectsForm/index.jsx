import Input from "../../../components/Input";
import Button from "../../../components/Button";
import "./styles.css";

function ProjectsForm({ formData, setFormData, nextStep, prevStep }) {
  const handleProjectChange = (index, field, value, pointIndex) => {
    const updatedProjects = [...formData.projects];

    if (field === "points") {
      updatedProjects[index].points[pointIndex] = value;
    } else {
      updatedProjects[index][field] = value;
    }

    setFormData({ ...formData, projects: updatedProjects });
  };

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

  const removeProject = (index) => {
    if (formData.projects.length <= 1) return;
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updatedProjects });
  };

  return (
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
              onChange={(e) => handleProjectChange(projectIndex, "description", e.target.value)}
            />

            <Input
              type="text"
              label="Technologies Used"
              placeholder="e.g., React, Node.js, MongoDB"
              value={project.technologies}
              onChange={(e) => handleProjectChange(projectIndex, "technologies", e.target.value)}
            />

            <div className="date-inputs">
              <Input
                type="text"
                label="Start Date"
                placeholder="Start Date (MM/YYYY)"
                value={project.startDate}
                onChange={(e) => handleProjectChange(projectIndex, "startDate", e.target.value)}
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
                    placeholder={`Point ${pointIndex + 1}`}
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
  );
}

export default ProjectsForm;
