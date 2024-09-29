import React from "react";
import './StepIndicator.css';

const StepIndicator = ({ step }) => {
  return (
    <div className="step-indicator">
      {[1, 2, 3, 4].map((item) => (
        <span
          key={item}
          className={`dot ${step === item ? "active" : ""}`}
        ></span>
      ))}
    </div>
  );
};

export default StepIndicator;
