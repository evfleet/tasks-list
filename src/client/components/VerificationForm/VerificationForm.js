import React, { Component } from 'react';
import { Header, Form, Input, Label, Menu, Segment } from 'semantic-ui-react';

class VerificationForm extends Component {
  render() {
    const { fields } = this.props;

    return (
      <div>
        <Menu
          attached="top"
          fluid={true}
          widths={1}
        >
          <Menu.Item name="Verification" active={true} />
        </Menu>

        <Segment attached>
          <Form size="large">
            <Form.Field>
              <Form.Input
                disabled={!!fields.email.value}
                placeholder="Email"
                value={fields.email.value}
              />
            </Form.Field>

            <Form.Field>
              <Form.Input
                placeholder="Verification Code"
              />
            </Form.Field>

            <Form.Group>
              <Form.Button>
              Back
              </Form.Button>

              <Form.Button>
              Verify
              </Form.Button>
            </Form.Group>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default VerificationForm;