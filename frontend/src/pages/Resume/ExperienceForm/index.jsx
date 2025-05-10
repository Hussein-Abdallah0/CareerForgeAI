// src/pages/ResumeBuilder/ExperienceForm.jsx
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import "./styles.css";

export default function ExperienceForm({ formData, setFormData, nextStep, prevStep }) {
  const handleExperienceChange = (index, field, value, pointIndex) => {
    const updatedExperience = [...formData.experience];

    if (field === "points") {
      updatedExperience[index].points[pointIndex] = value;
    } else {
      updatedExperience[index][field] = value;
    }

    setFormData({ ...formData, experience: updatedExperience });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...formData.experience,
        { company: "", position: "", startDate: "", endDate: "", points: ["", "", "", ""] },
      ],
    });
  };

  const removeExperience = (index) => {
    if (formData.experience.length <= 1) return;
    const updatedExperience = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updatedExperience });
  };

  return (
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
                onChange={(e) => handleExperienceChange(expIndex, "startDate", e.target.value)}
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

            <div>
              <h4>Key Responsibilities/Achievements:</h4>
              {[0, 1, 2, 3].map((pointIndex) => (
                <div key={pointIndex}>
                  <textarea
                    className="experience-text"
                    placeholder={`Point ${pointIndex + 1}`}
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
  );
}
