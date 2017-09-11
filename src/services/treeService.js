import {
  removeNodeAtPath,
  addNodeUnderParent,
  changeNodeAtPath
} from 'react-sortable-tree';

const treeService = () => {

  const _newNode = ({ clientName, planName }) => {
    const DEFAULT_NODE_NAME = 'Node';
    const newNode = {
      clientname: clientName,
      planname: planName,
      accountgrouptype: '',
      accountgroupid: '',
      accountgroupname: DEFAULT_NODE_NAME,
      accountgroupshortname: '',
      accountgroupperformanceenddate: null,
      level: 0,
      id: 0,
      parent_object_id: '',
      as_of: '',
      policy_value: 0,
      aa_model_benchmark: null,
      actual_mv: null,
    };
    newNode.title = () => newNode.accountgroupname;
    return newNode;
  }

  const updateNode = (treeData, selectedNode) => {
    const { path, node } = selectedNode;

    return changeNodeAtPath({
      treeData,
      path,
      getNodeKey: ({ treeIndex }) => treeIndex,
      newNode: node,
    });
  };
  
  const addAboveNode = ({ treeData, selectedNode }) => {
    const { path, node } = selectedNode;

    return changeNodeAtPath({
      treeData,
      path,
      getNodeKey: ({ treeIndex }) => treeIndex,
      newNode: {
        ..._newNode(node),
        children: [node],
        expanded: true
      },
    });
  };

  const addSiblingNode = ({ treeData, selectedNode }) => {
    const { node, path } = selectedNode;

    return addNodeUnderParent({
      treeData,
      parentKey: path[path.length - 2],
      expandParent: true,
      getNodeKey: ({ treeIndex }) => treeIndex,
      newNode: _newNode(node),
    }).treeData;
  };

  const addBelowNode = ({ treeData, selectedNode }) => {
    let { node, path } = selectedNode;

    return addNodeUnderParent({
      treeData,
      parentKey: path[path.length - 1],
      expandParent: true,
      getNodeKey: ({ treeIndex }) => treeIndex,
      newNode: {
        ..._newNode(node),
        parent_object_id: node.accountgroupid,
      },
    }).treeData;
  };

  const deleteBelowNode = ({ treeData, selectedNode }) => {
    let { path, node, treeIndex } = selectedNode;

    if (node.children) {
      let firstChildPath = treeIndex + 1;
      let childrenPath = path.concat([firstChildPath]);
      let tree = Array.from(treeData);

      for (let i = 0, length = node.children.length; i < length; i++) {
        tree = changeNodeAtPath({
          treeData: tree,
          path: childrenPath,
          getNodeKey: ({ treeIndex }) => treeIndex,
          newNode: null,
        });
      }
      return tree;
    }
  };

  const deleteNode = ({ treeData, selectedNode }) => {
    let { path } = selectedNode;
    return removeNodeAtPath({
      treeData,
      path,
      getNodeKey: ({ treeIndex }) => treeIndex
    });
  };

  const _expandNodes = (node, level) => {
    const { children } = node;

    if (children && level > 0) {
      children.forEach( child => {
        const currentLevel = level - 1;
        _expandNodes(child, currentLevel);
        node.expanded = true;
      });
    }
  };

  const jumpLevel = (level, {treeData, selectedNode}) => {
    const { path, node } = selectedNode;
    console.log(path)
    _expandNodes(node, level);
    return changeNodeAtPath({
      treeData,
      path,
      getNodeKey: ({ treeIndex }) => treeIndex,
      newNode: node,
      ignoreCollapsed: false
    });
  };

  const getMaxDepthNode = ({ children }) => {
    let maxDepth = 0;
    if (children) {
      let depth = 0;
      children.forEach( child => {
        depth = getMaxDepthNode(child) + 1;
        maxDepth = depth > maxDepth ? depth : maxDepth;
      });
    }
    return maxDepth;
  };
  
  const isRootNode = node => node && node.treeIndex === 0;

  return {
    addAboveNode,
    addSiblingNode,
    addBelowNode,
    deleteBelowNode,
    deleteNode,
    updateNode,
    jumpLevel,
    getMaxDepthNode,
    isRootNode,
  };
}

export default treeService;
