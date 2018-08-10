import {
  TIME_TRACKER_START

} from '../actions/actionTypes';

const initialState = {
}

export function timeTracker(state = initialState, action) {
  switch (action.type) {
    case TIME_TRACKER_START: {
      return { ...state}
    }

    default:
      return state;
  }
}
