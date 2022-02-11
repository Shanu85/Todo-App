import React from "react";
import {Grid} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch } from "react-redux";
import { postTodoBegin, postTodoSuccess,postTodoFailure} from "./actions/postTodo";
import { useState } from "react";
import { useSelector } from "react-redux";
import { fetchInfoId } from "./components/GetInfo";
import swal from 'sweetalert';

import './todolist.css'
const styles={
    items_style:{
        backgroundColor:'#f0f0f0',
        padding:'20px',
        margin:'10px'
    }
}

const NewTodo=()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const account=useSelector(state=>state.accountInfo);
    const userId=account.user._id;

    const [todo_name,set_todoName]=useState("")
    const [todo_date,set_todoDate]=useState(new Date())

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
        dispatch(postTodoBegin());
    
        event.preventDefault(); // this will prevent default action of form i.e. it clears data after submit, hence it prevents form clearing data so that we can access it latter
        const data={};

        data["name"]=todo_name;
        data["date"]=todo_date.toString().substring(0,10);
       
        axios.
            post(`http://127.0.0.1:8000/users/userTodo/${userId}`,data)
            .then(()=>{
                dispatch(postTodoSuccess());
                fetchInfoId(userId,dispatch);
                swal("New Todo Added !")
            })
            .catch((err)=>{
                dispatch(postTodoFailure(err));
              })
        event.target.reset();
        
        navigate('/home')
      }

    return( 
        <>
            <Grid container  direction="column" >
                    <Grid container style={{margin:'20px'}}  />
                        
                    <Grid container spacing={3} align="center" justify="center" sx={{mx:'auto'}} >
                        <Grid item xs={7}  style={styles.items_style}>
                        <div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label for="todonameInput" className="todo-label">Todo Name</label> <br/>
                                        
                                        <input type="text" name="name"  id="nameInput" placeholder="Name" className="todo-input" value={todo_name} onChange={handleNameChange} required/>
                                    </div>

                                    <div className="form-group" style={{marginTop:'10px'}}>
                                        <label for="dateinput" className="todo-label">Todo Date</label> <br/>
                                        
                                        <input name="date" type="date"  id="dateinput"  className="todo-input" value={todo_date} onChange={handleDateChange} required/> <br/>
                                        
                                    </div>
                                    <input type="submit" value="Add" className="btn btn-primary" className="todo-submit-button" />
                                </form>
                        </div>
                    </Grid>
                    </Grid>
            </Grid>
        </>
    )
}

export default NewTodo;