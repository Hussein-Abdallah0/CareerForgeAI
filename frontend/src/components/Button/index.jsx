import React from "react";
import "./styles.css";

const Button = ({ version, text, onClick, type }) => {
  switch (version) {
    case "primary":
      return (
        <button onClick={onClick} type={type} className="primary-btn">
          {text}
        </button>
      );
    case "secondary":
      return (
        <button onClick={onClick} type={type} className="secondary-btn">
          {text}
        </button>
      );
    case "border":
      return (
        <button onClick={onClick} type={type} className="border-btn">
          {text}
        </button>
      );
    default:
      return (
        <button onClick={onClick} type={type} className="default-btn">
          {text}
        </button>
      );
  }
};

export default Button;
