import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import SkillsInput from "../SkillsInput";
import "./styles.css";
import PersonalInfoForm from "../PersonalInfoForm";
import EducationForm from "../EducationForm";
import ExperienceForm from "../ExperienceForm";
import ProjectsForm from "../ProjectsForm";
import ReviewForm from "../ReviewForm";

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

  // Step names for the progress indicator
  const steps = ["Personal Info", "Education", "Experience", "Projects", "Skills", "Review"];

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
          <PersonalInfoForm formData={formData} handleChange={handleChange} nextStep={nextStep} />
        )}

        {step === 2 && (
          <EducationForm
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {step === 3 && (
          <ExperienceForm
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {step === 4 && (
          <ProjectsForm
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {step === 5 && (
          <SkillsInput
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {step === 6 && <ReviewForm formData={formData} prevStep={prevStep} />}
      </div>
    </div>
  );
}

export default ResumeBuilderForm;
