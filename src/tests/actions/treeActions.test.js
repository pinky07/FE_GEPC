import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../actions/types';
import * as treeActions from '../../actions/treeActions';
import { allocationTree as tree } from '../fixtures/tree';
jest.mock('../../model/assetsAllocationModel');

describe ('tree actions', () => {

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

  it('creates an async action to fetch the tree', () => {
    const expectedActions = [
      {
        type: types.GET_TREE_SUCCESS,
        tree
      }
    ];

    return store.dispatch(treeActions.getAllocationTree()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('updates the tree', () => {
    const expectedActions = [
      {
        type: types.CHANGE_TREE,
        treeData: {...tree},
      }
    ];

    store.dispatch(treeActions.updateTree({...tree}));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
