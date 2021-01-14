import React from "react";

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

  return (
    <div className="tooltip">
      <div className="tooltip__header">
        <img className="tooltip__flag" src={flag} alt="country flag" />
        <div className="tooltip__country">{country}</div>
        <div className="tooltip__population">Population:</div>
        <div className="tooltip__population">{population}</div>
      </div>

      <div className="tooltip__data">
        <div className="tooltip__title">Cases:</div>
        <div className="tooltip__cases">
          <div>All:</div>
          <div>{cases}</div>
        </div>
        <div className="tooltip__cases">
          <div>Active:</div>
          <div>{active}</div>
        </div>
        <div className="tooltip__cases">
          <div>Recovered:</div>
          <div>{recovered}</div>
        </div>
        <div className="tooltip__cases">
          <div>Deaths:</div>
          <div>{deaths}</div>
        </div>
      </div>
    </div>
  );
}

export default Tooltip;
