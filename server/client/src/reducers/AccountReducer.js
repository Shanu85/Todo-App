import { LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGOUT} from "../actions/accountAction";

const initialState={
    IsLoggedIn:false,
    user:null,
    error:''
}

const AccountReducer=(state=initialState,action)=>{
    switch(action.type){
        case LOGIN_SUCCESS:
            return{
                ...state,
                IsLoggedIn:true,
                user:action.payload
            }
        case LOGOUT:
            return{
                ...state,
                IsLoggedIn:false,
                user:null
            }
        case REGISTER_SUCCESS:
            return{
                ...state,
                IsLoggedIn:false
            }
        case LOGIN_FAILURE || REGISTER_FAILURE:
            return{
                ...state,
                IsLoggedIn:false,
                error:action.payload
            }
        default:
            return state;
    }
}

export default AccountReducer;