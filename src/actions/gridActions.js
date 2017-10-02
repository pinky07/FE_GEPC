import * as types from './types';
import lookupService from '../services/lookupService';
import assetsAllocationModel from '../model/assetsAllocationModel';

export const getAllocationGrid = () => {
  return (dispatch, getState) => {
    const tree = getState().allocationTree.tree;
    return assetsAllocationModel().getGrid(tree.data).then( gridData => {
      if (gridData) {
        dispatch({ type: types.GET_GRID_SUCCESS, gridData });
      }
    });
  };
};

export const getPlanAnalysisLens = () => {
  return dispatch => {
    return lookupService().getPlanAnalysisLens().then( planAnalysisLens => {
      if (planAnalysisLens) {
        dispatch({ type: types.GET_PLAN_ANALYSIS_SUCCESS, planAnalysisLens });
      }
    });
  };
};

export const selectPlanAnalysis = plan => {
  return dispatch => {
    dispatch({ type: types.SELECTED_PLAN_ANALYSIS, plan });
  }
};

