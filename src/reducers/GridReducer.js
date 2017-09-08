import * as types from '../actions/types';

const INITIAL_STATE = {
  gridData: [],
  mixes: [],
  isLoading: false,
};

export default ( state = INITIAL_STATE, action ) => {
  switch (action.type) {
    case types.GET_ALLOCATION_ASSETS_SUCCESS:
      return { ...state, gridData: action.treeData, isLoading: false, };
    case types.SAVE_ALLOCATION_ASSETS_SUCCESS:
      return { ...state, gridData: action.treeData, isLoading: false, };
    default:
      return state;
  }
}
