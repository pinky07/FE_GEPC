import { allocationTree } from '../../tests/fixtures/tree';

const treeModel = () => {

  const getTree = () => {
    return new Promise((resolve, reject) => {
      resolve(allocationTree);
    });
  };

  const saveTree = tree => {
    return new Promise((resolve, reject) => {
      resolve(allocationTree);
    });
  };

  return {
    getTree,
    saveTree,
  };
};

export default treeModel;