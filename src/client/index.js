/* eslint-disable indent */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { offline } from 'redux-offline';
import offlineConfig from 'redux-offline/lib/defaults';

import reducer from 'reducers';
import Root from 'containers/Root';

const store = createStore(
  reducer,
  undefined,
  compose(
    offline(offlineConfig)
  )
);

const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider store={ store }>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>
    , document.getElementById('root')
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const Root = require('./containers/Root').default;
    try {
      render(Root);
    } catch (error) {
      location.reload();
    }
  });
}