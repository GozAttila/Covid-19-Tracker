import React, { useState } from "react";

import "./App.css";
import Diagram from "./components/Diagram/Diagram";
import Footer from "./components/Footer/Footer";

import Header from "./components/Header/Header";
import InfoModal from "./components/InfoModal/InfoModal";
import MapList from "./components/MapList/MapList";

function App() {
  const [countryCode, setCountryCode] = useState("Worldwide");

  const countryCodeCallBack = (countryId) => {
    setCountryCode(countryId);
  };

  const changeModalDisplay = (value) => {
    document.getElementById("infoModal").style.display =
      value === 1 ? "block" : "none";
  };

  window.onclick = function (event) {
    const modal = document.getElementById("infoModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  return (
    <div className="app">
      <InfoModal changeModalDisplay={changeModalDisplay} />
      <Header changeModalDisplay={changeModalDisplay} />
      <MapList countryCodeCallBack={countryCodeCallBack} />
      <Diagram countryCode={countryCode} />
      <Footer />
    </div>
  );
}

export default App;
