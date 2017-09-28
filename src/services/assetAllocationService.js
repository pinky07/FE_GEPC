import axios from 'axios';
import plans from '../data/plans.json';
import clients from '../data/clients.json';
import allocations from '../data/allocations.json';
import Constants from './constants';

const allocationService = () => {
  const getClients = () => {
    return new Promise((resolve, reject) => {
      resolve(clients);
    });
  };

  const getPlans = () => {
    return new Promise((resolve, reject) => {
      resolve(plans);
    });
  };

  const getSegments = () => {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  };

  const getAllocations = () => {
    //return axios.get(`http://localhost:3000/${Constants.API}/allocations`);
    return new Promise((resolve, reject) => {
      resolve(allocations);
    });
  };

  const saveAllocations = (tree) => {
    return new Promise((resolve, reject) => {
      resolve(tree);
    });
  };

  return {
    getAllocations,
    getSegments,
    getPlans,
    getClients,
    saveAllocations
  };
}

export default allocationService;
