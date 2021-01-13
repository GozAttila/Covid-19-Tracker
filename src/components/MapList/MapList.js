import React, { useState, useEffect } from "react";

import "./MapList.css";

import CountryList from "../CountryList/CountryList";
import TopButtons from "../TopButtons/TopButtons";
import WorldMap from "../WorldMap/WorldMap";

function MapList() {
  const [mapCountries, setMapCountries] = useState([]);
  const [worldData, setWorldData] = useState({});
  const [perCapita, setPerCapita] = useState(false);
  const [caseType, setCaseType] = useState("cases");

  useEffect(() => {
    const getCountriesData = () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          setMapCountries(data);
        });
    };

    getCountriesData();
  }, []);

  useEffect(() => {
    const getWorldData = () => {
      fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          setWorldData(data);
        });
    };

    getWorldData();
  }, []);

  return (
    <div className="mapList">
      <div className="mapList__left">
        <TopButtons />
        <WorldMap
          worldData={worldData}
          mapCountries={mapCountries}
          caseType={caseType}
          perCapita={perCapita}
        />
      </div>
      <div className="mapList__right">
        <CountryList
          mapCountries={mapCountries}
          caseType={caseType}
          perCapita={perCapita}
        />
      </div>
    </div>
  );
}

export default MapList;
