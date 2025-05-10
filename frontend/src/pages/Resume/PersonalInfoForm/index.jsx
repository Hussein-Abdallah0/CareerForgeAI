import Input from "../../../components/Input";
import Button from "../../../components/Button";
import "./styles.css";

const PersonalInfoForm = ({ formData, handleChange, nextStep }) => {
  return (
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
      <div className="form-actions right">
        <Button text="Next" onClick={nextStep} />
      </div>
    </form>
  );
};

export default PersonalInfoForm;
