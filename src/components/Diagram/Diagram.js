import React, { useState, useEffect } from "react";

import "./Diagram.css";

import ButtonList from "../ButtonList/ButtonList";
import Graph from "../Graph/Graph";

function Diagram({ countryCode }) {
  const [graphData, setGraphData] = useState({});
  const [loadingState, setLoadingState] = useState(false);
  const [noDataState, setNoDataState] = useState(false);

  const basicButtonStatus = {
    cases: true,
    active: true,
    recovered: true,
    deaths: true,
  };

  const [buttonStatus, setButtonStatus] = useState(basicButtonStatus);

  const caseTypeButtonList = [
    {
      caseType: "cases",
      buttonName: "All cases",
      isActive: buttonStatus.cases,
    },
    {
      caseType: "active",
      buttonName: "Active cases",
      isActive: buttonStatus.active,
    },
    {
      caseType: "recovered",
      buttonName: "Recovered",
      isActive: buttonStatus.recovered,
    },
    {
      caseType: "deaths",
      buttonName: "Deaths",
      isActive: buttonStatus.deaths,
    },
  ];

  const calculateDays = () => {
    const today = new Date();
    const covidStartDay = new Date("2020-01-22");
    return Math.floor(
      (today.getTime() - covidStartDay.getTime()) / (1000 * 60 * 60 * 24)
    );
  };

  useEffect(() => {
    setLoadingState(true);
    setNoDataState(false);
    const getHistoricalData = () => {
      const url = `https://disease.sh/v3/covid-19/historical/${
        countryCode === "Worldwide" ? "all" : countryCode
      }?lastdays=${calculateDays()}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (
            data.message !==
            "Country not found or doesn't have any historical data"
          ) {
            setGraphData(
              organizeGraphData(
                countryCode === "Worldwide" ? data : data.timeline
              )
            );
          } else {
            setNoDataState(true);
          }
          setButtonStatus(basicButtonStatus);
          setLoadingState(false);
        });
    };

    getHistoricalData();
  }, [countryCode]);

  const organizeGraphData = (data) => {
    let organizedData = [];
    const date = Object.keys(data.cases);
    const cases = Object.values(data.cases);
    const recovered = Object.values(data.recovered);
    const deaths = Object.values(data.deaths);

    for (let i = 0; i < date.length; i++) {
      let activeCases = cases[i] - recovered[i] - deaths[i];

      organizedData.push({
        date: new Date(date[i]),
        cases: cases[i],
        active: activeCases,
        recovered: recovered[i],
        deaths: deaths[i],
      });
    }
    return organizedData;
  };

  const buttonHandler = (buttonCaseType) => {
    setButtonStatus({
      ...buttonStatus,
      [buttonCaseType]: !buttonStatus[buttonCaseType],
    });
  };

  return (
    <div className="diagram">
      {loadingState ? (
        <h2 className="loading diagram__loading">Loading...</h2>
      ) : noDataState ? (
        <div className="loading diagram__loading warning">
          No historical data found
          <br />
          Please, check the info
        </div>
      ) : (
        <Graph
          className="diagram__graph"
          graphData={graphData}
          buttonStatus={buttonStatus}
        />
      )}

      <div className="diagram__buttons">
        <ButtonList
          caseTypeButtonList={caseTypeButtonList}
          buttonHandler={buttonHandler}
          buttonType="sideButton"
        />
      </div>
    </div>
  );
}

export default Diagram;
