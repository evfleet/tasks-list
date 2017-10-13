import React, { Component } from 'react';
import { Divider, Form, Header, Input, Label } from 'semantic-ui-react';

class AuthForm extends Component {
  render() {
    const { mode, fields, handleSubmit, handleInputChange } = this.props;

    return (
      <Form size="large">
        <Form.Field>
          <Input
            name="email"
            placeholder="Email"
            value={fields.email.value}
            error={!!fields.email.error}
            onChange={handleInputChange}
          />
        </Form.Field>

        <Form.Field>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={fields.password.value}
            error={!!fields.password.error}
            onChange={handleInputChange}
          />
        </Form.Field>

        <Form.Group>
          <Form.Button>
            Clear
          </Form.Button>

          <Form.Button>
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </Form.Button>
        </Form.Group>
      </Form>
    );
  }
}

export default AuthForm;