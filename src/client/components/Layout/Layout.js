import React, { Component } from 'react';

class Layout extends Component {
  render() {
    return (
      <div>

        Layout

        {this.props.children}
      </div>
    );
  }
}

export default Layout;