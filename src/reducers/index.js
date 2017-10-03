import { combineReducers } from 'redux';
import allocationTree from './TreeReducer';
import allocationGrid from './GridReducer';
import shared from './sharedReducer';

export default combineReducers({
  allocationTree,
  allocationGrid,
  shared
});
