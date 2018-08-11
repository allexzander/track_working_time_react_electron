// @flow
import React from 'react';
import styles from './Header.scss';

import ImageAnalogClock from "../resources/int_td.png";

const Header = (props) => {
  return (
    <div id="main-header" className={`${!props.isTimerRunning ? "disabled" : ""}`}>
       <span id="main-header-icon-container"><img src={ImageAnalogClock} className="invert" id="main-header-icon"/></span><span>Time Doctor</span>
    </div>
  );
}

export default Header;