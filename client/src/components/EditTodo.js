import React from 'react';
import {Grid} from '@material-ui/core';
import { useState } from 'react';
import { useNavigate,useLocation } from 'react-router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateTodoBegin,updateTodoSuccess,updateTodoFailure} from '../actions/updateTodo';
import { useSelector } from 'react-redux';
import { fetchInfoId } from './GetInfo';
import swal from 'sweetalert';

import '../todolist.css'

const styles={
    items_style:{
        backgroundColor:'#f0f0f0',
        padding:'20px',
        margin:'10px'
    }
}

const EditTodo=()=>{
    const {state}=useLocation();
    const { _id, name, done,date,__v } = state;
    const account=useSelector(state=>state.accountInfo);
    const userId=account.user._id;

    const [todo_name,set_todoName]=useState(name)
    const [todo_date,set_todoDate]=useState(date)
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleNameChange=(e)=>{
        set_todoName(e.target.value)
    }

    const handleDateChange=(e)=>{
        if(new Date(e.target.value).getTime() < new Date().getTime())
        {
            alert("The Date must be Bigger or Equal to today date");
        }
        else
        {
            set_todoDate(e.target.value)
        }  
    }
    

    const handleSubmit = (event) => {
        event.preventDefault();

        const data={};
        data["name"]=todo_name;
        data["date"]=todo_date.toString().substring(0,10);
        
        dispatch(updateTodoBegin());
        
        axios.
        patch(`http://127.0.0.1:8000/users/userTodo/${userId}/${_id}`,data)
        .then(()=>{
            dispatch(updateTodoSuccess())
            fetchInfoId(userId,dispatch);
        })
        .catch((error)=>{
            dispatch(updateTodoFailure(error));
        })

        event.target.reset();
        
        swal("Edit Successful!")
        navigate('/home')
      }

    return(
        <>
             <Grid container  direction="column" >
                <Grid container style={{margin:'20px'}}  />
                    
                <Grid container spacing={3} align="center" justify="center" sx={{mx:'auto'}} >
                    <Grid item xs={7}  style={styles.items_style}>
                           <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label for="todonameInput" className="todo-label">Todo Name</label> <br/>
                                    
                                    <input type="text" name="name"  id="nameInput" value={todo_name} className="todo-input" required onChange={handleNameChange} />
                                </div>

                                <div className="form-group" style={{marginTop:'10px'}}>
                                    <label for="dateinput" className="todo-label">Todo Date</label> <br/>
                                    
                                    <input name="date" type="date"  id="dateinput" value={todo_date}  className="todo-input" required onChange={handleDateChange}/> <br/>
                                    
                                </div>
                                <input type="submit" value="Add" className="btn btn-primary" className="todo-submit-button" />
                            </form>  
                   </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default EditTodo;