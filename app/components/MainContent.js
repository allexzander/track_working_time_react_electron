// @flow
import React from "react";

import TimerMain from "./TimerMain";

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
    <div id="main-content" className={`${!props.isTimerRunning ? "disabled" : ""}`}>
      <div id="main-content-container">
       <TimerMain hourPrimary={hourPrimary} hourSecondary={hourSecondary} 
         minutePrimary={minutePrimary} minuteSecondary={minuteSecondary}
         secondPrimary={secondPrimary} secondSecondary={secondSecondary} />
       <div id="main-content-button-container" onClick={() => props.onToggleTimer()}>
         <img src={ButtonImage} className="nonselectable invert"/>
       </div>
      </div>
    </div>
  );
}

export default MainContent;
