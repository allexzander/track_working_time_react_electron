// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.scss';

const Home = (props) => {
    return (
      <div className={styles.container} data-tid="container">
        <Link to={routes.TIMESHEET}>View Timesheet</Link>
        <div><Link to={routes.TIMERWIDGETCONTAINER}>Show Timer Widget</Link></div>
        <div><button onClick={() => props.onTimeTrackerStart()}>Start Time Tracker</button></div>
      </div>
    );
}

export default Home;
