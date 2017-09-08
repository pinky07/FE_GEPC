import React from 'react';
import { mount  } from 'enzyme';
import ColorPicker from './colorPicker';

describe('content component', () => {
  let colorPicker = mount (<ColorPicker/>);

  it ('renders a color picker', () => {
    expect(colorPicker.find('ColorPicker').exists()).toBe(true);
  });

  it ('should have false at the displayColorPicker state ', () => {
    expect(colorPicker.state('displayColorPicker')).toBe(false);
  });

  it ('should have true at the displayColorPicker state after click the color picker ', () => {
    colorPicker.find('div').children().first().simulate('click');
    expect(colorPicker.state('displayColorPicker')).toBe(true);
  });
});