/* eslint-disable indent */
import React from 'react';
import ReactDOM from 'react-dom';

import Root from 'containers/Root';

const render = (Component) => {
  ReactDOM.render(
    <Component />
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