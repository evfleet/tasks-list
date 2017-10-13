import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from 'actions';

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
    mode: 'login',
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

  handleSubmit = (event) => {
    event.preventDefault();

    const { mode, fields } = this.state;

    if (mode === 'login') {

    }

    if (mode === 'register') {

    }
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
        [event.target.name]: {
          value: event.target.value,
          errors: null
        }
      }
    });
  }

  toggleMode = () => {
    this.setState({
      ...this.state,
      mode: this.state.mode === 'login' ? 'register' : 'login'
    });
  }

  render() {
    const { mode, fields: { email, password } } = this.state;

    return (
      <div>
        <div>
          <button
            onClick={this.toggleMode}
            disabled={mode === 'login'}
          >
            Login
          </button>

          <button
            onClick={this.toggleMode}
            disabled={mode === 'register'}
          >
            Register
          </button>
        </div>

        <div>
          <h2>{mode}</h2>

          <form onSubmit={this.handleSubmit}>
            <label htmlFor="auth__email">
              Email:
              <input
                id="auth__email"
                name="email"
                type="email"
                value={email.value}
                onChange={this.handleChange}
              />
            </label>

            <label htmlFor="auth__password">
              Password:
              <input
                id="auth__password"
                name="password"
                type="password"
                value={password.value}
                onChange={this.handleChange}
              />
            </label>

            <button type="submit">{mode}</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;