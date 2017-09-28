import React from 'react';
import { mount  } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { Header } from '../../components/header';

let props = {
  segment: 'Segment',
  client: 'Client',
  plan: 'Plan',
  save: jest.fn(),
};

describe('header component', () => {
  let wrapper = mount(<Header {...props}/>);

  it ('renders correctly', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});