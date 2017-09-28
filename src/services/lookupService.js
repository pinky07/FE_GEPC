import betaGroups from '../data/betaGroups.json';
import planAnalysisLens from '../data/planAnalysisLens.json';

const lookupService = () => {

  const getBetaGroups = () => {
    return new Promise((resolve, reject) => {
      resolve(betaGroups);
    });
  };
  
  const getPlanAnalysisLens = () => {
    return new Promise((resolve, reject) => {
      resolve(planAnalysisLens);
    });
  }

  return {
    getBetaGroups,
    getPlanAnalysisLens,
  };
}

export default lookupService;
