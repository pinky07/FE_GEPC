import * as types from '../actions/types';
import TreeService from '../services/treeService';

const INITIAL_STATE = {
  tree: {
    name: '',
    data: []
  },
  selectedSegment: {},
  selectedClient: {},
  selectedPlan: {},
  selectedNode: undefined,
  selectedBetaGroup: undefined,
};

export default ( state = INITIAL_STATE, action ) => {
  switch (action.type) {
    case types.GET_TREE_SUCCESS:
      return { ...state, tree: action.tree };
    case types.SELECTED_NODE:
      return { ...state, selectedNode: { ...action.payload, maxDepth: TreeService().getMaxDepthNode(action.payload.node)} };
    case types.CHANGE_TREE:
      return { ...state, tree:{ ...state.tree, data: action.treeData } };
    case types.UPDATE_DETAILS_NODE:
      const selectedNode = {...state.selectedNode, node: action.node};
      return { ...state, selectedNode, tree:{ ...state.tree, data: TreeService().updateNode(state.tree, selectedNode) } };
    case types.GET_BETA_GROUPS_SUCCESS:
      return { ...state, betaGroups: action.betaGroups, };
    case types.SELECTED_BETA_GROUP:
      return { ...state, selectedBetaGroup: action.betaGroup };
    case types.ADD_ABOVE_NODE:
      return { ...state, tree:{ ...state.tree, data: TreeService().addAboveNode(state) } };
    case types.ADD_SIBLING_NODE:
      return { ...state, tree:{ ...state.tree, data: TreeService().addSiblingNode(state) } };
    case types.ADD_BELOW_NODE:
      return { ...state, tree:{ ...state.tree, data: TreeService().addBelowNode(state) } };
    case types.DELETE_BELOW_NODE:
      return { ...state, tree:{ ...state.tree, data: TreeService().deleteBelowNode(state) } };
    case types.DELETE_NODE:
      return { ...state, tree:{ ...state.tree, data: TreeService().deleteNode(state) }, selectedNode: undefined };
    case types.JUMP_LEVEL:
      return { ...state, tree:{ ...state.tree, data: TreeService().jumpLevel(action.level, state) } };
    case types.TOGGLE_NODE_AT_PATH:
      return { ...state, tree:{ ...state.tree, data: TreeService().toggleNodeAtPath(state.tree, action) } };
    default:
      return state;
  }
}
