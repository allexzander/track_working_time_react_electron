// @flow
import React from "react";

import moment from 'moment';

import Clock from 'react-live-clock';

const TimeZone = 'US/Pacific';

const Footer = (props) => {
  const momentDuration = moment.duration(props.totalTime, "milliseconds");

  const hours   = momentDuration.hours()   >= 10 ? momentDuration.hours().toString()   : `0${momentDuration.hours()}`;
  const minutes = momentDuration.minutes() >= 10 ? momentDuration.minutes().toString() : `0${momentDuration.minutes()}`;
  
  const TimeDurationFormatted = `${momentDuration.hours() > 0 ? hours + "h" : ""} ${momentDuration.minutes() > 0 ? minutes + "m " : ""}`

  return (
    <div id="main-footer">
      <div id="main-footer-content">
         <div id="main-footer-time">
           <span className="nonselectable">Worked Today: </span>
           <span id="main-footer-time-value" className="nonselectable">
             {TimeDurationFormatted}
           </span>
         </div>
         <div id="main-footer-company-time">
           <span className="nonselectable">Company Time: </span>
           <span id="main-footer-company-time-value">
             <Clock format={`hh:mm A [GMT]Z`} ticking={true} timezone={TimeZone} className="nonselectable"/>
           </span>
        </div>
       </div>
    </div>
  );
}

export default Footer;
