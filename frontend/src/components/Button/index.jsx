import React from "react";
import "./styles.css";

const Button = ({ type, text, onClick }) => {
  switch (type) {
    case "primary":
      return (
        <button onClick={onClick} className="primary-btn">
          {text}
        </button>
      );
    case "secondary":
      return (
        <button onClick={onClick} className="secondary-btn">
          {text}
        </button>
      );
    case "border":
      return (
        <button onClick={onClick} className="border-btn">
          {text}
        </button>
      );
    default:
      return (
        <button onClick={onClick} className="default-btn">
          {text}
        </button>
      );
  }
};

export default Button;
