import React from 'react';
import { mount  } from 'enzyme';
import Header from './header';

describe('header component', () => {
  let header = mount(<Header/>);

  it ('renders a group of dropdowns', () => {
    let numDropdowns = 5;
    expect(header.find('Dropdown').length).toEqual(numDropdowns);
  });
});