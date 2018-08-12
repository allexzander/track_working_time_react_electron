import React from "react";
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';
import { configureStore, history } from './store/configureStore';
import './app.global.scss';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

const store = configureStore();

render(
  <AppContainer>
    <Provider store={store}>
        <ConnectedRouter history={history}>
    <App />
    </ConnectedRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextRoot = require('./containers/App'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <Provider store={store}>
        <ConnectedRouter history={history}>
        <NextRoot />
        
    </ConnectedRouter>
    </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
