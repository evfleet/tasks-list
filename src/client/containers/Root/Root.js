import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Auth from 'containers/Auth';
import Landing from 'containers/Landing';

@withRouter
@connect(
  ({ rehydrated, isLoading }) => ({ rehydrated, isLoading })
)

class Root extends Component {
  render() {
    const { rehydrated, isLoading } = this.props;

    return (
      <div>
        {!rehydrated || isLoading ? (
          <p>Loading</p>
        ) : (
          <Switch>
            <Route exact path="/" component={ Landing } />
            <Route path="/auth" component={ Auth } />
          </Switch>
        )}
      </div>
    );
  }
}

export default Root;