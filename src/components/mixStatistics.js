import React from 'react';
import {
  Button,
  Card,
  CardBlock,
  CardTitle,
  Collapse
} from 'reactstrap';

class MixStatistics extends React.Component {

  constructor (props) {
    super(props);
    this.state = { collapse: false };
  }


  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  }

  render () {
    return (
      <div className="statistics">
        <Button onClick={this.toggle}>{this.state.collapse ? 'Hide' : 'Show'} Statistics</Button>
        <br />
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardTitle>Statistics</CardTitle>
            <CardBlock>

            </CardBlock>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default MixStatistics;
