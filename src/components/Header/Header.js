import React from "react";

import "./Header.css";

import CovidImage from "../../assets/covid19.png";

function Header({ changeModalDisplay }) {
  return (
    <div className="header">
      <div className="header__title">
        C
        <img src={CovidImage} className="header__virusimage" alt="virus" />
        vid-19 Tracker
      </div>
      <div className="header__info" onClick={() => changeModalDisplay(1)}>
        Info
      </div>
    </div>
  );
}

export default Header;
