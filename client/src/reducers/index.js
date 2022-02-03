import { combineReducers } from "redux";
import getAllTodoReducer from "./getAllTodoReducer";
import AccountReducer from './AccountReducer';

const allReducer=combineReducers({
    allTodo:getAllTodoReducer,
    accountInfo:AccountReducer
});

export default allReducer;
