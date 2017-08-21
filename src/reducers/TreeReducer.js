import * as types from '../actions/types';

const INITIAL_STATE = {
  treeData: [],
  selectedNode: undefined
};

export default ( state = INITIAL_STATE, action ) => {
  switch (action.type) {
    case types.GET_ALLOCATION_ASSETS_SUCCESS:
      return { ...state, treeData: action.treeData };
    case types.SELECTED_NODE:
      return { ...state, selectedNode: action.node };
    default:
      return state;
  }
}
