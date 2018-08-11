import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { TIMER_WIDGET_NAME } from "../../constants/common";

class WindowPortal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      element: null 
    };

    this.portalWindow = null;
  }

  componentDidMount() {
    this.portalWindow = window.open('', TIMER_WIDGET_NAME,);
    const element = document.createElement('div');
    this.portalWindow.document.body.appendChild(element);
    this.setState({ element: element });
  }

  render() {
    const { element } = this.state;
    if (!element) {
      return null;
    }
    return ReactDOM.createPortal(this.props.children, element);
  }
}

export default WindowPortal;