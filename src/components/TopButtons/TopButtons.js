import React from "react";

import "./TopButtons.css";

import ButtonList from "../ButtonList/ButtonList";
import CaseTypeButton from "../CaseTypeButton/CaseTypeButton";

function TopButtons({ caseType, perCapita, buttonHandler, setPerCapita }) {
  const caseTypeButtonList = [
    {
      caseType: "cases",
      buttonName: "All cases",
      isActive: caseType === "cases",
    },
    {
      caseType: "active",
      buttonName: "Active cases",
      isActive: caseType === "active",
    },
    {
      caseType: "recovered",
      buttonName: "Recovered",
      isActive: caseType === "recovered",
    },
    {
      caseType: "deaths",
      buttonName: "Deaths",
      isActive: caseType === "deaths",
    },
  ];

  console.log("caseTypeButtonList in topButtons", caseTypeButtonList);

  return (
    <div className="topButtons">
      <ButtonList
        caseTypeButtonList={caseTypeButtonList}
        buttonHandler={buttonHandler}
        buttonType="topButton"
      />
      <div
        onClick={() => {
          setPerCapita(!perCapita);
        }}
      >
        <CaseTypeButton
          isActive={perCapita}
          buttonName="Per Capita Switch"
          buttonType="topButton"
        />
      </div>
    </div>
  );
}

export default TopButtons;
