// src/pages/ResumeBuilder/ProjectsForm.jsx
import React from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  updateField,
  addArrayItem,
  removeArrayItem,
  nextStep,
  prevStep,
} from "../../../redux/resumeSlice";

export default function ProjectsForm() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.resume.formData.projects);

  const handleProjectChange = (index, field, value, pointIndex) => {
    const basePath = ["projects", index];
    if (field === "points") {
      dispatch(
        updateField({
          path: [...basePath, "points", pointIndex],
          value,
        })
      );
    } else {
      dispatch(
        updateField({
          path: [...basePath, field],
          value,
        })
      );
    }
  };

  const handleAddProject = () => {
    dispatch(
      addArrayItem({
        key: "projects",
        template: {
          title: "",
          description: "",
          startDate: "",
          endDate: "",
          points: ["", "", "", ""],
          technologies: "",
        },
      })
    );
  };

  const handleRemoveProject = (index) => {
    if (projects.length <= 1) return;
    dispatch(removeArrayItem({ key: "projects", index }));
  };

  return (
    <form className="projects-form">
      <h2>Projects</h2>
      <div className="projects-entries-container">
        {projects.map((project, projectIndex) => (
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
                className="small"
                value={project.startDate}
                onChange={(e) => handleProjectChange(projectIndex, "startDate", e.target.value)}
              />
              <Input
                type="text"
                label="End Date"
                placeholder="End Date (MM/YYYY)"
                className="small"
                value={project.endDate}
                onChange={(e) => handleProjectChange(projectIndex, "endDate", e.target.value)}
              />
            </div>

            <div className="project-points">
              <h4>Key Features/Accomplishments:</h4>
              {project.points.map((point, pointIndex) => (
                <div key={pointIndex} className="point-input">
                  <textarea
                    className="project-text"
                    placeholder={`Point ${pointIndex + 1}`}
                    rows={2}
                    value={point}
                    onChange={(e) =>
                      handleProjectChange(projectIndex, "points", e.target.value, pointIndex)
                    }
                  />
                </div>
              ))}
            </div>

            {projectIndex > 0 && (
              <button
                type="button"
                className="remove-btn"
                onClick={() => handleRemoveProject(projectIndex)}
              >
                Remove Project
              </button>
            )}
          </div>
        ))}
      </div>

      <button type="button" className="add-btn" onClick={handleAddProject}>
        + Add Another Project
      </button>

      <div className="form-actions">
        <Button text="Back" version="border" onClick={() => dispatch(prevStep())} />
        <Button text="Next" onClick={() => dispatch(nextStep())} />
      </div>
    </form>
  );
}
