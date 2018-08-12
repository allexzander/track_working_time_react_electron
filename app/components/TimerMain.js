import React from "react";

const TimerMain = (props) => {
    return (
      <div id="main-content-time-container">

        <div className="main-content-time-part main-content-time-digit nonselectable">
          {props.hourPrimary}
        </div>
        <div className="main-content-time-part main-content-time-digit nonselectable">
          {props.hourSecondary}
        </div>

        <div className="main-content-time-part main-content-time-separator nonselectable">
          :
        </div>

        <div className="main-content-time-part main-content-time-digit nonselectable">
          {props.minutePrimary}
        </div>
        <div className="main-content-time-part main-content-time-digit nonselectable">
          {props.minuteSecondary}
        </div>

        <div className="main-content-time-part main-content-time-separator nonselectable">
          :
        </div>

        <div className="main-content-time-part main-content-time-digit nonselectable">
          {props.secondPrimary}
        </div>
        <div className="main-content-time-part main-content-time-digit nonselectable">
          {props.secondSecondary}
        </div>

      </div>
    )
}

export default TimerMain;