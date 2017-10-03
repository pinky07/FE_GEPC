import React from 'react';
import { shallow, mount  } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { NodeMenu } from '../../../components/treeView/nodeMenu';
import { selectedNode } from '../../fixtures/tree';

let props = {
  selectedNode: {...selectedNode.node},
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

  it ('initializes a jumpLevel in state', () => {
    expect(wrapper.state()).toEqual({ jumpLevel: 0 });
  });

  describe('when clicking an item', () => {
    beforeEach(() => {
      wrapper = shallow(<NodeMenu {...props}/>);
    });

    it ('the first item should call the addAboveNode function', () => {
       wrapper.find('Item').at(0).simulate('click');
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

    it ('the seventh item should call the jumpLevel function', () => {
      wrapper.find('Item').at(6).simulate('click');
      expect(props.jumpLevel).toHaveBeenCalled();
    });
  });

  describe('when the user types into the jump level input',() => {
    const expectedLevel = 2;
    beforeEach(() => {
      wrapper = shallow(<NodeMenu {...props}/>);
      wrapper.find('Input').simulate('change', { target: { value: expectedLevel } });
    });

    it('updates the jumpLevel state', () => {
      expect(wrapper.state().jumpLevel).toEqual(expectedLevel);
    });

    describe('and the user clicks the jump level item', () => {
      beforeEach(() => {
        wrapper.find('Item').at(6).simulate('click');
      });
      it('dispatches the jumpLevel() it receives from props with the typed level', () => {
        expect(props.jumpLevel).toHaveBeenCalledWith(expectedLevel);
      });
    });

    describe('and the user hits Enter', () => {
      beforeEach(() => {
        wrapper.find('Input').simulate('keypress', { key: 'Enter' });
      });
      it('dispatches the jumpLevel() it receives from props with the typed level', () => {
        expect(props.jumpLevel).toHaveBeenCalledWith(expectedLevel);
      });
    });
  });
});

