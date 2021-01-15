import React, { useState, useEffect } from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

import "./WorldMap.css";

import Tooltip from "../Tooltip/Tooltip";

const { useRef } = React;

function WorldMap({ worldData, mapCountries, caseType, perCapita }) {
  const worldMapRef = useRef(null);

  const worldInfo = {
    flag:
      "https://images.squarespace-cdn.com/content/v1/5506acb1e4b0b39d3c22d329/1430773739856-CGYOUJP6S653W4B13HVY/ke17ZwdGBToddI8pDm48kGwkjuynw4B8tYYHsellrnlZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpxHD-n7kw2ta02ApS8KVYqRgwdRjd54i2ObM4fy-YBd1g4Ns4l_SJho4nLemRk_BII/image-asset.jpeg?format=500w",
    country: "Worldwide",
    cases: worldData.cases,
    active: worldData.active,
    recovered: worldData.recovered,
    deaths: worldData.deaths,
    population: worldData.population,
  };

  const [tooltipData, setTooltipData] = useState(worldInfo);

  const casesColor = am4core.color("#1c5fe5");
  const activeColor = am4core.color("#ff8726");
  const recoveredColor = am4core.color("#45d21a");
  const deathsColor = am4core.color("#d21a1a");
  const countryColor = am4core.color("#3b3b3b");
  const countryStrokeColor = am4core.color("#000000");

  const colors = {
    cases: casesColor,
    active: activeColor,
    recovered: recoveredColor,
    deaths: deathsColor,
  };

  let outOfCountries = false;
  let countryLocked = false;
  let currentPolygon = undefined;

  useEffect(() => {
    if (!worldMapRef.current) {
      am4core.useTheme(am4themes_animated);

      worldMapRef.current = am4core.create("map", am4maps.MapChart);
      worldMapRef.current.geodata = am4geodata_worldLow;
      worldMapRef.current.projection = new am4maps.projections.Miller();
      worldMapRef.current.height = am4core.percent(90);
      worldMapRef.current.deltaLongitude = -10;
      worldMapRef.current.homeGeoPoint = { longitude: -30, latitude: 30 };

      // to avoid instant update
      worldMapRef.current.dummyData = false;

      let polygonSeries = worldMapRef.current.series.push(
        new am4maps.MapPolygonSeries()
      );

      polygonSeries.heatRules.push({
        porperty: "fill",
        target: polygonSeries.mapPolygons.template,
        min: countryColor,
        max: casesColor,
      });

      polygonSeries.useGeodata = true;
      polygonSeries.exclude = ["AQ"];
      polygonSeries.calculateVisualCenter = true;

      let polygonSeriesData = [];
      console.log("polygonSeriesData", polygonSeriesData);
      if (polygonSeriesData.length === 0) {
        mapCountries.map((country) => {
          polygonSeriesData.push({
            id: country.countryInfo.iso2,
            country: country.country,
            flag: country.countryInfo.flag,
            value: country["cases"], // this is the source of the data value, currently showed value
            cases: country["cases"], // this is just a stored value
            active: country["active"],
            recovered: country["recovered"],
            deaths: country["deaths"],
            population: country["population"],
          });
        });
        polygonSeries.data = polygonSeriesData;
      }

      let polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}";
      polygonTemplate.fill = countryColor;
      polygonTemplate.fillOpacity = 1;
      polygonTemplate.stroke = countryStrokeColor;
      polygonTemplate.strokeOpacity = 0.15;
      polygonTemplate.setStateOnChildren = true;
      polygonTemplate.tooltipPosition = "fixed";

      let polygonHoverState = polygonTemplate.states.create("hover");
      polygonHoverState.transitionEasing = am4core.ease.elasticInOut;
      polygonHoverState.properties.stroke = am4core.color("#ffffff");
      polygonHoverState.properties.strokeOpacity = 0.65;

      let polygonActiveState = polygonTemplate.states.create("active");
      polygonActiveState.transitionEasing = am4core.ease.elasticInOut;
      polygonActiveState.properties.stroke = am4core.color("#dd17cc");
      polygonActiveState.properties.strokeOpacity = 0.85;

      polygonTemplate.events.on("hit", handleCountryHit);
      polygonTemplate.events.on("over", handleCountryOver);
      polygonTemplate.events.on("out", handleCountryOut);

      function handleCountryHit(event) {
        selectCountry(event.target);
      }

      function handleCountryOver(event) {
        rollOverCountry(event.target);
      }

      function handleCountryOut() {
        outOfCountries = true;
        const changeToWorldInfo = () => {
          if (outOfCountries) {
            setTooltipData(worldInfo);
          }
        };
        if (!countryLocked) {
          setTimeout(() => {
            changeToWorldInfo();
          }, 200);
        }
      }

      const rollOverCountry = (mapPolygon) => {
        outOfCountries = false;
        if (!countryLocked) {
          if (mapPolygon.dataItem.dataContext.madeFromGeoData === true) {
            setTooltipData({
              flag: `https://www.countryflags.io/${mapPolygon.dataItem.dataContext.id}/flat/64.png`,
              country: mapPolygon.dataItem.dataContext.name,
              cases: "N/A",
              active: "N/A",
              recovered: "N/A",
              deaths: "N/A",
              population: "N/A",
            });
          } else {
            tooltipChange(mapPolygon);
          }
        }
      };

      const tooltipChange = (mapPolygon) => {
        setTooltipData({
          flag: mapPolygon.dataItem.dataContext.flag,
          country: mapPolygon.dataItem.dataContext.country,
          cases: mapPolygon.dataItem.dataContext.cases,
          active: mapPolygon.dataItem.dataContext.active,
          recovered: mapPolygon.dataItem.dataContext.recovered,
          deaths: mapPolygon.dataItem.dataContext.deaths,
          population: mapPolygon.dataItem.dataContext.population,
        });
      };

      worldMapRef.current.chartContainer.background.interactionsEnabled = true;

      worldMapRef.current.chartContainer.background.events.on(
        "hit",
        function (e) {
          clearSelectedCountry();
        }
      );

      const clearSelectedCountry = () => {
        if (currentPolygon !== undefined) {
          currentPolygon.isActive = false;
          currentPolygon = undefined;
        }
        countryLocked = false;
        if (outOfCountries) {
          setTooltipData(worldInfo);
        }
      };

      function selectCountry(mapPolygon) {
        if (currentPolygon === mapPolygon) {
          clearSelectedCountry();
          return;
        }

        currentPolygon = mapPolygon;

        polygonSeries.mapPolygons.each(function (polygon) {
          polygon.isActive = false;
        });
        currentPolygon.isActive = true;
        countryLocked = true;
        tooltipChange(mapPolygon);
      }
    }
    return () => {
      worldMapRef.current && worldMapRef.current.dispose();
    };
  }, []);

  useEffect(() => {
    if (worldMapRef.current && worldMapRef.current.dummyData) {
      let maxValue = 0;
      let polygonSeries = worldMapRef.current.series.values[0];

      polygonSeries.mapPolygons.each(function (item) {
        let newValue = item.dataItem.dataContext[caseType];

        item.dataItem.value = newValue;
        if (maxValue < newValue) {
          maxValue = newValue;
        }
      });

      polygonSeries.heatRules.getIndex(0).maxValue = maxValue;
      polygonSeries.heatRules.getIndex(0).max = colors[caseType];
    }

    worldMapRef.current.dummyData = true;
  }, [caseType, perCapita]);

  return (
    <>
      <div id="map">WorldMap</div>
      <Tooltip tooltipData={tooltipData} />
    </>
  );
}

export default WorldMap;
