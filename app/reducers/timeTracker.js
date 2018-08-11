import {
  TIME_TRACKER_START,
  TIME_TRACKER_WIDGET_SHOW,
  TIME_TRACKER_WIDGET_HIDE,
} from '../actions/actionTypes';

const initialState = {
  isWidgetVisible: false,
  widgetWindowHandle: null,
}

export function timeTracker(state = initialState, action) {
  switch (action.type) {
    case TIME_TRACKER_START: {
      return { ...state }
    }
    case TIME_TRACKER_WIDGET_SHOW: {
      return { ...state, isWidgetVisible: true, widgetWindowHandle: action.data.widgetWindowHandle };
    }
    case TIME_TRACKER_WIDGET_HIDE: {
      return { ...state, isWidgetVisible: false, widgetWindowHandle: null };
    }

    default:
      return state;
  }
}
