import React from 'react';
import { shallow  } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Content } from '../../components/content';
import allocation from '../../data/allocations.json';

describe('content component', () => {
  const props = {
    assetsAllocation: allocation,
  };
  let wrapper = shallow (<Content {...props} />);

  it ('renders correctly', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});