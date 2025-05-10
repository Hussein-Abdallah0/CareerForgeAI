import React from "react";
import "./styles.css";

const Input = ({
  label,
  name,
  value,
  type,
  onChange,
  required,
  placeholder,
  className = "input",
}) => {
  const wrapperClassName = className === "input" ? "input-div" : "small-div";
  return (
    <div className={wrapperClassName}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        className={className}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default Input;
