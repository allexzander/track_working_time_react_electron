import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TimeSheet from '../components/TimeSheet';

class TimeSheetPage extends Component {
  render() {
    return (
      <TimeSheet timeSheet={this.props.timeSheet}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    timeSheet: state.timeTracker.timeSheet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeSheetPage);
