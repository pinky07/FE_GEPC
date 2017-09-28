import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger'
import reduxThunk from 'redux-thunk';

import reducers from '../reducers';

export default function configStore() {
  return createStore(reducers, {}, composeWithDevTools(
    applyMiddleware(
      logger,
      reduxThunk,
    )
  ));
}