import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {createStore,applyMiddleware,compose} from 'redux';
import {Provider} from 'react-redux';
import allReducer from './reducers';
import thunk from 'redux-thunk';
import axios from "axios";
import { fetchTodoBegin,fetchTodoSuccess,fetchTodoFailure} from './actions/getAllTodo';

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
  
const AllTodo=()=>{
    return function(dispatch){
        dispatch(fetchTodoBegin())
        axios
        .get("http://127.0.0.1:8000/todos/list")
        .then((res) => {
            const allTodo=res.data;
            dispatch(fetchTodoSuccess(allTodo));
        })
        .catch((err) => {
            dispatch(fetchTodoFailure(err));
        });
    }
    
}
const myStore=createStore(allReducer,peristedState,compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

myStore.subscribe(() => {
    saveState(myStore.getState());
  });

export const fetchAllTodo=()=>{
    return(
        myStore.dispatch(AllTodo())
    )
}
ReactDOM.render(
    <Provider store={myStore}>
        <App />
    </Provider>
    ,document.getElementById('root'));