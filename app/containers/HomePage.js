// @flow
import React, { Component } from 'react';
import Home from '../components/Home';

import {
  timeTrackerStart,
  timeTrackerStop,
} from "../actions/timeTracker";

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux';

class HomePage extends Component {
  render() {
    return <Home 
    onTimeTrackerStart={() => this.props.timeTrackerStart()} 
    onTimeTrackerStop={() => this.props.timeTrackerStop()} 
    currentTimerValue={this.props.currentTimerValue}
    isTimerRunning={this.props.isTimerRunning}/>;
  }
}

const mapStateToProps = state => ({
  currentTimerValue: state.timeTracker.currentTimerValue,
  isTimerRunning: state.timeTracker.isTimerRunning,
});

const mapDispatchToProps = dispatch => ({
  timeTrackerStart: bindActionCreators(timeTrackerStart, dispatch),
  timeTrackerStop: bindActionCreators(timeTrackerStop, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
