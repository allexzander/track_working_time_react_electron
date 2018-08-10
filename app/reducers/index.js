// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import { timeTracker } from "./timeTracker"

const rootReducer = combineReducers({
  timeTracker,
});

export default rootReducer;
