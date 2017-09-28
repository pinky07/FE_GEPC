import * as types from './types';
import assetsAllocationModel from '../model/assetsAllocationModel';

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

export const getAssetsAllocation = () => {
  return dispatch => {
    return assetsAllocationModel().get().then( assetsAllocation => {
      if (assetsAllocation) {
        dispatch({ type: types.GET_ASSETS_ALLOCATION_SUCCESS, assetsAllocation });
      }
    });
  };
};