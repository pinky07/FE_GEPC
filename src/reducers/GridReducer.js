import * as types from '../actions/types';

const INITIAL_STATE = {
  gridData: [],
  planAnalysisLens: [],
};

export default ( state = INITIAL_STATE, action ) => {
  switch (action.type) {
    case types.GET_GRID_SUCCESS:
      return { ...state, gridData: action.gridData };
    case types.GET_PLAN_ANALYSIS_SUCCESS:
      return { ...state, planAnalysisLens: action.planAnalysisLens }
    default:
      return state;
  }
}
