// @flow
import * as React from 'react';

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux';

import TimerWidget from "../components/TimerWidget";

import WindowPortal from "../components/common/WindowPortal";

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

type Props = {
  children: React.Node
};

import {
  timeTrackerWidgetShow,
  timeTrackerWidgetHide
} from "../actions/timeTracker";

class App extends React.Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.handleTimerWidgetOpen = this.handleTimerWidgetOpen.bind(this);
    this.handleTimerWidgetClose = this.handleTimerWidgetClose.bind(this);
    this.requestTimerWidgetClose = this.requestTimerWidgetClose.bind(this);
  }

  handleTimerWidgetOpen(_, windowHandle) {
    console.log("timer-widget-open");
    console.dir(windowHandle);
    this.props.timeTrackerWidgetShow(windowHandle);
  }

  handleTimerWidgetClose() {
    console.log("timer-widget-close");
    this.props.timeTrackerWidgetHide();
  }

  componentDidMount() {
    ipcRenderer.on("timer-widget-open", this.handleTimerWidgetOpen);
    ipcRenderer.on("timer-widget-close", this.handleTimerWidgetClose);
  }
 
  componentWillUnmount() {
    ipcRenderer.removeListener("timer-widget-open", this.handleTimerWidgetOpen);
    ipcRenderer.removeListener("timer-widget-close", this.handleTimerWidgetClose);
  }

  requestTimerWidgetClose() {
    console.log("requestTimerWidgetClose");
    ipcRenderer.send("request_timer_widget_close");
  }

  render() {
    const { children } = this.props;
    return (<React.Fragment>
      {this.props.isWidgetVisible && <WindowPortal windowPortalHandle={this.props.widgetWindowHandle} onClick = {() => null}>
        <TimerWidget onClose={() => this.requestTimerWidgetClose()} text="HELLO!"/>
      </WindowPortal>}
    {children}
    </React.Fragment>);
  }
}

const mapStateToProps = state => ({
  isWidgetVisible: state.timeTracker.isWidgetVisible,
  widgetWindowHandle: state.timeTracker.widgetWindowHandle,

});

const mapDispatchToProps = dispatch => ({
  timeTrackerWidgetShow: bindActionCreators(timeTrackerWidgetShow, dispatch),
  timeTrackerWidgetHide: bindActionCreators(timeTrackerWidgetHide, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
