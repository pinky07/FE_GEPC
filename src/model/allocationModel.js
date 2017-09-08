import allocationService from '../services/allocationService';
import {
  getTreeFromFlatData,
  getFlatDataFromTree
} from 'react-sortable-tree/';
import _ from 'lodash';

const allocationModel = () => {

  const _getTree = allocations => {
    const argDefaults = {
      rootKey: allocations[0].parent_object_id,
      getKey: node => node.accountgroupid,
      getParentKey: node => node.parent_object_id
    };
    return getTreeFromFlatData({...argDefaults, flatData: allocations});
  };
  
  const getAllocationTree = () => {
    return allocationService().getAllocations().then( allocations => {
      let list = _.forEach( allocations.elements, item => {
        item.title = item.accountgroupname; //function () { return item.accountgroupname; };
        return item;
      });

      return {
        name: allocations.name,
        data: _getTree(list),
        treeData: _getTree(list)
      };
    });
  };

  const getAllocationGrid = (treeData) => {
      return new Promise((resolve, reject) => {
        let gridData = [];
        if (treeData && treeData.length) {
          const getNodeKey = ({ treeIndex }) => treeIndex;
          const flatData = getFlatDataFromTree({treeData, getNodeKey, ignoreCollapsed: false});
          gridData =  _.map(flatData, item => {
            item.node.assetCat = 'Equity';
            return item.node;
          });
        }
        resolve(gridData);
      });
  }

  const setPolicyTotal = (nodes, parent) => {
    _.forEach( nodes, node => {
      if (node.children) {
        setPolicyTotal(node.children, node);
      } else {
        if (!parent.policyTotal && node.parent_object_id === parent.accountgroupid) {
          parent.policyTotal = parent.policy_value;
          /* parent.policyTotal = parent.children.reduce((total, child) => {
           return child.policy_value ? total + child.policy_value : total;
           }, 0);*/
        }
      }
    });
  }

  const saveAllocationTree = treeData => {
    return allocationService().saveAllocations(treeData).then(() => {
      console.log(treeData);
    });
  }

  return {
    getAllocationTree,
    saveAllocationTree,
    getAllocationGrid,
  };
}

export default allocationModel;