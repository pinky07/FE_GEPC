import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../actions/types';
import * as treeActions from '../../actions/treeActions';
import { treeModel } from '../../mockData/fixtures';

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

  jest.mock('../../model/treeModel', () => ({
    __esModule: true,
    default: () => {
      return {
        getTree: () => {
          return new Promise((resolve, reject) => {
            resolve({
              name: 'tree test',
              data: [
                {
                  clientname: 'Bose',
                  planname: 'Bose Corporation Employees’ Retirement Plan',
                  accountgrouptype: 'G',
                  accountgroupid: '733094AB-70F2-48FC-B026-4A580704466E',
                  accountgroupname: 'Composite',
                  accountgroupshortname: 'RBCCOMP',
                  accountgroupperformanceenddate: null,
                  level: 2,
                  id: 2,
                  parent_object_id: '2728654E-489C-406E-90F6-6D1458449A6A',
                  as_of: '6/30/17',
                  policy_value: 100,
                  aa_model_benchmark: null,
                  actual_mv: null,
                  title: 'Composite',
                  children: [],
                }
              ]
            });
          });
        },
        saveTree: tree => {
          return new Promise((resolve, reject) => {
            resolve(tree);
          });
        }
      }
    }
  }));
  
  beforeEach(() => {
    store = createMockStore({...mockStore});
  });

  it('creates an async action to fetch the tree', () => {
    const expectedActions = [
      {
        type: types.GET_ALLOCATION_ASSETS_SUCCESS,
        tree: {...treeModel},
      }
    ];

    return store.dispatch(treeActions.getAllocationTree()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


  it('creates an async action to save the tree', () => {
    const expectedActions = [
      {
        type: types.SAVE_ALLOCATION_ASSETS_SUCCESS,
        tree: {...treeModel},
      }
    ];

    return store.dispatch(treeActions.saveAllocationTree({...treeModel})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('updates the tree', () => {
    const expectedActions = [
      {
        type: types.CHANGE_TREE,
        treeData: {...treeModel},
      }
    ];

    store.dispatch(treeActions.updateTree({...treeModel}));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
