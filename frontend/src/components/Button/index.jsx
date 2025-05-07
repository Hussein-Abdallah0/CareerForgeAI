import React from "react";
import "./styles.css";

const Button = ({ version, text, onClick, type, disabled }) => {
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
        <button onClick={onClick} type={type} disabled={disabled} className="default-btn">
          {text}
        </button>
      );
    case "border-small":
      return (
        <button onClick={onClick} type={type} disabled={disabled} className="default-btn">
          {text}
        </button>
      );
  }
};

export default Button;
