import React from "react";
import { Grid,Checkbox, Typography,Box } from "@material-ui/core";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@material-ui/core";
import axios from "axios";
import { deleteTodoBegin,deleteTodoSuccess,deleteTodoFailure } from "../actions/deleteTodo";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router';
import { fetchInfoId } from "./GetInfo";

const ShowAllTodo=({data,user})=>{
  const dispatch=useDispatch();
    const { _id, name, done,date,__v } = data;
    const user_id=user._id;

    const [deleteOpen, setdeleteOpen] = React.useState(false);
    const navigate=useNavigate();

    const handleDeleteOpen = () => {
        setdeleteOpen(true);
      };
    
      const handleDeleteClose = () => {
        setdeleteOpen(false);
      };

      const DeleteTodo=()=>{
          dispatch(deleteTodoBegin(_id));
          axios
          .delete(`http://127.0.0.1:8000/users/userTodo/${user_id}/${_id}`)
          .then(()=>{
            dispatch(deleteTodoSuccess());
            fetchInfoId(user_id,dispatch);
          })
          .catch((err)=>{
            dispatch(deleteTodoFailure(err))
          })
          handleDeleteClose();
      }
    const editTodo=(event)=>{
        navigate('/edit',{state:data})
    };

    const handleTodoDone=(event)=>{
      dispatch(deleteTodoBegin(_id));
      axios.
      delete(`http://127.0.0.1:8000/userTodo/done/${user_id}/${_id}`)
      .then(()=>{
        dispatch(deleteTodoSuccess())
        fetchInfoId(user_id,dispatch);
      })
      .catch((err)=>{
        dispatch(deleteTodoFailure(err))
      })
    }

    const DeleteDialog=()=>{
        return(
            <Dialog
            open={deleteOpen}
            onClose={handleDeleteClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" style={{color:'red'}}>
              {`Alert!`}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                This will delete {name} TODO and you will not be able to recover it. Are you sure ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteClose} style={{color:'green',fontFamily:'bold'}}>No</Button>
              <Button onClick={DeleteTodo} autoFocus style={{color:'red',fontFamily:'bold'}}>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        );
    }

    return(
        <Box sx={{ flexGrow: 1 }} >
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    {done!==true?<Checkbox style={{color:'green'}} onClick={handleTodoDone}/>:<></>}
                        
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6">{name}</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6">{date}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <EditIcon style={{marginRight:'20px',color:'blue',cursor:'pointer'}} onClick={editTodo}/>
                    <DeleteIcon style={{color:'red',cursor:'pointer'}} onClick={handleDeleteOpen}/>
                    <DeleteDialog/>
                </Grid>
             </Grid>
        </Box>
        
    )
}

export default ShowAllTodo;