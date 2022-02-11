export const LOGIN_SUCCESS="LOGIN_SUCCESS";
export const LOGIN_FAILURE="LOGIN_FAILURE";

export const LOGOUT="LOGOUT";

export const REGISTER_SUCCESS="REGISTER_SUCCESS";
export const REGISTER_FAILURE="REGISTER_FAILURE";

export const loginSuccess=(user)=>(
    {
        type:LOGIN_SUCCESS,
        payload:user
    }
)

export const loginFailure=(error)=>(
    {
        type:LOGIN_FAILURE,
        payload:error
    }
)

export const registerFailure=(error)=>(
    {
        type:REGISTER_FAILURE,
        payload:error
    }
)

export const registerSuccess=()=>(
    {
        type:REGISTER_SUCCESS
    }
)
export const logout=()=>(
    {
        type:LOGOUT
    }
)


