import React from "react";
import { useAuthForm } from "../../../../../Gallery/frontend/src/hooks/useAuthForm";
import "./styles.css";

const Login = () => {
  const { form, isSubmitting, error, handleChange, handleSubmit } = useAuthForm("login");

  return (
    <div className="login-body">
      {/* <img src="logo.svg" alt="logo" className="logo" /> */}
      <div className="login-section">
        <h1 className="header">Log In</h1>
        {/* <form className="login-form" onSubmit={(e) => handleSubmit(e, onLoginSuccess)}>
          <div className="login-input">
            <label htmlFor="email">Email</label>
            <input
              className="input"
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-input">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="input"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="primary-btn" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form> */}
      </div>
    </div>
  );
};

export default Login;
