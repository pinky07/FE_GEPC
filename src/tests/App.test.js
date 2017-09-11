import React from 'react';
import { shallow  } from 'enzyme';
import App from '../App';

describe('app component', () => {
  let app = shallow(<App/>);

  it ('renders the header', () => {
    expect(app.find('Header').exists()).toBe(true);
  });

  it ('renders the content', () => {
    expect(app.find('Content').exists()).toBe(true);
  });
});