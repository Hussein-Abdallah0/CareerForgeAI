import React from "react";
import "./styles.css";

const Input = ({ label, name, value, type, onChange, required, placeholder }) => {
  return (
    <div className="input-div">
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
