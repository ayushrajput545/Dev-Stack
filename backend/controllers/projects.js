const Project = require('../models/Project');
const User = require('../models/User');
exports.projects = async(req,res)=>{
    try{
       
        const{userid} = req.headers;
        const{title ,htmlCode , cssCode , jsCode} = req.body;
         
        if(!title || !htmlCode ||!cssCode || !jsCode ){
            return res.status(401).json({
                success:false,
                message:"Please fill title"
            })

        }
       const savedProject=  await Project.create({title,htmlCode,cssCode,jsCode});


        const updateProjects = await User.findByIdAndUpdate(userid , {$push:{projects:savedProject._id}} , {new:true}).populate('projects').exec();


        return res.status(200).json({
            success:true,
            message:"Project Created",
            userDetails:updateProjects 
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

        const {userid} = req.headers; // works when we pass users id in header , make sure body is none
        
   

        const userData =await User.findById(userid).populate({path:'projects' , options:{sort:{createdAt:-1}}});

        return res.status(200).json({
            success:true, 
            userDetails:userData  
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
        const {id} = req.params;
        const {userid} = req.headers;

        const deleteProject = await Project.findByIdAndDelete(id);

        const projectDetails= await User.findByIdAndUpdate(userid,{$pull:{projects:deleteProject._id}}, {new:true});
 
        return res.status(200).json({
            success:true, 
            message:"Task Deleted",
            projectDetails
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

//updtae code in project using project id
exports.updateCode = async(req,res)=>{

    try{

        const{id} = req.params;
        const{htmlCode , cssCode, jsCode}= req.body;

        const updatedCode = await Project.findByIdAndUpdate(id , {htmlCode , cssCode , jsCode} , {new:true});

        if (!updatedCode) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }

        return res.status(200).json({
            success:true,
            message:'Code Updated Successfully',
            updatedCode
        })


    }
    catch(err){
        console.log(err);
        return res.status(501).json({
            sucess:false,
            message:"Something went worng while updating code"
        })
    }
}