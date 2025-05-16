import { useSelector } from "react-redux";
import SkillsInput from "../SkillsInput";
import "./styles.css";
import PersonalInfoForm from "../PersonalInfoForm";
import EducationForm from "../EducationForm";
import ExperienceForm from "../ExperienceForm";
import ProjectsForm from "../ProjectsForm";
import ReviewForm from "../ReviewForm";
import JobDescriptionForm from "../JobDescription";

function ResumeBuilderForm() {
  const step = useSelector((state) => state.resume.step);

  const steps = [
    "Personal Info",
    "Education",
    "Experience",
    "Projects",
    "Skills",
    "Description",
    "Review",
  ];

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
        {step === 1 && <PersonalInfoForm />}
        {step === 2 && <EducationForm />}
        {step === 3 && <ExperienceForm />}
        {step === 4 && <ProjectsForm />}
        {step === 5 && <SkillsInput />}
        {step === 6 && <JobDescriptionForm />}
        {step === 7 && <ReviewForm />}
      </div>
    </div>
  );
}

export default ResumeBuilderForm;
