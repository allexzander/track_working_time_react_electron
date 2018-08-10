/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import TimeSheetPage from './containers/TimeSheetPage';
import TimerWidgetContainer from './containers/TimerWidgetContainer';

export default () => (
  <App>
    <Switch>
      <Route path={routes.TIMESHEET} component={TimeSheetPage} />
      <Route path={routes.TIMERWIDGETCONTAINER} component={TimerWidgetContainer} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
