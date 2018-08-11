// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TimerWidget.scss';
import routes from '../constants/routes.json';

import { ipcRenderer } from 'electron';

const handleClick = (event) => {
  event.preventDefault();
  console.log("handleClick");
  ipcRenderer.send("request_timer_widget_close")
}

const TimerWidget = (props) => {
  console.dir(props);
  return (
    <div onClick = {() => null}>
       <h1>{props.text}</h1>
       <button onClick={handleClick}>Close</button>
    </div>
  );
}

export default TimerWidget;
