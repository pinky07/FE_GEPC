import * as types from './types';
import assetsAllocationModel from '../model/assetsAllocationModel';

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

/**
 * Saves everything to the backend
 */
export const saveAssetsAllocation = assetsAllocation => {
  return dispatch => {
    return assetsAllocationModel().save(assetsAllocation).then( () => {
      dispatch({ type: types.SAVE_ASSETS_ALLOCATION_SUCCESS });
    });
  };
};

/**
 * Gets the assets allocation from the model
 */
export const getAssetsAllocation = () => {
  return dispatch => {
    return assetsAllocationModel().get().then( assetsAllocation => {
      if (assetsAllocation) {
        dispatch({ type: types.GET_ASSETS_ALLOCATION_SUCCESS, assetsAllocation });
      }
    });
  };
};