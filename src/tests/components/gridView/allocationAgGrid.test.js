import React from 'react';
import { shallow  } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { AllocationAgGrid } from '../../../components/gridView/allocationAgGrid';

const props = {
  gridData: [],
  mixes: [],
};

describe('AllocationAgGrid component', () => {
  let wrapper = shallow (<AllocationAgGrid {...props}/>);

  it ('renders correctly', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});