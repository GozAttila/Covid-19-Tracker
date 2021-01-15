import React, { useEffect } from "react";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import "./Graph.css";

const { useRef } = React;

function Graph({ graphData, buttonStatus }) {
  const chartRef = useRef(null);

  const casesColor = am4core.color("#1c5fe5");
  const activeColor = am4core.color("#ff8726");
  const recoveredColor = am4core.color("#45d21a");
  const deathsColor = am4core.color("#d21a1a");

  const colors = {
    cases: casesColor,
    active: activeColor,
    recovered: recoveredColor,
    deaths: deathsColor,
  };

  useEffect(() => {
    if (!chartRef.current) {
      am4core.useTheme(am4themes_animated);

      chartRef.current = am4core.create("chartdiv", am4charts.XYChart);

      chartRef.current.height = am4core.percent(95);
      chartRef.current.width = am4core.percent(99);

      const dateAxis = chartRef.current.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.grid.template.stroke = am4core.color("#eeeeee");
      dateAxis.renderer.labels.template.fill = am4core.color("#f16d25");

      const valueAxis = chartRef.current.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.grid.template.stroke = am4core.color("#eeeeee");
      valueAxis.renderer.labels.template.fill = am4core.color("#f16d25");

      chartRef.current.data = graphData;

      const seriesList = {
        caseSeries: {
          name: "cases",
          text: "All cases",
        },
        activeSeries: {
          name: "active",
          text: "Active cases",
        },
        recoveredSeries: {
          name: "recovered",
          text: "Recovered",
        },
        deathsSeries: {
          name: "deaths",
          text: "Deaths",
        },
      };

      const createSeries = (data) => {
        const series = chartRef.current.series.push(new am4charts.LineSeries());
        series.name = data.text;
        series.dataFields.dateX = "date";
        series.dataFields.valueY = data.name;
        series.tooltipText = "{valueY.value}";
        series.fill = colors[data.name];
        series.stroke = colors[data.name];
        return series;
      };

      const caseSeries = createSeries(seriesList.caseSeries);
      const activeSeries = createSeries(seriesList.activeSeries);
      const recoveredSeries = createSeries(seriesList.recoveredSeries);
      const deathsSeries = createSeries(seriesList.deathsSeries);

      chartRef.current.cursor = new am4charts.XYCursor();
      chartRef.current.cursor.XAxis = dateAxis;

      const scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(caseSeries);
      chartRef.current.scrollbarX = scrollbarX;
      chartRef.current.scrollbarX.minHeight = 20;
      chartRef.current.scrollbarX.showSystemTooltip = false;
      chartRef.current.scrollbarX.thumb.showSystemTooltip = false;
      chartRef.current.scrollbarX.startGrip.showSystemTooltip = false;
      chartRef.current.scrollbarX.endGrip.showSystemTooltip = false;
      chartRef.current.scrollbarX.unselectedOverlay.fill = am4core.color(
        "#222222"
      );
      chartRef.current.scrollbarX.unselectedOverlay.fillOpacity = 0.8;

      const scrollAxis = chartRef.current.scrollbarX.scrollbarChart.xAxes.getIndex(
        0
      );
      scrollAxis.renderer.labels.template.disabled = true;
      scrollAxis.renderer.grid.template.disabled = true;

      chartRef.current.legend = new am4charts.Legend();
      chartRef.current.legend.parent = chartRef.current.plotContainer;
      chartRef.current.legend.zIndex = 100;
      chartRef.current.legend.labels.template.fill = am4core.color("#e9e9e9");

      dateAxis.renderer.grid.template.strokeOpacity = 0.07;
      valueAxis.renderer.grid.template.strokeOpacity = 0.07;
    }

    return () => {
      chartRef.current && chartRef.current.dispose();
    };
  }, []);

  useEffect(() => {
    let chart = chartRef.current.series;
    buttonStatus.cases ? chart.values[0].show() : chart.values[0].hide();
    buttonStatus.active ? chart.values[1].show() : chart.values[1].hide();
    buttonStatus.recovered ? chart.values[2].show() : chart.values[2].hide();
    buttonStatus.deaths ? chart.values[3].show() : chart.values[3].hide();
  }, [buttonStatus]);

  return <div id="chartdiv"></div>;
}

export default Graph;
