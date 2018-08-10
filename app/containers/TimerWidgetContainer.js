import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TimerWidget from '../components/TimerWidget';

import routes from '../constants/routes.json';
import { Link } from 'react-router-dom';

class TimerWidgetContainer extends Component {
  super(props) {
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    console.log("TimerWidgetContainer::handleClose");
  }
  
  render() {
    return (
      <div>
        <Link to={routes.HOME}>
          Back
       </Link>
        <TimerWidget onClose={this.handleClose}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimerWidgetContainer);
