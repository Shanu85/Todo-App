import axios from 'axios';
import { loginSuccess, loginFailure} from '../actions/accountAction';
import {fetchTodoSuccess,fetchTodoBegin,fetchTodoFailure} from '../actions/getAllTodo';

export const fetchInfoData=(user_data,dispatch)=>{
    dispatch(fetchTodoBegin());

    axios.post("http://127.0.0.1:8000/users/getUser",user_data)
    .then((res)=>{
      dispatch(loginSuccess(res.data));
      dispatch(fetchTodoSuccess(res.data.AllTodo));
    })
    .catch((err)=>{
      dispatch(loginFailure(err));
      dispatch(fetchTodoFailure(err));
      
      alert(err.response.data.message);
    })
} 

export const fetchInfoId=(id,dispatch)=>{
    dispatch(fetchTodoBegin());
    axios.get(`http://127.0.0.1:8000/users/${id}`)
    .then((res)=>{
        dispatch(loginSuccess(res.data));
        dispatch(fetchTodoSuccess(res.data.AllTodo));
    })
    .catch((err)=>{
        dispatch(loginFailure(err));
        dispatch(fetchTodoFailure(err));
        
        alert(err.response.data.message);
      })
}