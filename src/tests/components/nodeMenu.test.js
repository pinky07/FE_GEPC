import React from 'react';
import { shallow, mount  } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { NodeMenu } from '../../components/treeView/nodeMenu';

let props = {
  selectedNode: {
    policy_value: '100',
    actual_mv: '0.8',
    accountgroupshortname: 'abc',
    accountgroupname: 'test selected node'
  },
  jumpLevel: jest.fn(),
  deleteNode: jest.fn(),
  deleteBelowNode: jest.fn(),
  addBelowNode: jest.fn(),
  addSiblingNode: jest.fn(),
  addAboveNode: jest.fn()
};

describe('nodeMenu component', () => {
  let wrapper = shallow(<NodeMenu {...props}/>);

  it ('renders correctly', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  describe('when clicking an item', () => {
    let wrapper = shallow(<NodeMenu {...props}/>);

    it ('the first item should call the addAboveNode function', () => {
     // console.log(wrapper.debug())
      wrapper.find('Item').filterWhere(n => n.contains('Above')).simulate('click');
      console.log(wrapper.find('Item').at(0).debug())
      //wrapper.find('Item').at(0).simulate('click');
      expect(props.addAboveNode).toHaveBeenCalled();
    });

    it ('the second item should call the addSibling function', () => {
      wrapper.find('Item').at(1).simulate('click');
      expect(props.addSiblingNode).toHaveBeenCalled();
    });

    it ('the third item should call the addBelowNode function', () => {
      wrapper.find('Item').at(2).simulate('click');
      expect(props.addBelowNode).toHaveBeenCalled();
    });

    it ('the fith item should call the deleteNode function', () => {
      wrapper.find('Item').at(4).simulate('click');
      expect(props.deleteNode).toHaveBeenCalled();
    });

    it ('the sixth item should call the deleteBelowNode function', () => {
      wrapper.find('Item').at(5).simulate('click');
      expect(props.deleteBelowNode).toHaveBeenCalled();
    });
  });

});

