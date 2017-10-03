import { getFlatDataFromTree } from 'react-sortable-tree/';
import _ from 'lodash';

const gridModel = () => {

  const getData = (treeData) => {
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
      resolve(gridData.filter( (item, index) => { return item.showOnGrid || index === 0 }));
    });
  }

  return {
    getData,
  };
}

export default gridModel;