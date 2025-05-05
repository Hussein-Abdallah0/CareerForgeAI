import React from "react";

const Input = ({ label, name, value, type, onChange, required, placeholder }) => {
  return (
    <div className="login-div">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        className="input"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
