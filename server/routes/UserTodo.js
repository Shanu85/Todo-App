import express from 'express';
import AllUsers from '../models/UserModel.js';

const router=express.Router();


router.delete('/complete/:id/:todoId',async(req,res)=>{
    try{
        await AllUsers.findByIdAndUpdate(
            {_id:req.params.id},
            {$pull:{CompletedTodo:{_id:req.params.todoId}}},
            {safe:true,multi:false}
        )
        res.status(202).json({message:"Todo deleted Successfully"});
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
})

router.delete('/done/:id/:todoId',getUser,async(req,res)=>{
    
    try{
        let newTodo;
        
        for(var i=0;i<res.SingleUser.AllTodo.length;i++)
        {
            if(res.SingleUser.AllTodo[i]._id==req.params.todoId)
            {
                newTodo=res.SingleUser.AllTodo[i];
                break;
            }
        }
        
        await AllUsers.findByIdAndUpdate(
            {_id:req.params.id},
            {$pull:{AllTodo:{_id:req.params.todoId}}},
            {safe:true,multi:false}
        )
        if(newTodo!==null)
        {
            const compeletedTodo={
                "name":newTodo["name"],
                "done":true,
                "date":newTodo["date"]
            }
            await res.SingleUser.CompletedTodo.push(compeletedTodo);
            await res.SingleUser.save();
            res.status(202).json({message:"Successful"});
        }
        else
        {
            res.status(502).json({message:"Not fully Successful"});
        }
        
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
})

async function getUser(req,res,next){
    let user;
    try{
        user=await AllUsers.findById(req.params.id)

       if(user==null)
       {
           return res.status(404).json({message:"Cannot find user!"});
       }
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
    res.SingleUser=user;
    next();
}

export default router;