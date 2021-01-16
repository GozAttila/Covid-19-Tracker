import React from "react";

import "./InfoModal.css";

function InfoModal({ changeModalDisplay }) {
  return (
    <div id="infoModal" className="infoModal">
      <div className="infoModal__content">
        <div className="infoModal__header">
          <div className="infoModal__text">Informations about this app</div>

          <div
            className="infoModal__close"
            onClick={() => {
              changeModalDisplay(0);
            }}
          >
            Close[X]
          </div>
        </div>

        <div className="infoModal__list">
          <p>
            {`The app is made by Gőz Attila -> `}
            <a href="https://gozattila.dev" target="_blank" rel="noreferrer">
              gozattila.dev
            </a>
          </p>

          <p>
            The map and graph part use different data source, so there can be
            some inconsistencies.
          </p>

          <p>Data origin for map: Worldometers</p>

          <p>Data origin for diagram: John hopkins University</p>

          <p>
            Data source API:{" "}
            <a href="https://disease.sh/docs/" target="_blank" rel="noreferrer">
              disease.sh
            </a>
          </p>

          <p>{`Per Capita explanation -> number of cases divided by the population in million (eg.: divide by 83 in Germany)`}</p>

          <p>
            Virus Image by{" "}
            <a href="https://rawpixel.com" target="_blank" rel="noreferrer">
              rawpixel.com
            </a>
          </p>

          <p>
            Map and Chart by{" "}
            <a
              href="https://www.amcharts.com/"
              target="_blank"
              rel="noreferrer"
            >
              amCharts
            </a>
          </p>

          <p>
            Created with{" "}
            <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
              React
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
