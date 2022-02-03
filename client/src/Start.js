import React from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const theme = createTheme();

export default function Start(){
    const account=useSelector(state=>state.accountInfo);
    const navigate=useNavigate();

    const handleDirect=()=>{
        if(account.IsLoggedIn)
        {
            navigate('/home');
        }
        else{
            navigate('/SignUp');
        }
    }
    return(
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
                <Button type="submit" fullWidth variant="contained"sx={{ mt: 3, mb: 2 }} onClick={handleDirect}>
                    My Todo
                </Button>
            </Box>
            
            </Container>
        </ThemeProvider>
    )
}
