import React from "react";
import {useEffect,Suspense } from "react";
import { CircularProgress } from "@material-ui/core";
import {useSelector } from 'react-redux';
import {fetchAllTodo} from './index';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Navbar from './Navbar';
import Start from "./Start";

const HomePage=React.lazy(()=>import("./HomePage"))
const EditTodo=React.lazy(()=>import('./components/EditTodo'));
const NewTodo=React.lazy(()=>import('./NewTodo'))
const Singup=React.lazy(()=>import('./components/Signup'));
const Login=React.lazy(()=>import('./components/Login'));

const styles={
    progressBarStyle:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        minHeight:'100vh'
    }
}

const App = () =>{
    const loading_todo=useSelector(state=>state.allTodo.loading);
    const Loading=()=>{
        return(
            <div style={styles.progressBarStyle}>
                {loading_todo? <CircularProgress/>:<></>}
            </div>
        )
    }
     
    useEffect(() => {  
        fetchAllTodo();
      }, []);

    return (
        <>
            <Suspense fallback={Loading()}>
                <Router>
                    {!loading_todo?<Navbar/>:<></>}
                    <Routes>
                        <Route exact path={"/"} element={<Start/>}/>
                        <Route exact path={"/SignUp"} element={<Singup/>}/>
                        <Route exact path={"/Login"} element={<Login/>}/>
                        <Route exact path={"/home"} element={<HomePage/>}/>
                        <Route exact path={"/edit"} element={<EditTodo/>}/>
                        <Route exact path={"/add"} element={<NewTodo/>}/>
                    </Routes>
                </Router>
            </Suspense>
        </>
    );
}

export default  App;