import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
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
  const steps = ["Personal Info", "Contact Info", "Review"];

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
          <form>
            <h2>Step 2: Contact Information</h2>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {/* Other fields */}
            <div className="form-actions">
              <button type="button" onClick={prevStep}>
                Back
              </button>
              <button type="button" onClick={nextStep}>
                Next
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <h2>Step 3: Review and Submit</h2>
            <div className="review-section">
              <h3>Personal Information</h3>
              <p>Name: {formData.name}</p>

              <h3>Contact Information</h3>
              <p>Email: {formData.email}</p>
            </div>
            <div className="form-actions">
              <button type="button" onClick={prevStep}>
                Back
              </button>
              <button type="submit">Submit</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResumeBuilderForm;
