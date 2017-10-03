import assetAllocationService from '../services/assetAllocationService';
import {
  getTreeFromFlatData,
  getFlatDataFromTree
} from 'react-sortable-tree';
import _ from 'lodash';

const assetsAllocationModel = () => {

  /**
   * Calls the asset allocation service to get the list of assets allocation
   */
  const get = () => {
    return assetAllocationService().getAllocations().then( assetAllocations => {
      this._assetsAllocation = assetAllocations;
      this._assetsAllocation.hasGrid = _.filter(assetAllocations.elements, element => element.showOnGrid ).length > 0;
      return assetAllocations;
    });
  };

  /**
   * Gets a flat list of assets allocations and returns it in a tree structure
   */
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
  
  /**
   * Returns a promise with the name of the assets allocations and the tree structure
   */
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

  /**
   * Gets a tree structure of assets allocations and returns a flat list for the grid
   */
  const getGrid = treeData => {
    return new Promise((resolve, reject) => {
      let gridData = [];
      if (treeData && treeData.length) {
        const getNodeKey = ({ treeIndex }) => treeIndex;
        const flatData = getFlatDataFromTree({treeData, getNodeKey, ignoreCollapsed: false});
        gridData =  _.map(flatData, item => {
          item.node.assetCategory = 'Equity';
          return item.node;
        });
      }
      const data = gridData.filter( (item, index) => { return item.showOnGrid && index !== 0 });
      resolve(data);
    });
  };

  /**
   * Get the assets allocations and calls the service for saving it
   */
  const save = assetsAllocation => {
    return assetAllocationService().saveAllocations(assetsAllocation).then(() => {
      //console.log(treeData);
    });
  };

  return {
    getTree,
    getGrid,
    get,
    save,
  };
}

export default assetsAllocationModel;