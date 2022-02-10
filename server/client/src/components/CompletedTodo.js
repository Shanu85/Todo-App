import React from "react";
import axios from "axios";
import { fetchInfoId } from "./GetInfo";
import { useDispatch } from "react-redux";
import { Box,Typography,Grid } from "@material-ui/core";
import { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog,DialogContent,DialogContentText,Button,DialogTitle } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";

const CompletedTodo=({data,user})=>{
    const { _id, name, done,date,__v } = data;
    const user_id=user._id;
    const [deleteOpen, setdeleteOpen] =useState(false);
    const dispatch=useDispatch();

    const handleDeleteOpen = () => {
        setdeleteOpen(true);
      };
    
      const handleDeleteClose = () => {
        setdeleteOpen(false);
      };

    const DeleteTodo=()=>{
        axios
        .delete(`http://127.0.0.1:8000/userTodo/complete/${user_id}/${_id}`)
        .then(()=>{
            fetchInfoId(user_id,dispatch);
        })
        .catch((err)=>{
            console.log(err);
        })
        handleDeleteClose();
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
        <>
            <Box  sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Checkbox style={{color:'green'}} disabled checked/>
                    </Grid>
                       
                    <Grid item xs={4}>
                        <Typography variant="h6" style={{textDecoration:'line-through'}}>{name}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h6" style={{textDecoration:'line-through'}}>{date}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        
                        <DeleteIcon style={{color:'red',cursor:'pointer'}} onClick={handleDeleteOpen}/>
                        <DeleteDialog/>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default CompletedTodo;