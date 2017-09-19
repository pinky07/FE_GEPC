import React from 'react';
import { shallow  } from 'enzyme';
import toJSON from 'enzyme-to-json';
import App from '../App';

describe('app component', () => {
  let wrapper = shallow(<App/>);

  it ('renders correctly', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
