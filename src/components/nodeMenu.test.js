import React from 'react';
import { shallow  } from 'enzyme';
import { NodeMenu } from './nodeMenu';
import sinon from 'sinon';

let props = {
  selectedNode: {
    policy_value: '100',
    actual_mv: '0.8',
    accountgroupshortname: 'abc',
    accountgroupname: 'test selected node'
  },
  jumpLevel: function () {},
  deleteNode: function () {},
  deleteBelow: function () {},
  addBelow: function () {},
  addSibling: function () {},
  addAbove: function () {}
};

describe('node menu component', () => {
  let nodeMenu = shallow(<NodeMenu {...props}/>);

  it ('renders the ContextMenu', () => {
    expect(nodeMenu.find('ContextMenu').exists()).toBe(true);
  });

  it ('renders a group of items', () => {
    expect(nodeMenu.find('Item').length).toEqual(7);
  });

  describe('when clicking an item', () => {
    const addAbove = sinon.spy();
    nodeMenu = shallow(<NodeMenu {...props} addAbove={addAbove}/>);
    it ('call the respective function', () => {
      nodeMenu.find('Item').at(0).simulate('click');
      expect(addAbove.calledOnce).toEqual(true);
    });
  });
});

