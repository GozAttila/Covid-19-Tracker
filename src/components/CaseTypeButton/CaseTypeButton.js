import React from "react";

import "./CaseTypeButton.css";

function CaseTypeButton({ isActive, buttonName, buttonType }) {
  return (
    <button className={`caseTypeButton ${buttonType}`}>
      <div>{buttonName}</div>
      <div className={`indicator ${isActive ? "isActive" : "notActive"}`}></div>
    </button>
  );
}

export default CaseTypeButton;
