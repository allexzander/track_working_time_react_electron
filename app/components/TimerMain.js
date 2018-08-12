import React from "react";

const TimerMain = (props) => {
    return (
      <div id="main-content-time-container">

        <div className="main-content-time-part main-content-time-digit nonselectable cursor-default">
          {props.hourPrimary}
        </div>
        <div className="main-content-time-part main-content-time-digit nonselectable cursor-default">
          {props.hourSecondary}
        </div>

        <div className="main-content-time-part main-content-time-separator nonselectable cursor-default">
          :
        </div>

        <div className="main-content-time-part main-content-time-digit nonselectable cursor-default">
          {props.minutePrimary}
        </div>
        <div className="main-content-time-part main-content-time-digit nonselectable cursor-default">
          {props.minuteSecondary}
        </div>

        <div className="main-content-time-part main-content-time-separator nonselectable cursor-default">
          :
        </div>

        <div className="main-content-time-part main-content-time-digit nonselectable cursor-default">
          {props.secondPrimary}
        </div>
        <div className="main-content-time-part main-content-time-digit nonselectable cursor-default">
          {props.secondSecondary}
        </div>

      </div>
    )
}

export default TimerMain;