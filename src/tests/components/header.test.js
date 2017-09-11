import React from 'react';
import { mount  } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Header from '../../components/header';

describe('header component', () => {
  let wrapper = mount(<Header/>);

  it ('renders correctly', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});