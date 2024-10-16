const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    title:{
        type:String
    },

    createdAt:{
        type:Date,
        default:Date.now
    },

    htmlCode:{
        type:String,
        required:true,
        // default:"<h1> Hello Ayush </h1>"
    },

    cssCode:{
        type:String,
        required:true,
        // default:"h1{color:red}"
    },

    jsCode:{
        type:String,
        required:true,
        // default:"Some comments Ayush"
    }
    

})
module.exports= mongoose.model('Project' , projectSchema);