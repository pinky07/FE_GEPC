import { tree } from '../../tests/fixtures/fixtures';

const treeModel = () => {

  const getTree = () => {
    return new Promise((resolve, reject) => {
      resolve(tree);
    });
  };

  const saveTree = tree => {
    return new Promise((resolve, reject) => {
      resolve(tree);
    });
  };

  return {
    getTree,
    saveTree,
  };
};

export default treeModel;