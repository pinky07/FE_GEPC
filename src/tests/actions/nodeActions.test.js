import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../actions/types';
import * as nodeActions from '../../actions/nodeActions';
import { selectedNode } from '../../mockData/fixtures';

describe('node actions', () => {
  const createMockStore = configureMockStore([thunk]);
  const mockStore = {
    tree: {
      name: '',
      data: []
    },
    selectedNode: undefined
  };
  let store = createMockStore({...mockStore});

  beforeEach(() => {
    store = createMockStore({...mockStore});
  });

  it('select a node', () => {
    const expectedActions = [
      {
        type: types.SELECTED_NODE,
        node: {...selectedNode},
      }
    ];

    store.dispatch(nodeActions.selectNode({...selectedNode}));
    expect(store.getActions()).toEqual(expectedActions);
  });


  it('add a node above', () => {
    const expectedActions = [
      {
        type: types.ADD_ABOVE_NODE,
      }
    ];

    store.dispatch(nodeActions.addAboveNode());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('add a sibling node', () => {
    const expectedActions = [
      {
        type: types.ADD_SIBLING_NODE,
      }
    ];

    store.dispatch(nodeActions.addSiblingNode());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('add a node below', () => {
    const expectedActions = [
      {
        type: types.ADD_BELOW_NODE,
      }
    ];

    store.dispatch(nodeActions.addBelowNode());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('delete all nodes below', () => {
    const expectedActions = [
      {
        type: types.DELETE_BELOW_NODE,
      }
    ];

    store.dispatch(nodeActions.deleteBelowNode());
    expect(store.getActions()).toEqual(expectedActions);
  });


  it('delete a node', () => {
    const expectedActions = [
      {
        type: types.DELETE_NODE,
        node: {...selectedNode},
      }
    ];

    store.dispatch(nodeActions.deleteNode({...selectedNode}));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('jump level', () => {
    const level = 5;
    const expectedActions = [
      {
        type: types.JUMP_LEVEL,
        level
      }
    ];

    store.dispatch(nodeActions.jumpLevel(level));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('update details node', () => {
    const expectedActions = [
      {
        type: types.UPDATE_DETAILS_NODE,
        node: {...selectedNode},
      }
    ];

    store.dispatch(nodeActions.updateDetailsNode({...selectedNode}));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
