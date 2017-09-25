import React from 'react';
import { mount  } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ColorPicker from '../../../components/treeView/colorPicker';
import { colorPickerInitialState } from '../../fixtures/tree';

describe('colorPicker component', () => {
  let wrapper = mount (<ColorPicker/>);

  it ('renders correctly', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it ('initializes a displayColorPicker, a selectedColor and a presetColors in state', () => {
    expect(wrapper.state()).toEqual(colorPickerInitialState);
  });

  describe('when clicking the color picker', () => {
    it ('should have the displayColorPicker state set to true', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
      wrapper.find('div').children().first().simulate('click');
      expect(wrapper.state('displayColorPicker')).toBe(true);
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});