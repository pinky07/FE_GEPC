import * as types from './types';

/**
 * Saves everything to the backend
 */
export const save = () => {
  return dispatch => {
    dispatch({ type: types.SAVE });
  }
};

/**
 * Displays a loading spinner
 */
export const showLoading = () => {
  return dispatch => {
    dispatch({ type: types.SHOW_LOADING });
  }
};

/**
 * Hides the loading spinner
 */
export const hideLoading = () => {
  return dispatch => {
    dispatch({ type: types.HIDE_LOADING });
  }
};