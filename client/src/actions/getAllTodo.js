export const FETCH_TODO_BEGIN   = 'FETCH_TODO_BEGIN';
export const FETCH_TODO_SUCCESS = 'FETCH_TODO_SUCCESS';
export const FETCH_TODO_FAILURE = 'FETCH_TODO_FAILURE';

export const fetchTodoBegin=()=>({
    type:FETCH_TODO_BEGIN
})

export const fetchTodoSuccess=(allTodo)=>({
    type:FETCH_TODO_SUCCESS,
    payload:allTodo
})

export const fetchTodoFailure=(error)=>({
    type:FETCH_TODO_FAILURE,
    payload:error
})