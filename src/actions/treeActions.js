import * as types from './types';
import allocationModel from '../model/allocationModel';

export const getAllocationTree = () => {
  return dispatch => {
    return allocationModel().getAllocationTree().then( treeData => {
      if (treeData) {
        dispatch({ type: types.GET_ALLOCATION_ASSETS_SUCCESS, treeData });
      }
    });
  };
};

export const saveAllocationTree = treeData => {
  return dispatch => {
    return allocationModel().saveAllocationTree(treeData).then( () => {
      dispatch({ type: types.SAVE_ALLOCATION_ASSETS_SUCCESS, treeData });
    });
  };
};

export const selectNode = node => {
  return dispatch => {
    dispatch({ type: types.SELECTED_NODE, node });
  }
};
