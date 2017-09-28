import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

import spotFire from '../fixtures/spotfire';
import { Header } from '../../components/header';

let props = {
  ...spotFire,
};

describe('header component', () => {
  let wrapper = mount(<Header {...props} />);

  it('renders correctly', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});