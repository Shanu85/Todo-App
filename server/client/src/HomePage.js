import React from "react";
import { Grid, Typography } from "@material-ui/core";
import ShowAllTodo from './components/ShowAllTodo';
import {useSelector } from 'react-redux';
import { Button } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import CompletedTodo from "./components/CompletedTodo";

const styles={
    items_style:{
        backgroundColor:'#f0f0f0',
        padding:'20px',
        margin:'10px'
    }
}

const HomePage=()=>{
    const account=useSelector(state=>state.accountInfo);
    const navigate=useNavigate();
    
    const notFound=()=>{
        navigate('/Login');
    }

    return(
        <>
            {!account.IsLoggedIn?notFound():
                <Grid container  direction="column" >
                    <Grid container style={{margin:'30px'}} align="center" justify="center">
                        <Grid item xs={5}></Grid>
                        <Grid item xs={7}>
                        <Button style={{color:"white",backgroundColor:'green'}} onClick={()=>{navigate('/add')}}>Add</Button>
                        </Grid>
                    </Grid>
                                
                    <Grid container spacing={3} 
                        align="center"
                        justify="center"
                        sx={{mx:'auto'}} >
                            
                            <Grid item xs={7}  style={styles.items_style}>
                                    
                                    {account.user.AllTodo.length===0?<Typography variant='h6'>No Data Found</Typography>
                                    :(account.user.AllTodo.map(todo=>(<ShowAllTodo key={todo._id} data={todo} user={account.user}/>)))
                                    }
                            </Grid>
                            <Grid item xs={12} >
                                <Typography variant="h6" style={{marginTop:"20px"}}>Completed Tasks</Typography>
                            </Grid>
                            <Grid item xs={7}  style={styles.items_style}>
                                    {
                                        account.user.CompletedTodo.length==0?<Typography variant='h6'>No Data Found</Typography>:
                                        (account.user.CompletedTodo.map(todo=>(<CompletedTodo key={todo._id} data={todo} user={account.user}/>)))
                                    }
                            </Grid>
                    </Grid>
                </Grid>
            }
        </>
    )
}

export default HomePage;

