import Input from "../../../components/Input";
import Button from "../../../components/Button";
import "./styles.css";

export default function EducationForm({ formData, setFormData, nextStep, prevStep }) {
  const handleEducationChange = (index, field, value, pointIndex) => {
    const updatedEducation = [...formData.education];

    if (field === "points") {
      updatedEducation[index].points[pointIndex] = value;
    } else {
      updatedEducation[index][field] = value;
    }

    setFormData({ ...formData, education: updatedEducation });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { institution: "", degree: "", startDate: "", endDate: "", points: ["", "", "", ""] },
      ],
    });
  };

  const removeEducation = (index) => {
    if (formData.education.length <= 1) return;
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updatedEducation });
  };

  return (
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
                    placeholder={`Point ${pointIndex + 1}`}
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

      <div className="form-actions">
        <Button text="Back" version="border" onClick={prevStep} />
        <Button text="Next" onClick={nextStep} />
      </div>
    </form>
  );
}
