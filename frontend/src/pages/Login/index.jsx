import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthForm } from "../../hooks/useAuthForm";
import Input from "../../components/Input";
import Button from "../../components/Button";
import "./styles.css";

const Login = () => {
  const navigate = useNavigate();
  const { form, isSubmitting, error, handleChange, handleSubmit } = useAuthForm("login");

  const onLoginSuccess = () => {
    navigate("/dashboard");
  };
  return (
    <div className="login-body">
      <div className="login-section">
        <h1 className="header">Login</h1>
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

          <Button
            version="primary"
            text={isSubmitting ? "Logging in..." : "Login"}
            type="submit"
            disabled={isSubmitting}
          />
        </form>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
