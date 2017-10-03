import * as types from '../actions/types';

const INITIAL_STATE = {
  isLoading: false,
};

export default ( state = INITIAL_STATE, action ) => {
  switch (action.type) {
    case types.SHOW_LOADING:
      return { ...state, isLoading: true };
    case types.HIDE_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
