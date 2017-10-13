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
    registerFail: actions.registerFail,
    verificationPass: actions.verificationPass,
    verificationFail: actions.verificationFail
  }, dispatch) })
)

class Auth extends Component {
  initialState = {
    fields: {
      email: {
        value: 'evfleet@gmail.com',
        error: null
      },
      password: {
        value: '12345678',
        error: null
      }
    }
  }

  state = this.initialState

  componentWillReceiveProps(nextProps) {
    const { fields: { email } } = this.state;
    const { auth } = nextProps;

    if (auth.email && auth.email !== email.value) {
      this.setState({
        ...this.state,
        fields: {
          ...this.state.fields,
          email: {
            ...email,
            value: auth.email
          }
        }
      });
    }
  }

  checkErrors() {
    const { fields } = this.state;
    return Object.keys(fields).map((f) => !!fields[f].error).includes(true);
  }

  clearErrors() {
    const { fields } = this.state;
    Object.keys(fields).map((f) => { fields[f].error = null; });
    return fields;
  }

  login = async () => {
    const { fields: { email, password } } = this.state;

    if (!email.value) {
      console.log('no email');
    }

    if (!password.value) {
      console.log('no password');
    }

    if (this.checkErrors()) {
      console.log('there are errors');
      return false;
    }

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    }).then((r) => r.json());

    if ('error' in response) {
      if (response.error.code === 403) {
        this.setState(this.initialState, () => {
          this.props.actions.verificationFail({ email: email.value });
          this.props.history.push('/auth/verification');
        });
      }

      console.log(response.error);
    } else {
      console.log(response.data);
    }
  }

  register = () => {
    console.log('register');
  }

  handleTabChange = (event, data) => {
    this.setState({
      ...this.state,
      fields: this.clearErrors()
    }, () => {
      this.props.history.replace(`/auth/${data.panes[data.activeIndex].menuItem.toLowerCase()}`);
    });
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

    const panes = [{
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
    }];

    return (
      <Container>
        <Switch>
          <Route exact path="/auth/reset" render={() => (
            <ResetForm />
          )} />

          <Route exact path="/auth/verification" render={() => (
            <VerificationForm
              fields={fields}
            />
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