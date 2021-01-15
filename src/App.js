import React from "react";

import "./App.css";
import Diagram from "./components/Diagram/Diagram";

import Header from "./components/Header/Header";
import MapList from "./components/MapList/MapList";

function App() {
  return (
    <div className="app">
      {/* <div>InfoModal</div> */}
      <Header />
      <MapList />
      {/* <Diagram /> */}
    </div>
  );
}

export default App;
