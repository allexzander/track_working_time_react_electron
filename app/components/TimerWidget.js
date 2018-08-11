// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TimerWidget.scss';
import routes from '../constants/routes.json';

import { ipcRenderer } from 'electron';

const TimerWidget = (props) => {
  console.dir(props);
  return (
    <div onClick = {() => null}>
       <h1>{props.text}</h1>
       <button onClick={props.onClose}>Close</button>
    </div>
  );
}

export default TimerWidget;
