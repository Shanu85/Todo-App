export const POST_TODO_BEGIN   = 'POST_TODO_BEGIN';
export const POST_TODO_SUCCESS = 'POST_TODO_SUCCESS';
export const POST_TODO_FAILURE = 'POST_TODO_FAILURE';

export const postTodoBegin=()=>({
    type:POST_TODO_BEGIN,
})

export const postTodoSuccess=()=>({
    type:POST_TODO_SUCCESS,
})

export const postTodoFailure=(error)=>({
    type:POST_TODO_FAILURE,
    payload:error
})