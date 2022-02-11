import 'dotenv/config';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// import the router from Routes
import userRouter from './routes/Users.js'
import cors from 'cors';
import UserTodoRouter from './routes/UserTodo.js'

const app = express();

app.use(cors())

async function connect()
{
    const connection_url=process.env.DB_CONNECTION_URL;
    //  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
    
    const PORT =process.env.PORT || 8000;
    
    mongoose.connect(connection_url,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=>console.log(`Server is running on port: ${PORT}`)))
    .catch((error)=>console.log(error.message));

}

connect().catch(console.error);

app.use(bodyParser.urlencoded({limit:"30mb",extended: true}));
app.use(bodyParser.json({limit:"30mb",extended: true}));
app.use('/users',userRouter);  // Mount the todoRouter as middleware at path /todo
app.use('/userTodo',UserTodoRouter);

const db=mongoose.connection
