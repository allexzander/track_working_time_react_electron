// @flow
import React from "react";

import ImageAnalogClock from "../resources/int_td.png";

const Header = (props) => {
  return (
    <div id="main-header" className={`${!props.isTimerRunning ? "disabled" : ""}`}>
       <span id="main-header-icon-container">
         <img src={ImageAnalogClock} className="invert nonselectable" id="main-header-icon"/>
       </span>
       <span className="nonselectable">
         Time Doctor
       </span>
    </div>
  );
}

export default Header;