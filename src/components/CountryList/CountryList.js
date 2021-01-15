import React from "react";
import numeral from "numeral";

import "./CountryList.css";

function CountryList({ mapCountries, caseType, perCapita }) {
  const sortData = (data) => {
    let sortedData = [...data];
    sortedData.sort((a, b) => {
      if (
        checkIfPerCapita(a[caseType], a.population) >
        checkIfPerCapita(b[caseType], b.population)
      ) {
        return -1;
      } else {
        return 1;
      }
    });
    return sortedData;
  };

  const checkIfPerCapita = (caseValue, population) => {
    if (perCapita && population === 0) return 0;
    return perCapita
      ? Math.round(caseValue / (population / 1000000))
      : caseValue;
  };

  return (
    <table className="countryList">
      <tbody>
        {sortData(mapCountries).map((country) => (
          <tr key={country.country}>
            <td>{country.country}</td>
            <td>
              <strong>
                {numeral(
                  checkIfPerCapita(country[caseType], country.population)
                ).format("0,0")}
              </strong>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CountryList;
