import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from './actions/accountAction';
import swal from 'sweetalert';

export default function Navbar() {
  
  const initialAccount=useSelector(state=>state.accountInfo);
  const[account,setAccount]=useState(initialAccount);

  const navigate=useNavigate();
  const dispatch=useDispatch();

  useEffect(()=>{ 
      setAccount(account);
  },[account])
  
  const handleLogout = (event) => {
    if(account.IsLoggedIn)
    {
      dispatch(logout());
      navigate('/');
      swal("Successfully Logout!")
    }
  }

  const handleLogin = (event) => {
    if(!account.IsLoggedIn)
    {
      navigate('/Login');
    }
  }

  const handleSingup = (event) => {
    if(!account.IsLoggedIn)
    {
      dispatch(logout());
      navigate('/SignUp');
    }
  }

  const handleHome=(event)=>{
    navigate('/');
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
            <ListAltIcon onClick={handleHome}/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Todo
          </Typography>
            {
               !account.IsLoggedIn?
               <>
                  <Button color="inherit" style={{fontFamily:"bold"}} onClick={handleSingup}>SignUp</Button>
                  <Button color="inherit" style={{fontFamily:"bold",marginLeft:"20px"}} onClick={handleLogin}>Login</Button>
               </>
                :
                <Button color="inherit" style={{fontFamily:"bold"}} onClick={handleLogout}>Logout</Button>
            }
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
