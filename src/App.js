import React, { useState } from "react";

import "./App.css";
import Diagram from "./components/Diagram/Diagram";

import Header from "./components/Header/Header";
import MapList from "./components/MapList/MapList";

function App() {
  const [countryCode, setCountryCode] = useState("Worldwide");

  const countryCodeCallBack = (countryId) => {
    setCountryCode(countryId);
  };

  return (
    <div className="app">
      {/* <div>InfoModal</div> */}
      <Header />
      <MapList countryCodeCallBack={countryCodeCallBack} />
      <Diagram countryCode={countryCode} />
    </div>
  );
}

export default App;
