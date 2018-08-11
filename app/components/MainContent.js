// @flow
import React from 'react';
import styles from './MainContent.scss';

import PlayImage from "../resources/play.svg";
import StopImage from "../resources/stop.svg";

import moment from "moment";

const MainContent = (props) => {

  const momentDuration = moment.duration(props.currentTimerValue);

  const hoursString = momentDuration.hours().toString();
  const minutesString = momentDuration.minutes().toString();
  const secondsString = momentDuration.seconds().toString();

  const hourPrimary = hoursString.length > 1 ? hoursString[0] : 0;
  const hourSecondary = hoursString.length > 1 ? hoursString[1] : hoursString[0];

  const minutePrimary = minutesString.length > 1 ? minutesString[0] : 0;
  const minuteSecondary = minutesString.length > 1 ? minutesString[1] : minutesString[0];
  
  const secondPrimary = secondsString.length > 1 ? secondsString[0] : 0;
  const secondSecondary = secondsString.length > 1 ? secondsString[1] : secondsString[0];

  const ButtonImage = props.isTimerRunning ? StopImage : PlayImage;

  return (
    <div id="main-content">
      <div id="main-content-container">
       <div id="main-content-time-container">
         <div className="main-content-time-part main-content-time-digit">
           {hourPrimary}
          </div>
          <div className="main-content-time-part main-content-time-digit">
          {hourSecondary}
          </div>
          <div className="main-content-time-part main-content-time-separator">
           :
          </div>
          <div className="main-content-time-part main-content-time-digit">
          {minutePrimary}
          </div>
          <div className="main-content-time-part main-content-time-digit">
          {minuteSecondary}
          </div>
          <div className="main-content-time-part main-content-time-separator">
           :
          </div>
          <div className="main-content-time-part main-content-time-digit">
           {secondPrimary}
          </div>
          <div className="main-content-time-part main-content-time-digit">
           {secondSecondary}
          </div>
       </div>
       <div id="main-content-button-container" onClick={() => props.onToggleTimer()}>
         <img src={ButtonImage} className="nonselectable invert"/>
       </div>
       </div>
       </div>
  );
}

export default MainContent;
