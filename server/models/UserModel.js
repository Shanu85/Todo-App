import mongoose from 'mongoose';

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    AllTodo:[
        {name:{
            type:String,
            required:true
        },
        done:{
            type:Boolean,
            default:false
        },
        date:{
            type:String,
            default:Date.now().toString(),
        }}
    ],
    CompletedTodo:[
        {name:{
            type:String,
            required:true
        },
        done:{
            type:Boolean,
            default:true
        },
        date:{
            type:String,
            default:Date.now().toString(),
        }}
    ]
});



const UserSchemaModel=mongoose.model('User',UserSchema);

export default UserSchemaModel;