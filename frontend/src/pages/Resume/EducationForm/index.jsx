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

export default function EducationForm() {
  const dispatch = useDispatch();
  const education = useSelector((state) => state.resume.formData.education);

  const handleEducationChange = (index, field, value, pointIndex) => {
    const path = ["education", index];

    if (field === "points") {
      dispatch(updateField({ path: [...path, "points", pointIndex], value }));
    } else {
      dispatch(updateField({ path: [...path, field], value }));
    }
  };

  const handleAddEducation = () => {
    dispatch(
      addArrayItem({
        key: "education",
        template: {
          institution: "",
          degree: "",
          startDate: "",
          endDate: "",
          points: ["", "", "", ""],
        },
      })
    );
  };

  const handleRemoveEducation = (index) => {
    if (education.length <= 1) return;
    dispatch(removeArrayItem({ key: "education", index }));
  };

  return (
    <form className="education-form">
      <h2>Education</h2>
      <div className="education-entries-container">
        {education.map((edu, eduIndex) => (
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
              {edu.points.map((point, pointIndex) => (
                <div key={pointIndex} className="point-input">
                  <textarea
                    className="education-text"
                    placeholder={`Point ${pointIndex + 1}`}
                    value={point}
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
                onClick={() => handleRemoveEducation(eduIndex)}
              >
                Remove Education
              </button>
            )}
          </div>
        ))}
      </div>

      <button type="button" className="add-btn" onClick={handleAddEducation}>
        + Add Another Education
      </button>

      <div className="form-actions">
        <Button text="Back" version="border" onClick={() => dispatch(prevStep())} />
        <Button text="Next" onClick={() => dispatch(nextStep())} />
      </div>
    </form>
  );
}
