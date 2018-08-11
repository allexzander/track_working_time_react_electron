// @flow
import * as React from 'react';

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux';

import TimerWidget from "../components/TimerWidget";

import WindowPortal from "../components/common/WindowPortal";

import { 
  IPC_EVENT_TIMER_WIDGET_OPEN, 
  IPC_EVENT_TIMER_WIDGET_CLOSE,
  IPC_EVENT_TIMER_WIDGET_REQUEST_CLOSE,
} from "../constants/common";

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

type Props = {
  children: React.Node
};

import {
  timeTrackerWidgetShow,
  timeTrackerWidgetHide,

  timeTrackerTick,
} from "../actions/timeTracker";

class App extends React.Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.state = {
      currentTimerValue: 0,
    }

    this.currentTimerIntervalID = null;

    this.handleTimerWidgetOpen = this.handleTimerWidgetOpen.bind(this);
    this.handleTimerWidgetClose = this.handleTimerWidgetClose.bind(this);
    this.requestTimerWidgetClose = this.requestTimerWidgetClose.bind(this);
  }

  handleTimerWidgetOpen() {
    this.props.timeTrackerWidgetShow();
  }

  handleTimerWidgetClose() {
    this.props.timeTrackerWidgetHide();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.isTimerRunning && this.props.isTimerRunning) {
      this.currentTimerIntervalID = setInterval(() => this.props.timeTrackerTick(), 1000);
    }
    else if (prevProps.isTimerRunning && !this.props.isTimerRunning) {
      if (this.currentTimerIntervalID) {
        clearInterval(this.currentTimerIntervalID);
      }
    }
  }

  componentDidMount() {
    ipcRenderer.on(IPC_EVENT_TIMER_WIDGET_OPEN, this.handleTimerWidgetOpen);
    ipcRenderer.on(IPC_EVENT_TIMER_WIDGET_CLOSE, this.handleTimerWidgetClose);
  }
 
  componentWillUnmount() {
    ipcRenderer.removeListener(IPC_EVENT_TIMER_WIDGET_OPEN, this.handleTimerWidgetOpen);
    ipcRenderer.removeListener(IPC_EVENT_TIMER_WIDGET_CLOSE, this.handleTimerWidgetClose);
  }

  requestTimerWidgetClose() {
    ipcRenderer.send(IPC_EVENT_TIMER_WIDGET_REQUEST_CLOSE);
  }

  render() {
    const { children } = this.props;
    return (<React.Fragment>
      {this.props.isWidgetVisible && 
        <WindowPortal windowPortalHandle={this.props.widgetWindowHandle} onClick = {() => null}>
          <TimerWidget onClose={() => this.requestTimerWidgetClose()} text="HELLO!" 
            currentTimerValue={this.props.currentTimerValue} 
            isTimerRunning={this.props.isTimerRunning}
          />
        </WindowPortal>
      }
    {children}
    </React.Fragment>);
  }
}

const mapStateToProps = state => ({
  isWidgetVisible: state.timeTracker.isWidgetVisible,
  widgetWindowHandle: state.timeTracker.widgetWindowHandle,
  currentTimerValue: state.timeTracker.currentTimerValue,
  isTimerRunning: state.timeTracker.isTimerRunning,
});

const mapDispatchToProps = dispatch => ({
  timeTrackerWidgetShow: bindActionCreators(timeTrackerWidgetShow, dispatch),
  timeTrackerWidgetHide: bindActionCreators(timeTrackerWidgetHide, dispatch),


  timeTrackerTick: bindActionCreators(timeTrackerTick, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
