import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Window extends React.Component {
  constructor(props) {
    super(props);
    this.state = { win: null, el: null };
  }

  componentDidMount() {
    let win = window.open('', 'timer-widget-window',);
    let el = document.createElement('div');
    win.document.body.appendChild(el);
    this.setState({ win, el });
  }

  render() {
    const { el } = this.state;
    if (!el) {
      return null;
    }
    return ReactDOM.createPortal(this.props.children, el);
  }
}

export default Window;