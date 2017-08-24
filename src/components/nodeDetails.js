import React from 'react';
import { connect } from 'react-redux';
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Card,
  CardBlock,
  CardTitle
} from 'reactstrap';

export class NodeDetails extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      node: {
        policy_value: '',
        actual_mv: '',
        accountgroupshortname: '',
        accountgroupname: ''
      },
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.selectedNode) {
      let node = Object.assign({}, nextProps.selectedNode.node);

      this.setState({
        node
      });
    }
  }

  onChangePolicy(event) {
    this.setState({
      node: {
        ...this.state.node,
        policy_value: event.target.value
      }
    });
  }

  onChangeActual(event) {
    this.setState({
      node:
      {...this.state.node,
        actual_mv: event.target.value
      }
    });
  }

  renderPolicyValue () {
    return this.state.node.policy_value ? `${this.state.node.policy_value}%` : '';
  }

  render () {
    return (
      <div className="nodeDetails">
        <Card>
          <CardBlock>
            <CardTitle>Node Details</CardTitle>
              <InputGroup>
                <InputGroupAddon>Node Name</InputGroupAddon>
                <Input
                  value={this.state.node.accountgroupname}
                />
              </InputGroup>
              <br />

              <InputGroup>
                <InputGroupAddon>Short Code</InputGroupAddon>
                <Input
                  value={this.state.node.accountgroupshortname}
                />
              </InputGroup>
              <br />

              <InputGroup>
                <InputGroupAddon>CRM Invest Prod</InputGroupAddon>
                <Input/>
              </InputGroup>
              <br />

              <InputGroup>
                <InputGroupAddon>Policy Weight</InputGroupAddon>
                <Input
                  value={this.renderPolicyValue()}
                  onChange={this.onChangePolicy}
                />
              </InputGroup>
              <br />

              <InputGroup>
                <InputGroupAddon>Actual MV</InputGroupAddon>
                <Input
                  value={this.state.node.actual_mv || ''}
                  onChange={this.onChangeActual}
                />
              </InputGroup>
              <br />

              <InputGroup>
                <InputGroupAddon>Assumption</InputGroupAddon>
                <Input/>
              </InputGroup>
              <br />

              <InputGroup>
                <InputGroupAddon>Return Series</InputGroupAddon>
                <Input/>
              </InputGroup>
              <br />

              <InputGroup>
                <InputGroupAddon>Liquidity</InputGroupAddon>
                <Input/>
              </InputGroup>
              <br />

              <InputGroup>
                <InputGroupAddon>Active/Pasive</InputGroupAddon>
                <Input/>
              </InputGroup>
              <br />

              <InputGroup>
                <InputGroupAddon>Expense Ratio</InputGroupAddon>
                <Input/>
              </InputGroup>
              <br />

              <InputGroup>
                <InputGroupAddon>Cost Basis</InputGroupAddon>
                <Input/>
              </InputGroup>
          </CardBlock>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedNode: state.allocationTree.selectedNode
  };
};

export default connect(mapStateToProps, null)(NodeDetails);
