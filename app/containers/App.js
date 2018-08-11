// @flow
import * as React from 'react';

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux';

import TimerWidget from "../components/TimerWidget";

import WindowPortal from "../components/common/WindowPortal";

import Header from "../components/Header";
import MainContent from "../components/MainContent";
import Footer from "../components/Footer";

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

  timeTrackerStart,
  timeTrackerStop,

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
    this.handleToggleTimer = this.handleToggleTimer.bind(this);
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

  handleToggleTimer() {
    if (this.props.isTimerRunning) {
      this.props.timeTrackerStop();
    }
    else {
      this.props.timeTrackerStart();
    }
  }

  render() {
    const { store, history } = this.props;
    return (
      <div id="main-wrapper">
          {this.props.isWidgetVisible && 
            <WindowPortal windowPortalHandle={this.props.widgetWindowHandle}>
              <TimerWidget onClose={() => this.requestTimerWidgetClose()} 
              currentTimerValue={this.props.currentTimerValue} 
              isTimerRunning={this.props.isTimerRunning}
              onToggleTimer={this.handleToggleTimer}
            />
          </WindowPortal>
          }
          <Header isTimerRunning={this.props.isTimerRunning}/>
          <MainContent currentTimerValue={this.props.currentTimerValue} 
              isTimerRunning={this.props.isTimerRunning}
              onToggleTimer={this.handleToggleTimer}/>
          <Footer currentTimerValue={this.props.currentTimerValue}/>
        </div>
    );
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

  timeTrackerStart: bindActionCreators(timeTrackerStart, dispatch),
  timeTrackerStop: bindActionCreators(timeTrackerStop, dispatch),

  timeTrackerTick: bindActionCreators(timeTrackerTick, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
