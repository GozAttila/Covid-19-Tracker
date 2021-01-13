import React from "react";
import ButtonList from "../ButtonList/ButtonList";
import Graph from "../Graph/Graph";

import "./Diagram.css";

function Diagram() {
  return (
    <div className="diagram">
      <Graph className="diagram__graph" />
      <ButtonList />
    </div>
  );
}

export default Diagram;
