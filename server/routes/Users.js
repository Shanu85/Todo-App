import express from 'express';
import AllUsers from '../models/UserModel.js';

const router=express.Router();

// Getting all users
router.get('/list',async(req,res)=>{
    try{
        const all_users=await AllUsers.find();
        res.json(all_users);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
 });

 router.post('/getUser',async (req,res)=>{
  
    await AllUsers.findOne({email:req.body.email}).
   then(user=>{
       if(user)
       {
           if(user.password===req.body.password)
           {
                res.send(user);
           }
           else
           {
               res.status(401).send({message:"Incorrect Credentials"})
           }
       }
       else
       {
        res.status(400).json({message:"User not exists ! "});
       }
   })
})

 // Getting all TODO
router.get('/userTodoList/:id',getUser,async(req,res)=>{
    try{
        var user=res.SingleUser;
        res.json(user.AllTodo);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
 });
 
// Getting one User
router.get('/:id',getUser,(req,res)=>{
    res.send(res.SingleUser);
});

// Getting one Todo

router.get("/userTodo/:id/:todoId",getUser,async (req,res)=>{
    let todo;
    try{
        for(var i=0;i<res.SingleUser.AllTodo.length;i++)
        {
            if(res.SingleUser.AllTodo[i]._id==req.params.todoId)
            {
                todo=res.SingleUser.AllTodo[i];
                break;
            }
        }
        
        if(todo==null)
        {
            return res.status(404).json({message:"Cannot find!"})
        }
    }
    catch(err)
    {
        return res.status(404).json({message:err.message})
    }
    res.json(todo)
})

// Creating one User
router.post('/',async(req,res)=>{
   const newUser=new AllUsers({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    AllTodo:req.body.AllTodo
   })
   await AllUsers.findOne({email:req.body.email}).
   then(user=>{
       if(user)
       {
           res.status(400).json({message:"User already exists with given email ! "});
        //    console.log("User already exists! ")
       }
       else
       {
            // now we save our user
            try{
                newUser.save();
                res.status(201).json({message:"successful"});
            }
            catch(err)
            {
                res.status(400).json({message:err.message});
            }
       }
   })
});

// Creating new TODO

router.post('/userTodo/:id',getUser,async(req,res)=>{
    const newTodo={};
    if(req.body.name!=null)
    {
        newTodo["name"]=req.body.name;
    }
    if(req.body.date!=null)
    {
        newTodo["date"]=req.body.date;
    }

    try{
        var user=res.SingleUser;
        await user.AllTodo.push( newTodo);
       user.save()
       res.send({message:"Successful"})
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})

// updating one TODO
router.patch("/userTodo/:id/:todoId",(req,res)=>{
    let todoName;
    let todoDate;
    if(req.body.name!=null){
        todoName=req.body.name;
    }
    if(req.body.date!=null)
    {
        todoDate=req.body.date;
    }

    AllUsers.updateOne({_id:req.params.id,'AllTodo._id':req.params.todoId},
    {$set:{'AllTodo.$.name':todoName,'AllTodo.$.date':todoDate}},
    {new:true,safe:true,upsert:true})
    .then(res.status(202).json({message:"Successful"}))
    .catch((error)=>res.status(400).json({message:error.message}));
    
})

// deleting one user
router.delete('/:id',getUser,async(req,res)=>{
   try{
       await res.SingleUser.remove();
       res.json({message:"User deleted successfully"});
   }
   catch(err){
       res.status(500).json({message:err.message})
   }
});

// deleting one TODO
router.delete('/userTodo/:id/:todoId',async(req,res)=>{
    try{
        await AllUsers.findByIdAndUpdate(
            {_id:req.params.id},
            {$pull:{AllTodo:{_id:req.params.todoId}}},
            {safe:true,multi:false}
        )
        res.status(202).json({message:"Todo deleted Successfully! "})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
 });

// middlewire function to find Todo with id

async function getUser(req,res,next)
{
   let user;
   try{
       user=await AllUsers.findById(req.params.id)

       if(user==null)
       {
           return res.status(404).json({message:"Cannot find user!"});
       }
   }
   catch(err){
       return res.status(500).json({message:err.message});
   }
   res.SingleUser=user;
   next();
}
export default router;
