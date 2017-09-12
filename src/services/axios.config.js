import axios from 'axios';
import { showLoading, hideLoading } from '../actions';

axios.interceptors.request.use( config => {
  showLoading(); console.log('loading')
  return config;
},  error => {
  hideLoading(); console.log('no loading')
  return Promise.reject(error);
});

axios.interceptors.response.use( response => {
  hideLoading();console.log('no loading')
  return response;
},  error => {
  hideLoading(); console.log('no loading')
  return Promise.reject(error);
});