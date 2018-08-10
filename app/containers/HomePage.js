// @flow
import React, { Component } from 'react';
import Home from '../components/Home';

import {
  timeTrackerStart,
} from "../actions/timeTracker";

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux';

class HomePage extends Component {
  render() {
    return <Home onTimeTrackerStart={() => this.props.timeTrackerStart()}/>;
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  timeTrackerStart: bindActionCreators(timeTrackerStart, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
