import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthForm } from "../../hooks/useAuthForm";
import Input from "../../components/Input";
import "./styles.css";

const Login = () => {
  const navigate = useNavigate();
  const { form, isSubmitting, error, handleChange, handleSubmit } = useAuthForm("login");

  const onLoginSuccess = () => {
    navigate("/home");
  };
  return (
    <div className="login-body">
      {/* <img src="logo.svg" alt="logo" className="logo" /> */}
      <div className="login-section">
        <h1 className="header">Log In</h1>
        {error && <div className="error-message">{error}</div>}
        <form className="login-form" onSubmit={(e) => handleSubmit(e, onLoginSuccess)}>
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
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
