const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true
    },

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    date:{
        type:Date,
        default:Date.now()
    },

    isBlocked:{
        type:Boolean,
        default:false
    },

    isAdmin:{
        type:Boolean,
        default:false
    },

    projects:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project'
        }      
    ]
})

module.exports= mongoose.model('User' , UserSchema);