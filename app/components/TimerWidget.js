// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TimerWidget.scss';
import routes from '../constants/routes.json';

const TimeSheet1 = (props) => {
  return (
    <div>
       <h1>Timer Widget</h1>
       <button onClick={() => props.onClose()}>Close</button>
    </div>
  );
}

export default TimeSheet1;
