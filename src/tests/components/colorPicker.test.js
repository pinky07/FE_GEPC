import React from 'react';
import { mount  } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ColorPicker from '../../components/treeView/colorPicker';

describe('colorPicker component', () => {
  let wrapper = mount (<ColorPicker/>);

  it ('renders correctly', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it ('should have the state displayColorPicker set to false ', () => {
    expect(wrapper.state('displayColorPicker')).toBe(false);
  });

  it ('should have the state displayColorPicker set to true after clicking the color picker ', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.find('div').children().first().simulate('click');
    expect(wrapper.state('displayColorPicker')).toBe(true);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});