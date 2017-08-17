import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers';

export default function configStore() {
  return createStore(reducers, {}, applyMiddleware(reduxThunk));
}