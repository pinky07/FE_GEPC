import { combineReducers } from 'redux';
import allocationTree from './TreeReducer';
import allocationGrid from './GridReducer';

export default combineReducers({
  allocationTree,
  allocationGrid
});
