import React from 'react';
import { shallow  } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { NodeDetails } from '../../components/treeView/nodeDetails';

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

describe('nodeDetails component', () => {
  let wrapper = shallow(<NodeDetails />);
  wrapper.setProps({ selectedNode: props.selectedNode });

  it ('renders correctly', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  /*it ('renders the input with the selected value', () => {
    expect(nodeDetails.find('Input').at(0).props().value).toEqual(props.selectedNode.node.accountgroupname);
  });*/
});