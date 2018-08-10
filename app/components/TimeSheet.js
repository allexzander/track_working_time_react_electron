// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TimeSheet.scss';
import routes from '../constants/routes.json';

const TimeSheet = (props) => {
  return (
    <div>
       <h1>Time Sheet</h1>
       <Link to={routes.HOME}>
          Back
       </Link>
    </div>
  );
}

export default TimeSheet;
