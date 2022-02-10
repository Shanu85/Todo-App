import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {createStore,applyMiddleware,compose} from 'redux';
import {Provider} from 'react-redux';
import allReducer from './reducers';
import thunk from 'redux-thunk';

const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if(serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  };
  
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (e) {
      // Ignore write errors;
    }
  };
  
  const peristedState = loadState();
  

const myStore=createStore(allReducer,peristedState,compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

myStore.subscribe(() => {
    saveState(myStore.getState());
  });


ReactDOM.render(
    <Provider store={myStore}>
        <App />
    </Provider>
    ,document.getElementById('root'));