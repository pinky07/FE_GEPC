import * as types from '../actions/types';
import TreeService from '../services/treeService';

const INITIAL_STATE = {
  treeData: [],
  treeName: '',
  tree: {
    name: '',
    data: []
  },
  selectedSegment: {},
  selectedClient: {},
  selectedPlan: {},
  selectedNode: undefined,
  selectedBetaGroup: undefined,
  isLoading: false,
};

export default ( state = INITIAL_STATE, action ) => {
  switch (action.type) {
    case types.GET_ALLOCATION_ASSETS_SUCCESS:
      let { treeData, name } = action.tree;
      let { tree } = action;
      tree.data[0].expanded = true;
      //treeData[0].expanded = true;
      return { ...state, treeData, treeName: name, isLoading: false, tree };
    case types.SELECTED_NODE:
      return { ...state, selectedNode: {...action.node, maxDepth: TreeService().getMaxDepthNode(action.node.node)} };
    case types.UPDATE_TREE:
      let tree1 = { ...state.tree, data: action.treeData}
      return { ...state, treeData: action.treeData, tree: tree1 };
    case types.UPDATE_DETAILS_NODE:
      const selectedNode = {...state.selectedNode, node: action.node};
      return { ...state, selectedNode, treeData: TreeService().updateNode(state.treeData, selectedNode) };
    case types.GET_BETA_GROUPS_SUCCESS:
      return { ...state, betaGroups: action.betaGroups, isLoading: false, };
    case types.SELECTED_BETA_GROUP:
      return { ...state, selectedBetaGroup: action.betaGroup };
    case types.ADD_ABOVE_NODE:
      let tree2 = { ...state.tree, data: TreeService().addAboveNode(state) };
      return { ...state, treeData: TreeService().addAboveNode(state), tree: tree2 };
    case types.ADD_SIBLING_NODE:
      return { ...state, treeData: TreeService().addSiblingNode(state) };
    case types.ADD_BELOW_NODE:
      return { ...state, treeData: TreeService().addBelowNode(state) };
    case types.DELETE_BELOW_NODE:
      return { ...state, treeData: TreeService().deleteBelowNode(state) };
    case types.DELETE_NODE:
      return { ...state, treeData: TreeService().deleteNode(state) };
    case types.JUMP_LEVEL:
      return { ...state, treeData: TreeService().jumpLevel(action.level, state) };
    default:
      return state;
  }
}
