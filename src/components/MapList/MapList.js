import React from "react";
import CountryList from "../CountryList/CountryList";
import TopButtons from "../TopButtons/TopButtons";
import WorldMap from "../WorldMap/WorldMap";

import "./MapList.css";

function MapList() {
  return (
    <div className="mapList">
      <div className="mapList__left">
        <TopButtons />
        <WorldMap />
      </div>
      <div className="mapList__right">
        <CountryList />
      </div>
    </div>
  );
}

export default MapList;
