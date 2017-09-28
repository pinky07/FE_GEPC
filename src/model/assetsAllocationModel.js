import assetAllocationService from '../services/assetAllocationService';
import {
  getTreeFromFlatData,
  getFlatDataFromTree
} from 'react-sortable-tree';
import _ from 'lodash';

const assetsAllocationModel = () => {

  let _assetsAllocation = {};

  const get = () => {
    return assetAllocationService().getAllocations().then( assetAllocations => {
      this._assetsAllocation = assetAllocations;
      return assetAllocations;
    });
  };

  const _getTree = assetsAllocation => {
    if (assetsAllocation.length > 0) {
      const argDefaults = {
        rootKey: assetsAllocation[0].parent_object_id,
        getKey: node => node.accountgroupid,
        getParentKey: node => node.parent_object_id
      };
      assetsAllocation[0].expanded = true;
      return getTreeFromFlatData({...argDefaults, flatData: assetsAllocation});
    }
    return [];
  };

  const getTree = () => {
    return new Promise((resolve, reject) => {
      const assetsAllocation = _.forEach( this._assetsAllocation.elements, item => {
        item.title = item.accountgroupname;
        return item;
      });
      resolve({
        name: this._assetsAllocation.name,
        data: _getTree(assetsAllocation),
      });
    });
  };

  const getGrid = treeData => {
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
      resolve(gridData.filter( (item, index) => { return item.showOnGrid && index !== 0 }));
    });
  };
  
  return {
    getTree,
    getGrid,
    get,
  };
}

export default assetsAllocationModel;