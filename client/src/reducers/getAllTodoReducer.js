import {FETCH_TODO_BEGIN,
    FETCH_TODO_SUCCESS,
    FETCH_TODO_FAILURE} 
from '../actions/getAllTodo';

import { DELETE_TODO_BEGIN,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAILURE } from '../actions/deleteTodo';


import { POST_TODO_BEGIN, 
    POST_TODO_SUCCESS,
    POST_TODO_FAILURE} from '../actions/postTodo';

import { UPDATE_TODO_BEGIN,
    UPDATE_TODO_SUCCESS,
    UPDATE_TODO_FAILURE} from '../actions/updateTodo';

const initialState={
    ALL_TODO:[],
    loading:false,
    error:''
}

const getAllTodoReducer=(state=initialState,action)=>{
    switch(action.type){
        case FETCH_TODO_BEGIN || DELETE_TODO_BEGIN || POST_TODO_BEGIN || UPDATE_TODO_BEGIN:
            return {
                ...state,
                loading:true
            };
        case FETCH_TODO_SUCCESS:
            return{
                ...state,
                loading:false,
                ALL_TODO:action.payload
            };
        case FETCH_TODO_FAILURE || DELETE_TODO_FAILURE || POST_TODO_FAILURE || UPDATE_TODO_FAILURE:
            return {
                ...state,
                loading:false,
                error:action.payload
            };
        case DELETE_TODO_SUCCESS || POST_TODO_SUCCESS || UPDATE_TODO_SUCCESS:
            return{
                ...state,
                loading:false
            }
        default:
            return state;
    }
}

export default getAllTodoReducer;