import React from 'react'
import { LiaFreeCodeCamp } from "react-icons/lia";
import { MdDeleteForever } from "react-icons/md";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GridCard = ({theme , setCreateProject, projectData}) => {

  const[deletion , setDeletion] = useState(false);
  const[deleteId , setDeleteId] = useState();
  const navigate = useNavigate();

  const headers ={
    userid:localStorage.getItem("id"),
    authrization:localStorage.getItem("token")
  }

  async function deleteHandler(id){

    try{

     const response=  await axios.delete(`http://localhost:3000/api/v1/deleteProject/${id}` ,{headers});
    //  console.log(response);
      setDeletion(false);
      
    }
    catch(err){
      console.log(err);

    }
  }


  return (
    <> 
    {
     projectData &&
       projectData.map((items,i)=>{

        const formattedDate = new Date(items.createdAt).toLocaleString('en-US', {
          year: 'numeric', 
          month: 'long', 
          day: 'numeric', 
          hour: 'numeric', 
          minute: 'numeric', 
          hour12: true ,

      });

        return(
           <div onClick={()=>navigate('/editor' , {state: {items:items}} ) } className={`w-[270px] h-[200px] shadow-lg cursor-pointer hover:shadow-gray-600  rounded-lg hover:bg-[#202020] flex flex-wrap p-[10px] ${theme ? 'bg-gray-200 hover:bg-gray-300' :'bg-gradient-to-br from-[#10232c] to-[#0D0C0C] hover:bg-[#202020]'}`}>

        <div>
        <LiaFreeCodeCamp className='md:text-6xl text-5xl bg-teal-400 rounded-lg  p-[6px]'/>  
        </div>

        <div className='flex items-center justify-between gap-5'>

            <div className='flex flex-col gap-3'>
                <h2 className='font-semibold text-3xl'>{items.title}</h2>
                <p className='text-gray-500 text-sm'>{formattedDate}</p>

            </div>

            <div>
           <MdDeleteForever onClick={(e)=>{e.stopPropagation(); setDeletion(true); setDeleteId(items._id)}} className='text-4xl text-red-400 hover:cursor-pointer'/>
         </div>

        </div>
     </div>
        )

        

       })

    }

      <div className={`flex flex-col gap-2 items-center shadow-lg hover:shadow-gray-600 justify-center w-[270px] h-[200px] my-5 md:text-3xl text-xl font-bold p-[20px]   ${theme ? 'bg-gray-200 hover:bg-gray-300' :'bg-gradient-to-br from-[#10232c] to-[#0D0C0C] hover:bg-[#202020]'}`}>

      <h1 className={`${theme? 'text-gray-600':'text-white'}`}>Add Project</h1>
      <button onClick={()=>setCreateProject(true)} className='bg-teal-400 shadow-lg  cursor-pointer hover:shadow-gray-600 rounded-md w-12 text-3xl pb-2'>+</button>

      </div>


      {
      deletion &&
      <div className=' fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-screen flex items-center justify-center'>

      <div className='md:w-[400px] w-[300px]  h-[250px] border border-teal-400 bg-gradient-to-br from-[#1b3d4d] to-[#0D0C0C] rounded-lg p-[20px] py-[20px] flex flex-col justify-between'>
        
        <h1 className='text-3xl font-semibold'>Do you want to delete this project ?</h1>
        <div className='flex justify-between items-center'>
          <button onClick={()=>deleteHandler(deleteId)} className='bg-red-400 px-8 md:px-14 py-2 rounded text-xl '>Delete</button>
          <button onClick={()=>setDeletion(false)} className='bg-gray-800 px-8 md:px-14 py-2 rounded text-xl'>Cancel</button>
        </div>

      </div>

      </div>

        }       
   
 
</>
  )
}

export default GridCard