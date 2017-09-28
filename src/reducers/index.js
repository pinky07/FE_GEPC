import { combineReducers } from 'redux';
import allocationTree from './TreeReducer';
import allocationGrid from './GridReducer';
import shared from './sharedReducer';
import spotFire from './spotFireReducer'

export default combineReducers({
  allocationTree,
  allocationGrid,
  shared,
  spotFire,
});
