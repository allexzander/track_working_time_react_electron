// @flow
import React from 'react';

import moment from 'moment';

const Footer = (props) => {
  const momentDuration = moment.duration(props.totalTime, "milliseconds");

  const hours = momentDuration.hours() >= 10 ? momentDuration.hours().toString() : `0${momentDuration.hours()}`;
  const minutes = momentDuration.minutes() >= 10 ? momentDuration.minutes().toString() : `0${momentDuration.minutes()}`;

  console.log(hours);
  const TimeDurationFormatted = `${momentDuration.hours() > 0 ? hours + "h " : ""}${momentDuration.minutes() > 0 ? minutes + "m " : ""}`

  return (
    <div id="main-footer">
      <div id="main-footer-content">
         <div id="main-footer-time"><b><span>Worked Today: </span><span id="main-footer-time-value">{TimeDurationFormatted}</span></b></div>
         <div id="main-footer-company-time"><b><span>Company Time: </span><span id="main-footer-company-time-value">10:28 PM GMT+08:00</span></b></div>
       </div>
    </div>
  );
}

export default Footer;
