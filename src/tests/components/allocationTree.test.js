import React from 'react';
import { shallow  } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { AllocationTree } from '../../components/allocationTree';

const props = {
  tree: {
    name: '',
    data: []
  },
  treeData: [],
  selectedNode: {},
};

describe('allocationTree component', () => {
  let wrapper = shallow (<AllocationTree {...props}/>);

  it ('renders correctly', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});