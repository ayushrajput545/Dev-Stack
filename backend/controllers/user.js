const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup= async(req,res)=>{

  try{
        const{username,name, email , password}= req.body;

        if(!username || !name || !email , !password){
            return res.status(402).json({
                success:false,
                message:"All fields required"
            })
        }

        const emailexist = await User.findOne({email:email});
        const usernameexist = await User.findOne({username:username});
        if(emailexist||usernameexist){
            return res.status(402).json({
                success:false,
                message:"User already exist! Please Login"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({username, name , email , password:hashedPassword});

        return res.status(200).json({
            success:true,
            message:"User created successfully" 
        })
  }

    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while signing up"
        })
    }  
}

exports.login=async(req,res)=>{
    try{
        const{username,password}= req.body;

        if(!username || !password){
            return res.status(400).json({
                success:false,
                message:"All feilds are required"
            })
        }

        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not exist! Please signup"
            })
        }

        if(await bcrypt.compare(password, user.password)){ 

            const payload ={
                email:user.email,
                id:user._id,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET , {expiresIn:"2h"});
            user.token = token
             
            return res.status(200).json({
                success:true,
                message:"Logged In",
                id:user._id,
                token:user.token                      
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"username or password is incorrect"
            })
        }

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while signing up"
        })      
    } 
}