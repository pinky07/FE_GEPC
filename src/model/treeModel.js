import assetAllocationService from '../services/assetAllocationService';
import { getTreeFromFlatData } from 'react-sortable-tree';
import _ from 'lodash';

const treeModel = () => {

  const _getTree = allocations => {
    const argDefaults = {
      rootKey: allocations[0].parent_object_id,
      getKey: node => node.accountgroupid,
      getParentKey: node => node.parent_object_id
    };
    return getTreeFromFlatData({...argDefaults, flatData: allocations});
  };
  
  const getTree = () => {
    return assetAllocationService().getAllocations().then( allocations => {
      let list = _.forEach( allocations.elements, item => {
        item.title = item.accountgroupname;
        return item;
      });

      return {
        name: allocations.name,
        data: _getTree(list),
      };
    });
  };

  const saveTree = treeData => {
    return assetAllocationService().saveAllocations(treeData).then(() => {
     //console.log(treeData);
    });
  }

  return {
    getTree,
    saveTree,
  };
}

export default treeModel;