import React from 'react';
import {
  InputGroup,
  InputGroupAddon,
  Input,
} from 'reactstrap';

class MixDetails extends React.Component {

  render () {
    return (
      <div className="nodeDetails">
        <InputGroup>
          <InputGroupAddon>Comments</InputGroupAddon>
          <Input/>
        </InputGroup>
        <br />

        <InputGroup>
          <InputGroupAddon>Mix Name</InputGroupAddon>
          <Input/>
        </InputGroup>
        <br />

        <InputGroup>
          <InputGroupAddon>Effective Date</InputGroupAddon>
          <Input />
        </InputGroup>
        <br />

        <InputGroup>
          <InputGroupAddon>Mix Type</InputGroupAddon>
          <Input />
        </InputGroup>
        <br />

        <InputGroup>
          <InputGroupAddon>Market Value</InputGroupAddon>
          <Input/>
        </InputGroup>
      </div>
    );
  }
}

export default MixDetails;
