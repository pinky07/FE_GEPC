import * as types from './types';

export const showLoading = () => {
  return dispatch => {
    dispatch({ type: types.SHOW_LOADING });
  }
};

export const hideLoading = () => {
  return dispatch => {
    dispatch({ type: types.HIDE_LOADING });
  }
};