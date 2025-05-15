// src/pages/ResumeBuilder/ExperienceForm.jsx
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

export default function ExperienceForm() {
  const dispatch = useDispatch();
  const experience = useSelector((state) => state.resume.formData.experience);

  const handleExperienceChange = (index, field, value, pointIndex) => {
    const basePath = ["experience", index];
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

  const handleAddExperience = () => {
    dispatch(
      addArrayItem({
        key: "experience",
        template: {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          points: ["", "", "", ""],
        },
      })
    );
  };

  const handleRemoveExperience = (index) => {
    if (experience.length <= 1) return;
    dispatch(removeArrayItem({ key: "experience", index }));
  };

  return (
    <form className="experience-form">
      <h2>Experience</h2>
      <div className="experience-entries-container">
        {experience.map((exp, expIndex) => (
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
                className="small"
                value={exp.startDate}
                onChange={(e) => handleExperienceChange(expIndex, "startDate", e.target.value)}
              />
              <Input
                type="text"
                label="End Date"
                placeholder="End Date (MM/YYYY)"
                className="small"
                value={exp.endDate}
                onChange={(e) => handleExperienceChange(expIndex, "endDate", e.target.value)}
              />
            </div>

            <div className="experience-points">
              <h4>Key Responsibilities/Achievements:</h4>
              {exp.points.map((point, pointIndex) => (
                <div key={pointIndex}>
                  <textarea
                    className="experience-text"
                    placeholder={`Point ${pointIndex + 1}`}
                    rows={2}
                    value={point}
                    onChange={(e) =>
                      handleExperienceChange(expIndex, "points", e.target.value, pointIndex)
                    }
                  />
                </div>
              ))}
            </div>

            {expIndex > 0 && (
              <button
                type="button"
                className="remove-btn"
                onClick={() => handleRemoveExperience(expIndex)}
              >
                Remove Experience
              </button>
            )}
          </div>
        ))}
      </div>

      <button type="button" className="add-btn" onClick={handleAddExperience}>
        + Add Another Experience
      </button>

      <div className="form-actions">
        <Button text="Back" version="border" onClick={() => dispatch(prevStep())} />
        <Button text="Next" onClick={() => dispatch(nextStep())} />
      </div>
    </form>
  );
}
