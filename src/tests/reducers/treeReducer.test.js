import allocationTree from '../../reducers/TreeReducer';
import * as types from '../../actions/types';
import {
  treeReducerDefaultState,
  allocationTree as tree,
  selectedNode,
  rowInfo
} from '../fixtures/tree'

describe('the tree reducer', () => {
  it('should set a default state', () => {
    const state = allocationTree(undefined, { type: '@@INIT' });
    expect(state).toEqual(treeReducerDefaultState);
  });

  it('should set the state tree', () => {
    const action = {
      type: types.GET_ALLOCATION_ASSETS_SUCCESS,
      tree
    };
    const state = allocationTree(undefined, action);
    expect(state.tree).toEqual(tree);
  });

  it('should set the state selected node', () => {
    const action = {
      type: types.SELECTED_NODE,
      node: {...rowInfo}
    };
    const state = allocationTree(undefined, action);
    expect(state.selectedNode).toEqual(selectedNode);
  });
  
  describe('when a node has been selected', () => {
    let state;
    beforeEach(() => {
      state = {
        tree,
        selectedNode
      };
    });
    
    it('should add a children to the selected node', () => {
      const expectedNumChildren = selectedNode.node.children.length + 1;
      const action = {
        type: types.ADD_BELOW_NODE,
      };
      state = allocationTree(state, action);
      expect(state.tree.data[0].children[selectedNode.treeIndex - 1].children.length).toEqual(expectedNumChildren);
    });

    it('should add a sibling to the selected node', () => {
      const expectedNumChildren = state.tree.data[0].children.length + 1;
      const action = {
        type: types.ADD_SIBLING_NODE,
      };
      state = allocationTree(state, action);
      expect(state.tree.data[0].children.length).toEqual(expectedNumChildren);
    });

    it('should add a parent to the selected node', () => {
      const expectedNode = rowInfo.node;
      const action = {
        type: types.ADD_ABOVE_NODE,
      };
      const index = selectedNode.treeIndex - 1;
      state = allocationTree(state, action);
      expect(state.tree.data[0].children[index].children.length).toEqual(1);
      expect(state.tree.data[0].children[index].children[0]).toEqual(expectedNode);
    });

    it('should delete the selected node', () => {
      const expectedNumChildren = state.tree.data[0].children.length - 1;
      const action = {
        type: types.DELETE_NODE,
      };
      state = allocationTree(state, action);
      expect(state.tree.data[0].children.length).toEqual(expectedNumChildren);
      expect(state.selectedNode).toBe(undefined);
    });

    it('should delete the children of the selected node', () => {
      const expectedNumChildren = 0;
      const action = {
        type: types.DELETE_BELOW_NODE,
      };
      state = allocationTree(state, action);
      expect(state.tree.data[0].children[selectedNode.treeIndex - 1].children.length).toEqual(expectedNumChildren);
    });

    it('should jump to the level of the selected node', () => {
      const action = {
        type: types.JUMP_LEVEL,
        level: 1
      };
      state = allocationTree(state, action);
      expect(state.tree.data[0].children[selectedNode.treeIndex - 1].expanded).toBe(true);
    });

    it('should update the details of the selected node', () => {
      const accountNameExpected = 'account test';
      const action = {
        type: types.UPDATE_DETAILS_NODE,
        node: {...rowInfo, accountgroupname: accountNameExpected}
      };
      state = allocationTree(state, action);
      expect(state.tree.data[0].children[selectedNode.treeIndex - 1].accountgroupname).toEqual(accountNameExpected);
    });
  });
});