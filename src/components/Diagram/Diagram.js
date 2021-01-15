import React from "react";
import ButtonList from "../ButtonList/ButtonList";
import Graph from "../Graph/Graph";

import "./Diagram.css";

function Diagram() {
  const buttonHandler = () => {
    console.log("clicked a button in Diagram");
  };

  const caseTypeButtonList = [
    {
      caseType: "cases",
      buttonName: "All cases",
      isActive: true,
    },
    {
      caseType: "active",
      buttonName: "Active cases",
      isActive: true,
    },
    {
      caseType: "recovered",
      buttonName: "Recovered",
      isActive: true,
    },
    {
      caseType: "deaths",
      buttonName: "Deaths",
      isActive: true,
    },
  ];

  return (
    <div className="diagram">
      <Graph className="diagram__graph" />
      <ButtonList
        caseTypeButtonList={caseTypeButtonList}
        buttonHandler={buttonHandler}
        buttonType="sideButton"
      />
    </div>
  );
}

export default Diagram;
