import React from 'react';
import { mount  } from 'enzyme';
import toJSON from 'enzyme-to-json';
import TreeButtonBar from '../../components/treeButtonBar';

describe('treeButtonBar component', () => {
  const props = {
    save: jest.fn(),
  };
  const wrapper = mount(<TreeButtonBar {...props}/>);

  it ('renders correctly', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it ('the save button should call the save function', () => {
    wrapper.findWhere(n => n.type() === 'button' && n.text() === 'Save').simulate('click');
    expect(props.save).toHaveBeenCalled();
  });

});