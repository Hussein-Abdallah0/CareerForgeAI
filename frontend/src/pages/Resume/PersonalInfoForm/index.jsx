// src/pages/ResumeBuilder/PersonalInfoForm.jsx
import React from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { updateField, nextStep } from "../../../redux/resumeSlice";

export default function PersonalInfoForm() {
  const dispatch = useDispatch();
  const personal = useSelector((state) => state.resume.formData);

  const handleChange = (e) => {
    dispatch(updateField({ path: [e.target.name], value: e.target.value }));
  };

  return (
    <form className="personal-info-form">
      <h2>Personal Information</h2>
      <div className="flex">
        <Input
          label="First Name"
          placeholder="First Name"
          name="first_name"
          value={personal.first_name}
          onChange={handleChange}
        />
        <Input
          label="Last Name"
          placeholder="Last Name"
          name="last_name"
          value={personal.last_name}
          onChange={handleChange}
        />
      </div>
      <div className="flex">
        <Input
          label="Email"
          placeholder="Email"
          name="email"
          value={personal.email}
          onChange={handleChange}
        />
        <Input
          label="Phone Number"
          placeholder="Phone Number"
          name="phone"
          value={personal.phone}
          onChange={handleChange}
        />
      </div>
      <div className="flex">
        <Input
          label="LinkedIn"
          placeholder="LinkedIn"
          name="linkedin"
          value={personal.linkedin}
          onChange={handleChange}
        />
        <Input
          label="Github"
          placeholder="Github"
          name="github"
          value={personal.github}
          onChange={handleChange}
        />
      </div>
      <div className="form-actions right">
        <Button text="Next" onClick={() => dispatch(nextStep())} />
      </div>
    </form>
  );
}
