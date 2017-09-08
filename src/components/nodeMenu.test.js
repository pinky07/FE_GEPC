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
  deleteNode: sinon.spy(),
  deleteBelowNode:  sinon.spy(),
  addBelowNode:  sinon.spy(),
  addSiblingNode:  sinon.spy(),
  addAboveNode:  sinon.spy()
};

describe('node menu component', () => {
  let nodeMenu = shallow(<NodeMenu {...props}/>);

  it ('renders the ContextMenu', () => {
    expect(nodeMenu.find('ContextMenu').exists()).toBe(true);
  });

  it ('renders a group of items', () => {
    const items = nodeMenu.find('Item');
    //console.log(items)
    expect(items.length).toEqual(7);
  });

  it ('the first item should be to add a Node Above', () => {
    expect(nodeMenu.find('Item').at(0).children().text()).toEqual('Add a Node Above');
  });
  
  it ('the second item should be to add a sibling node', () => {
    expect(nodeMenu.find('Item').at(1).children().text()).toEqual('Add a Sibling Node');
  });

  describe('when clicking an item', () => {
    nodeMenu = shallow(<NodeMenu {...props}/>);
    it ('the first item should call the addAboveNode function', () => {
      nodeMenu.find('Item').at(0).simulate('click');
      expect(props.addAboveNode.calledOnce).toEqual(true);
    });

    it ('the second item should call the addSibling function', () => {
      nodeMenu.find('Item').at(1).simulate('click');
      expect(props.addSiblingNode.calledOnce).toEqual(true);
    });

    it ('the third item should call the addBelowNode function', () => {
      nodeMenu.find('Item').at(2).simulate('click');
      expect(props.addBelowNode.calledOnce).toEqual(true);
    });

    it ('the fith item should call the deleteNode function', () => {
      nodeMenu.find('Item').at(4).simulate('click');
      expect(props.deleteNode.calledOnce).toEqual(true);
    });

    it ('the sixth item should call the deleteBelowNode function', () => {
      nodeMenu.find('Item').at(5).simulate('click');
      expect(props.deleteBelowNode.calledOnce).toEqual(true);
    });
  });

});

