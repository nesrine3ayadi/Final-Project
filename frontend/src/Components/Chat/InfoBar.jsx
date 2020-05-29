import React from "react";

import onlineIcon from "./icons/onlineIcon.png";
import closeIcon from "./icons/closeIcon.png";

import "./InfoBar.scss";

const InfoBar = ({ room }) => (
  <div className=" card-header msg_head">
    <div className="d-flex bd-highlight">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="online icon" />
        <h3>{room}</h3>
      </div>
     
    </div>
  </div>
);

export default InfoBar;
