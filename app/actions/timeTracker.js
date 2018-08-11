import {
    TIME_TRACKER_START,
    TIME_TRACKER_STOP,
    TIME_TRACKER_TICK,
    TIME_TRACKER_WIDGET_SHOW,
    TIME_TRACKER_WIDGET_HIDE,
} from './actionTypes';


export function timeTrackerStart() {
    return {
        type: TIME_TRACKER_START,
    }
}

export function timeTrackerStop() {
    return {
        type: TIME_TRACKER_STOP,
    }
}

export function timeTrackerTick() {
    return {
        type: TIME_TRACKER_TICK,
        date: new Date(),
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