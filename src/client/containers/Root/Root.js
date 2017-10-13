import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from 'actions';

import Auth from 'containers/Auth';
import Landing from 'containers/Landing';

import Layout from 'components/Layout';
import Loading from 'components/Loading';

@withRouter
@connect(
  ({ auth, ui }) => ({ auth, ui }),
  (dispatch) => ({ actions: bindActionCreators({
    authPass: actions.authPass,
    authFail: actions.authFail
  }, dispatch) })
)

class Root extends Component {
  componentWillReceiveProps(nextProps) {
    const { auth, ui: { rehydrated, ready } } = nextProps;

    if (rehydrated && !ready) {
      setTimeout(() => {
        this.authenticate(auth);
      }, 500);
    }
  }

  async authenticate({ isLoggedIn, email, refreshToken }) {
    if (!isLoggedIn || !email || !refreshToken) {
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
    const { ui: { rehydrated, ready } } = this.props;

    return (
      <Layout>
        {!rehydrated || !ready ? (
          <Loading />
        ) : (
          <Switch>
            <Route path="/auth" component={ Auth } />
            <Route exact path="/" component={ Landing } />
          </Switch>
        )}
      </Layout>
    );
  }
}

export default Root;