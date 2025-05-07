import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthForm } from "../../hooks/useAuthForm";
import Input from "../../components/Input";
import "./styles.css";

const Signup = () => {
  const navigate = useNavigate();
  const { form, isSubmitting, error, handleChange, handleSubmit } = useAuthForm("signup");

  const onSignupSuccess = () => {
    navigate("/home");
  };
  return (
    <div className="signup-body">
      <div className="signup-section">
        <h1 className="header">Sign Up</h1>
        {error && <div className="error-message">{error}</div>}
        <form className="login-form" onSubmit={(e) => handleSubmit(e, onSignupSuccess)}>
          <div className="name-input">
            <Input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              label="First Name"
              placeholder="First Name"
              required="true"
              className="small"
            />
            <Input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              label="Last Name"
              placeholder="Last Name"
              required="true"
              className="small"
            />
          </div>

          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            label="Email"
            placeholder="Email"
            required="true"
          />

          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            label="Password"
            placeholder="Password"
            required="true"
          />

          <button type="submit" className="primary-btn" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        <p>
          Have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
