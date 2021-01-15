import React from "react";
import numeral from "numeral";

import "./Tooltip.css";

function Tooltip({ tooltipData }) {
  const {
    flag,
    country,
    population,
    cases,
    active,
    recovered,
    deaths,
  } = tooltipData;

  const valueCheck = (value) => {
    return value === "N/A" ? "N/A" : numeral(value).format("0,0");
  };

  return (
    <div className="tooltip">
      <div className="tooltip__header">
        <img className="tooltip__flag" src={flag} alt="country flag" />
        <div className="tooltip__country">{country}</div>
        <div className="tooltip__population">Population:</div>
        <div className="tooltip__population">{valueCheck(population)}</div>
      </div>

      <div className="tooltip__data">
        <div className="tooltip__title">Cases:</div>
        <div className="tooltip__cases">
          <div>All:</div>
          <div>{valueCheck(cases)}</div>
        </div>
        <div className="tooltip__cases">
          <div>Active:</div>
          <div>{valueCheck(active)}</div>
        </div>
        <div className="tooltip__cases">
          <div>Recovered:</div>
          <div>{valueCheck(recovered)}</div>
        </div>
        <div className="tooltip__cases">
          <div>Deaths:</div>
          <div>{valueCheck(deaths)}</div>
        </div>
      </div>
    </div>
  );
}

export default Tooltip;
