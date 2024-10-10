const Project = require('../models/Project');
const User = require('../models/User');
exports.projects = async(req,res)=>{
    try{
       
        const{userid} = req.headers;
        const{title} = req.body;
         
        if(!title){
            return res.status(401).json({
                success:false,
                message:"Please fill title"
            })

        }
       const savedProject=  await Project.create({title});


        const updateProjects = await User.findByIdAndUpdate(userid , {$push:{projects:savedProject._id}} , {new:true}).populate('projects').exec();


        return res.status(200).json({
            success:true,
            message:"Project Created",
            projects:updateProjects 
        })


    }
    catch(err){
        console.log(err);
        return res.status(502).json({
            success:false, 
            message:"Something went wrong while creating Project"
        })

    }
}

exports.getAllprojects = async(req,res)=>{  
    try{ 

        const {id} = req.headers; // works when we pass users id in header , make sure body is none
        
   

        const userData =await User.findById(id).populate({path:'projects' , options:{sort:{createdAt:-1}}});

        return res.status(200).json({
            success:true, 
            allProjects:userData  
        })



    }
    catch(err){

        console.log(err);
        return res.status(500).json({
            success:false, 
           message:'Something went wrong while getting tasks'
        })

    }
}

exports.deleteProject = async(req,res)=>{

    try{
        // const id = req.params.id;
        const {userid} = req.headers;

        const{id}= req.body

        const deleteProject = await Project.findByIdAndDelete(id);

        const updatedDetails = await User.findByIdAndUpdate(userid,{$pull:{projects:id}}, {new:true}).populate('projects').exec();
 
        return res.status(200).json({
            success:true, 
            updatedDetails:updatedDetails 
        })
    }

    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false, 
           message:'Something went wrong while deleting tasks'
        })
        
    }
}