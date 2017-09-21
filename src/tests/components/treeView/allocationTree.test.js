import React from 'react';
import { shallow  } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { AllocationTree } from '../../../components/treeView/allocationTree';

const props = {
  tree: {
    name: '',
    data: []
  },
  selectedNode: {},
};

describe('allocationTree component', () => {
  let wrapper = shallow (<AllocationTree {...props}/>);

  it ('renders correctly', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});