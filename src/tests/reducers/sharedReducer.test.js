import sharedReducer from '../../reducers/sharedReducer';
import { 
  sharedReducerDefaultState,
  assetsAllocation,
} from '../fixtures/shared';
import * as types from '../../actions/types';

describe('the shared reducer', () => {
  it('should set a default state', () => {
    const state = sharedReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(sharedReducerDefaultState);
  });

  it('should set the state assetsAllocation', () => {
    const action = {
      type: types.GET_ASSETS_ALLOCATION_SUCCESS,
      assetsAllocation
    };
    const state = sharedReducer(undefined, action);
    expect(state.assetsAllocation).toEqual(assetsAllocation);
  });
});