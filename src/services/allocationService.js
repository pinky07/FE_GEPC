import axiosConfig from './axios.config';
import axios from 'axios';
import plans from '../mockData/plans.json';
import clients from '../mockData/clients.json';
import allocations from '../mockData/allocations.json';
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
    //return axios.get(`http://localhost:3000/${constants.API}/allocations/${segmentId}/${clientId}/${planId}`);
    return new Promise((resolve, reject) => {
      resolve(allocations);
    });
  };

  const saveAllocations = (treeData) => {
    return new Promise((resolve, reject) => {
      resolve(treeData);
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
