import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from 'actions';

import Auth from 'containers/Auth';
import Landing from 'containers/Landing';
import Verification from 'containers/Verification';

import Layout from 'components/Layout';
import Loading from 'components/Loading';

@withRouter
@connect(
  ({ auth, isLoading, rehydrated }) => ({ auth, isLoading, rehydrated }),
  (dispatch) => ({ actions: bindActionCreators({
    authPass: actions.authPass,
    authFail: actions.authFail
  }, dispatch) })
)

class Root extends Component {
  componentWillReceiveProps(nextProps) {
    const { auth: { email, refreshToken }, rehydrated } = nextProps;

    if (rehydrated === true && this.props.isLoading === true) {
      this.authenticate({ email, refreshToken });
    }
  }

  async authenticate({ email, refreshToken }) {
    if (!email || !refreshToken) {
      this.props.actions.authFail();
      this.props.history.replace('/auth/login');
      return;
    }

    const response = await fetch('/api/authenticate', {
      method: 'POST',
      body: JSON.stringify({
        email,
        refreshToken
      })
    }).then((r) => r.json());

    if ('error' in response) {
      this.props.actions.authFail();
      this.props.history.replace('/auth/login');
    } else {
      this.props.actions.authPass(response.data);
      this.props.history.replace('/');
    }
  }

  render() {
    const { rehydrated, isLoading } = this.props;

    return (
      <Layout>
        {!rehydrated || isLoading ? (
          <Loading />
        ) : (
          <Switch>
            <Route exact path="/" component={ Landing } />
            <Route path="/auth/login" component={ Auth } />
            <Route path="/auth/verification" component={ Auth } />
          </Switch>
        )}
      </Layout>
    );
  }
}

export default Root;