import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Container, Tab } from 'semantic-ui-react';

import * as actions from 'actions';

import AuthForm from 'components/AuthForm';

import ResetForm from 'components/ResetForm';
import VerificationForm from 'components/VerificationForm';

@withRouter
@connect(
  ({ auth }) => ({ auth }),
  (dispatch) => ({ actions: bindActionCreators({
    loginPass: actions.loginPass,
    loginFail: actions.loginFail,
    registerPass: actions.registerPass,
    registerFail: actions.registerFail
  }, dispatch) })
)

class Auth extends Component {
  state = {
    fields: {
      email: {
        value: '',
        errors: null
      },
      password: {
        value: '',
        errors: null
      }
    }
  }

  login() {

  }

  register() {

  }

  handleTabChange = (event, data) => {
    this.props.history.replace(`/auth/${data.panes[data.activeIndex].menuItem.toLowerCase()}`);
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
        [name]: {
          value: value,
          errors: null
        }
      }
    });
  }

  render() {
    const { mode, fields } = this.state;
    const activeIndex = this.props.location.pathname === '/auth/login' ? 0 : 1;

    const panes = [
      {
        menuItem: 'Login',
        render: () => (
          <Tab.Pane>
            <AuthForm
              mode="login"
              fields={fields}
              handleSubmit={this.login}
              handleInputChange={this.handleInputChange}
            />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Register',
        render: () => (
          <Tab.Pane>
            <AuthForm
              mode="register"
              fields={fields}
              handleSubmit={this.register}
              handleInputChange={this.handleInputChange}
            />
          </Tab.Pane>
        )
      }
    ];

    return (
      <Container>
        <Switch>
          <Route exact path="/auth/reset" render={() => (
            <ResetForm />
          )} />

          <Route exact path="/auth/verification" render={() => (
            <VerificationForm />
          )} />

          <Route path="/auth/" render={() => (
            <Tab

              menu={{ attached: 'top', fluid: true, widths: 2 }}
              activeIndex={activeIndex}
              panes={panes}
              onTabChange={this.handleTabChange}
            />
          )} />
        </Switch>
      </Container>
    );
  }
}

export default Auth;