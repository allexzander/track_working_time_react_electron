// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.scss';

const Home = (props) => {
    return (
      <div className={styles.container} data-tid="container">
        <div><h1>{props.currentTimerValue}</h1></div>
        <Link to={routes.TIMESHEET}>View Timesheet</Link>
        {props.isTimerRunning ? <div><button onClick={() => props.onTimeTrackerStop()}>Stop Time Tracker</button></div>
      :
      <div><button onClick={() => props.onTimeTrackerStart()}>Start Time Tracker</button></div>}
      </div>
    );
}

export default Home;
