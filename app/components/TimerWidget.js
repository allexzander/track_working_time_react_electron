// @flow
import React from "react";

import DragAndDropImage from "../resources/dragndrop.svg";

import PlayImage from "../resources/play.svg";
import StopImage from "../resources/stop.svg";

import ClearImage from "../resources/clear.svg";

import { FormatMilliseconds } from "../utils/timeUtils";

const TimerWidget = (props) => {

  const ButtonImage = props.isTimerRunning ? StopImage : PlayImage;
  const TimeFormatted = FormatMilliseconds(props.currentTimerValue, "HH:mm");

  return (
    <div id="time-tracker-widget">
    
      <div id="time-tracker-widget-dand-drop-container">
        <img src={DragAndDropImage} className="invert nonselectable"/>
      </div>

      <div id="time-tracker-widget-playstop-container" onClick={() => props.onToggleTimer()}>
        <img src={ButtonImage} className="invert nonselectable"/>
      </div>

      <div id="time-tracker-widget-playstop-status-container" className={`nonselectable cursor-default ${props.isTimerRunning ? " active" : ""}`}></div>

      <div id="time-tracker-widget-playstop-time-container" className="nonselectable cursor-default">
        {TimeFormatted}
      </div>

      <div id="time-tracker-widget-clear-container" onClick={() => props.onClose()}>
        <img src={ClearImage} className="invert nonselectable"/>
      </div>

    </div>
  );
}

export default TimerWidget;
