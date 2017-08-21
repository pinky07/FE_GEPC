import React from 'react';
import { Button } from 'reactstrap';

export default class TreeButtonBar extends React.Component {
  render() {
    return (
      <span className="buttonBar">
        <Button color="primary">New</Button>{' '}
        <Button color="primary">Load</Button>{' '}
        <Button color="primary" onClick={this.props.save}>Save</Button>{' '}
        <Button color="primary">Copy</Button>{' '}
        <Button color="primary">Delete</Button>{' '}
      </span>
    );
  }
}