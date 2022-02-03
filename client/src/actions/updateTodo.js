export const UPDATE_TODO_BEGIN   = 'UPDATE_TODO_BEGIN';
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS';
export const UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE';

export const updateTodoBegin=()=>({
    type:UPDATE_TODO_BEGIN
})

export const updateTodoSuccess=()=>({
    type:UPDATE_TODO_SUCCESS
})

export const updateTodoFailure=(error)=>({
    type:UPDATE_TODO_FAILURE,
    payload:error
})

