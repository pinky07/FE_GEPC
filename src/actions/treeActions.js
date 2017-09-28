import * as types from './types';
import treeModel from '../model/treeModel';
import assetsAllocationModel from '../model/assetsAllocationModel';
import lookupService from '../services/lookupService';

export const getAllocationTree = () => {
  return dispatch => {
    return assetsAllocationModel().getTree().then( tree => {
      if (tree) {
        dispatch({ type: types.GET_TREE_SUCCESS, tree });
      }
    });
  };
};

export const saveAllocationTree = tree => {
  return dispatch => {
    return treeModel().saveTree(tree).then( () => {
      dispatch({ type: types.SAVE_ASSETS_ALLOCATION_SUCCESS, tree });
    });
  };
};

export const updateTree = treeData => {
  return dispatch => {
    dispatch({ type: types.CHANGE_TREE, treeData });
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

export const selectBetaGroup = betaGroup => {
  return dispatch => {
    dispatch({ type: types.SELECTED_BETA_GROUP, betaGroup });
  }
};


