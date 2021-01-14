import React from "react";
import numeral from "numeral";

import "./CountryList.css";

function CountryList({ mapCountries, caseType, perCapita }) {
  const sortData = (data) => {
    let sortedData = [...data];
    sortedData.sort((a, b) => {
      if (a[caseType] > b[caseType]) {
        return -1;
      } else {
        return 1;
      }
    });
    return sortedData;
  };

  return (
    <table className="countryList">
      <tbody>
        {sortData(mapCountries).map((country) => (
          <tr key={country.country}>
            <td>{country.country}</td>
            <td>
              <strong>{numeral(country[caseType]).format("0,0")}</strong>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CountryList;
