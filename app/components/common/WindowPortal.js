import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { TIMER_WIDGET_NAME } from "../../constants/common";

const copyStyles = (sourceDoc, targetDoc) => {
  Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
    if (styleSheet.cssRules) { // for <style> elements
      const newStyleEl = sourceDoc.createElement('style');

      Array.from(styleSheet.cssRules).forEach(cssRule => {
        // write the text of each rule into the body of the style element
        newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
      });

      targetDoc.head.appendChild(newStyleEl);
    } 
    else if (styleSheet.href) { // for <link> elements loading CSS from a URL
      const newLinkEl = sourceDoc.createElement('link');

      newLinkEl.rel = 'stylesheet';
      newLinkEl.href = styleSheet.href;
      targetDoc.head.appendChild(newLinkEl);
    }
  });
}

class WindowPortal extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      element: null 
    };

    this.portalWindow = null;
  }

  componentDidMount() {
    this.portalWindow = window.open("", TIMER_WIDGET_NAME);

    //need to copy all the styles into new window's document
    copyStyles(document, this.portalWindow.document);

    const element = document.createElement('div');

    this.portalWindow.document.body.appendChild(element);

    //after new element is created and appended - we can render children into Portal
    this.setState({ element: element });
  }

  componentWillUnmount() {
    this.portalWindow.close();
  }

  render() {
    if (!this.state.element) {
      return null;
    }
    return ReactDOM.createPortal(this.props.children, this.state.element);
  }
}

export default WindowPortal;