import betaGroups from '../mockData/betaGroups.json';

const lookupService = () => {

  const getBetaGroups = () => {
    return new Promise((resolve, reject) => {
      resolve(betaGroups);
    });
  };

  return {
    getBetaGroups,
  };
}

export default lookupService;
