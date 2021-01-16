import React from "react";

import "./Footer.css";

import linkedinIcon from "../../assets/linkedin.png";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__left">
        <div>Created by Gőz Attila</div>
        <div>
          <a href="https://www.linkedin.com/in/ati-goz/">
            <img src={linkedinIcon} alt="linkedin" />
          </a>
        </div>
      </div>
      <div>Copyright 2021</div>
    </div>
  );
}

export default Footer;
