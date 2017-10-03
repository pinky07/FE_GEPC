import * as types from '../actions/types';

// TODO This data should be loaded from an endpoint
const INITIAL_STATE = {
  segment: 'Segment 1',
  client: 'Bose',
  plan: 'Bose Corporation Employees’ Retirement Plan'
};

/**
 * Handles SpotFire actions
 */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_SPOTFIRE:
      // TODO Write some logic to receive SpotFire data
      break;
    default:
      return state;
  }
}
