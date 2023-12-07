const mongoose=require('mongoose');

const User=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
},
    {collection:'user-data'}
)


const model=mongoose.model('User',User);
module.exports=model;
