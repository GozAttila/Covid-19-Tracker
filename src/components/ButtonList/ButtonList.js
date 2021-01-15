import React from "react";

import CaseTypeButton from "../CaseTypeButton/CaseTypeButton";

function ButtonList({ caseTypeButtonList, buttonHandler, buttonType }) {
  return (
    <>
      {caseTypeButtonList.map((button) => (
        <div
          key={`${buttonType}-${button.buttonName}`}
          onClick={() => {
            buttonHandler(button.caseType);
          }}
        >
          <CaseTypeButton
            isActive={button.isActive}
            buttonName={button.buttonName}
            buttonType={buttonType}
          />
        </div>
      ))}
    </>
  );
}

export default ButtonList;
