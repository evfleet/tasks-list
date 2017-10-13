import React, { Component } from 'react';
import { Form, Input, Label } from 'semantic-ui-react';

const AuthForm = ({ mode, fields, handleSubmit, handleInputChange }) => (
  <Form size="large">
    {Object.keys(fields).map((field) => (
      <Form.Field key={field}>
        <Form.Input
          name={field}
          type={field === 'password' ? 'password' : 'text'}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={fields[field].value}
          onChange={handleInputChange}
        />

        {fields[field].error ? <p>{fields[field].error}</p> : null}
      </Form.Field>
    ))}

    <Form.Group>
      <Form.Button>
        Clear
      </Form.Button>

      <Form.Button onClick={handleSubmit}>
        {mode.charAt(0).toUpperCase() + mode.slice(1)}
      </Form.Button>
    </Form.Group>
  </Form>
);

export default AuthForm;