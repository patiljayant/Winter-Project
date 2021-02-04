import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
import throttle from 'lodash/throttle'
import rootReducer from './reducers/rootReducer';
import {loadState, saveState} from './reducers/localStorage';

const persistedState = loadState();

const store = createStore(rootReducer, persistedState);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}><App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
