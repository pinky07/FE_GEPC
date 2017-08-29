import * as types from './types';
import allocationModel from '../model/allocationModel';
import lookupService from '../services/lookupService';

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

export const getBetaGroups = () => {
  return dispatch => {
    return lookupService().getBetaGroups().then( betaGroups => {
      if (betaGroups) {
        dispatch({ type: types.GET_BETA_GROUPS_SUCCESS, betaGroups });
      }
    });
  };
};