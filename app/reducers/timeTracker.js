import {
  TIME_TRACKER_START,
  TIME_TRACKER_STOP,
  TIME_TRACKER_TICK,
  TIME_TRACKER_WIDGET_SHOW,
  TIME_TRACKER_WIDGET_HIDE,
} from '../actions/actionTypes';

const initialState = {
  isWidgetVisible: false,
  isTimerRunning: false,
  currentTimerValue: 0,
}

export function timeTracker(state = initialState, action) {
  switch (action.type) {
    case TIME_TRACKER_START: {
      return { ...state, isTimerRunning: true }
    }
    case TIME_TRACKER_STOP: {
      const currentTimerValue = state.currentTimerValue;
      return { ...state, isTimerRunning: false }
    }
    case TIME_TRACKER_TICK: {
      return { ...state, currentTimerValue: state.currentTimerValue + action.data.tickCount }
    }
    case TIME_TRACKER_WIDGET_SHOW: {
      return { ...state, isWidgetVisible: true };
    }
    case TIME_TRACKER_WIDGET_HIDE: {
      return { ...state, isWidgetVisible: false };
    }

    default:
      return state;
  }
}
