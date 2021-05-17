import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react'

import * as serviceWorker from './serviceWorker';

import {BrowserRouter} from 'react-router-dom'

import { Provider } from 'react-redux'

import {store, persistor } from './redux/store'
  
import './index.css';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
      <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
