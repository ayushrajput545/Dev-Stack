const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth= async(req,res,next)=>{

    try{

        const token = req.headers['authrization']; 


        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token missing'
            })
        }

        try{

            const decode = jwt.verify(token , process.env.JWT_SECRET);
            req.user = decode;

        }
        catch(err){
            console.log(err);
            return res.status(401).json({
                success:false,
                message:'Token Invalid'
            })

        }
        next();

    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            success:false,
            message:'Something went wrong in verifying the token'
        })

    }
}