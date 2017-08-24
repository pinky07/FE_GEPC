import React from 'react';
import { mount  } from 'enzyme';
import TreeButtonBar from './treeButtonBar';

describe('tree button bar component', () => {
  let treeButtonBar = mount(<TreeButtonBar/>);

  it ('renders the ContextMenu', () => {
    let numButtons = 5;
    expect(treeButtonBar.find('Button').length).toEqual(numButtons);
  });
});