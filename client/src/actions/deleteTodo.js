export const DELETE_TODO_BEGIN   = 'DELETE_TODO_BEGIN';
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS';
export const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE';

export const deleteTodoBegin=()=>({
    type:DELETE_TODO_BEGIN,
})

export const deleteTodoSuccess=()=>({
    type:DELETE_TODO_SUCCESS
})

export const deleteTodoFailure=(error)=>({
    type:DELETE_TODO_FAILURE,
    payload:error
})

