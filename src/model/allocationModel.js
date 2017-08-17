import allocationService from '../services/allocationService';
import { getTreeFromFlatData } from 'react-sortable-tree/'
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
      let list = _.forEach( allocations, item => {
        item.title = item.accountgroupname;
        return item;
      });
      return _getTree(list);
    });
  };

  const getAllocationGrid = (allocationTree) => {
      return new Promise((resolve, reject) => {
        let gridData = [];
        if (allocationTree && allocationTree.length) {
          gridData =  allocationTree.slice();
          setPolicyTotal(gridData[0].children, gridData[0]);
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