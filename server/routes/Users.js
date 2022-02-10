import express from 'express';
import AllUsers from '../models/UserModel.js';
import bcrypt from 'bcrypt';
const saltRounds=10;

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
    const email = req.body.email
    const password = req.body.password
    //res.status(200).send(user)

    AllUsers.findOne({ email })
        .then(user => {
            //if user not exist than return status 400
            if (!user) return res.status(400).json({ msg: "User not exist" })

            //if user exist than compare password
            //password comes from the user
            //user.password comes from the database
            bcrypt.compare(password, user.password, (err, data) => {
                //if error than throw error
                if (err) throw err

                //if both match than you can do anything
                if (data) {
                    return res.send(user);
                } else {
                    return res.status(401).json({ msg: "Invalid credencial" })
                }

            })
        })
});

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
    let user_password=req.body.password;
    
    const salt = await bcrypt.genSalt(10);
    user_password = await bcrypt.hash(req.body.password, salt);
    
   const newUser=new AllUsers({
    name:req.body.name,
    email:req.body.email,
    password:user_password,
    AllTodo:req.body.AllTodo
   })
   
   await AllUsers.findOne({email:req.body.email}).
   then(user=>{
       if(user)
       {
           res.status(400).json({message:"User already exists with given email ! "});
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
