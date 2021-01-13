import React from "react";
import ButtonList from "../ButtonList/ButtonList";
import CaseTypeButton from "../CaseTypeButton/CaseTypeButton";

import "./TopButtons.css";

function TopButtons() {
  return (
    <div className="topButtons">
      <ButtonList />
      <CaseTypeButton />
    </div>
  );
}

export default TopButtons;
