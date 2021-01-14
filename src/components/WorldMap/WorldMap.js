import React, { useState } from "react";
import Tooltip from "../Tooltip/Tooltip";

import "./WorldMap.css";

function WorldMap() {
  const [tooltipData, setTooltipData] = useState({
    flag:
      "https://images.squarespace-cdn.com/content/v1/5506acb1e4b0b39d3c22d329/1430773739856-CGYOUJP6S653W4B13HVY/ke17ZwdGBToddI8pDm48kGwkjuynw4B8tYYHsellrnlZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpxHD-n7kw2ta02ApS8KVYqRgwdRjd54i2ObM4fy-YBd1g4Ns4l_SJho4nLemRk_BII/image-asset.jpeg?format=500w",
    country: "Worldwide",
    cases: 123455,
    active: 2345,
    recovered: 5678,
    deaths: 123,
    population: 7654321,
  });

  return (
    <>
      <div id="map">WorldMap</div>
      {/* <Tooltip tooltipData={tooltipData} /> */}
    </>
  );
}

export default WorldMap;
