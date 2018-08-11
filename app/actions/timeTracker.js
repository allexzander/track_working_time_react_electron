import {
    TIME_TRACKER_START,
    TIME_TRACKER_WIDGET_SHOW,
    TIME_TRACKER_WIDGET_HIDE,
} from './actionTypes';


export function timeTrackerStart() {
    return {
        type: TIME_TRACKER_START,
    }
}

export function timeTrackerWidgetShow() {
    return {
        type: TIME_TRACKER_WIDGET_SHOW,
    }
}

export function timeTrackerWidgetHide() {
    return {
        type: TIME_TRACKER_WIDGET_HIDE,
    }
}