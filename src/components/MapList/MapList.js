import React, { useState, useEffect } from "react";

import "./MapList.css";

import CountryList from "../CountryList/CountryList";
import TopButtons from "../TopButtons/TopButtons";
import WorldMap from "../WorldMap/WorldMap";

function MapList({ countryCodeCallBack }) {
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

  const buttonHandler = (buttonCaseType) => {
    if (buttonCaseType !== caseType) {
      setCaseType(buttonCaseType);
    }
  };

  return (
    <div className="mapList">
      <div className="mapList__left">
        <TopButtons
          caseType={caseType}
          perCapita={perCapita}
          buttonHandler={buttonHandler}
          setPerCapita={setPerCapita}
        />
        {mapCountries.length > 0 && worldData.updated ? (
          <WorldMap
            worldData={worldData}
            mapCountries={mapCountries}
            caseType={caseType}
            perCapita={perCapita}
            countryCodeCallBack={countryCodeCallBack}
          />
        ) : (
          <h2 className="loading">Loading...</h2>
        )}
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
