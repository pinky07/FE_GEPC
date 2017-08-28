import React from 'react';
import { shallow  } from 'enzyme';
import { NodeDetails } from './nodeDetails';

const props = {
  selectedNode: {
    node: {
      policy_value: '100',
      actual_mv: '0.8',
      accountgroupshortname: 'abc',
      accountgroupname: 'test selected node'
    }
  }
};

describe('node details component', () => {
  let nodeDetails = shallow(<NodeDetails />);
  nodeDetails.setProps({ selectedNode: props.selectedNode });
  it ('renders the input with the selected value', () => {
    expect(nodeDetails.find('Input').at(0).props().value).toEqual(props.selectedNode.node.accountgroupname);
  });
});