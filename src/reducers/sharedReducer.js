import * as types from '../actions/types';

const INITIAL_STATE = {
  assetsAllocation: {
    name: '',
    mixes: [],
    elements: undefined
  },
  isLoading: false,
};

export default ( state = INITIAL_STATE, action ) => {
  switch (action.type) {
    case types.SHOW_LOADING:
      return { ...state, isLoading: true };
    case types.HIDE_LOADING:
      return { ...state, isLoading: false };
    case types.GET_ASSETS_ALLOCATION_SUCCESS:
      return { ...state, assetsAllocation: action.assetsAllocation };
    default:
      return state;
  }
}
