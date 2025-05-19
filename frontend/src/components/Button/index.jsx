import React from "react";
import "./styles.css";

const Button = ({ version = "primary", text, onClick, type, disabled }) => {
  switch (version) {
    case "primary":
      return (
        <button onClick={onClick} type={type} disabled={disabled} className="primary-btn">
          {text}
        </button>
      );
    case "secondary":
      return (
        <button onClick={onClick} type={type} disabled={disabled} className="secondary-btn">
          {text}
        </button>
      );
    case "border":
      return (
        <button onClick={onClick} type={type} disabled={disabled} className="border-btn">
          {text}
        </button>
      );
    case "primary-small":
      return (
        <button onClick={onClick} type={type} disabled={disabled} className="primary-small">
          {text}
        </button>
      );
    case "border-small":
      return (
        <button onClick={onClick} type={type} disabled={disabled} className="border-small">
          {text}
        </button>
      );
    case "secondary-small":
      return (
        <button onClick={onClick} type={type} disabled={disabled} className="secondary-small">
          {text}
        </button>
      );
  }
};

export default Button;
