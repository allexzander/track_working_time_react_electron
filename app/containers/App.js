// @flow
import React, { Component } from 'react';

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
} from "../constants/common";

//could use simple 'import' here, but left here for compatibility (create-react-app wouldn't work with simple import)
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

import {
  timeTrackerWidgetShow,
  timeTrackerWidgetHide,

  timeTrackerStart,
  timeTrackerStop,

  timeTrackerTick,
} from "../actions/timeTracker";

const TimerTickInterval = 1000;

class App extends Component {
  constructor(props) {
    super(props);

    this.currentTimerIntervalID = null;

    this.handleToggleTimer = this.handleToggleTimer.bind(this);
  }

  killTimer() {
    if (this.currentTimerIntervalID) {
      clearInterval(this.currentTimerIntervalID);
      this.currentTimerIntervalID = null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isTimerRunning !== this.props.isTimerRunning) {

      this.killTimer();

      if (this.props.isTimerRunning) {
        this.currentTimerIntervalID = setInterval(() => this.props.timeTrackerTick(TimerTickInterval), TimerTickInterval);
      }
    }
  }

  componentDidMount() {
    ipcRenderer.on(IPC_EVENT_TIMER_WIDGET_OPEN, () => this.props.timeTrackerWidgetShow());
    ipcRenderer.on(IPC_EVENT_TIMER_WIDGET_CLOSE, () => this.props.timeTrackerWidgetHide());
  }
 
  componentWillUnmount() {
    this.killTimer();
    
    ipcRenderer.removeListener(IPC_EVENT_TIMER_WIDGET_OPEN, () => this.props.timeTrackerWidgetShow());
    ipcRenderer.removeListener(IPC_EVENT_TIMER_WIDGET_CLOSE, () => this.props.timeTrackerWidgetHide());
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
    return (
      <div id="main-wrapper">
        {/*Time Tracker Widget*/}     
        {this.props.isWidgetVisible && 
          <WindowPortal windowPortalHandle={this.props.widgetWindowHandle}>
            <TimerWidget onClose={() => this.props.timeTrackerWidgetHide()} currentTimerValue={this.props.currentTimerValue}
              isTimerRunning={this.props.isTimerRunning} onToggleTimer={this.handleToggleTimer} />
          </WindowPortal>
        }

        {/*Main Window Components*/}
        <Header isTimerRunning={this.props.isTimerRunning} />

        <MainContent currentTimerValue={this.props.currentTimerValue} isTimerRunning={this.props.isTimerRunning}
          onToggleTimer={this.handleToggleTimer} />

        <Footer totalTime={this.props.currentTimerValue} />
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
