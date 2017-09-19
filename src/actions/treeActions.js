import * as types from './types';
import treeModel from '../model/treeModel';
import lookupService from '../services/lookupService';

export const getAllocationTree = () => {
  return dispatch => {
    return treeModel().getTree().then( tree => {
      if (tree) {
        dispatch({ type: types.GET_ALLOCATION_ASSETS_SUCCESS, tree });
      }
    });
  };
};

export const saveAllocationTree = treeData => {
  return dispatch => {
    return treeModel().saveTree(treeData).then( () => {
      dispatch({ type: types.SAVE_ALLOCATION_ASSETS_SUCCESS, treeData });
    });
  };
};

export const selectNode = node => {
  return dispatch => {
    dispatch({ type: types.SELECTED_NODE, node });
  }
};

export const addAboveNode = () => {
  return dispatch => {
    dispatch({ type: types.ADD_ABOVE_NODE });
  }
};

export const addSiblingNode = () => {
  return dispatch => {
    dispatch({ type: types.ADD_SIBLING_NODE });
  }
};

export const addBelowNode = () => {
  return dispatch => {
    dispatch({ type: types.ADD_BELOW_NODE });
  }
};

export const deleteBelowNode = () => {
  return dispatch => {
    dispatch({ type: types.DELETE_BELOW_NODE });
  }
};

export const deleteNode = node => {
  return dispatch => {
    dispatch({ type: types.DELETE_NODE, node });
  }
};

export const jumpLevel = level => {
  return dispatch => {
    dispatch({ type: types.JUMP_LEVEL, level });
  }
};

export const updateTree = treeData => {
  return dispatch => {
    dispatch({ type: types.CHANGE_TREE, treeData });
  }
};

export const updateNode = node => {
  return dispatch => {
    dispatch({ type: types.UPDATE_DETAILS_NODE, node });
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


