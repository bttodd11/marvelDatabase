import React, { Component } from 'react';

export default class info extends Component {
  render() {
    return (
      <div className="info">
        { this.props.children }
      </div>
    )
  }
}
