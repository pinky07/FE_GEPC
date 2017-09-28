import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configStore from './store/configStore';
import 'bootstrap/dist/css/bootstrap.css';
import App from './app';
import registerServiceWorker from './registerServiceWorker';

const store = configStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
