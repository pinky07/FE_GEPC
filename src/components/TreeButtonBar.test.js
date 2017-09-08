import React from 'react';
import { mount  } from 'enzyme';
import sinon from 'sinon';
import TreeButtonBar from './treeButtonBar';

describe('tree button bar component', () => {
  const props = {
    save: sinon.spy(),
  };
  const treeButtonBar = mount(<TreeButtonBar {...props}/>);

  it ('renders the ContextMenu', () => {
    let numButtons = 5;
    expect(treeButtonBar.find('Button').length).toEqual(numButtons);
  });

  it ('the third button should call the save function', () => {
    treeButtonBar.find('Button').at(2).simulate('click');
    expect(props.save.calledOnce).toEqual(true);
  });

});