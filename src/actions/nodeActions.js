import * as types from './types';

export const selectNode = rowInfo => {
  const { treeIndex, path } = rowInfo;
  const node = {
    node: rowInfo.node,
    treeIndex,
    path,
  };
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

export const updateDetailsNode = node => {
  return dispatch => {
    dispatch({ type: types.UPDATE_DETAILS_NODE, node });
  }
};
