import axios from 'axios';
import React, { useState } from 'react'
import { FaCode } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import useCode from './useCode';

const ListCard = ({projectData ,theme,setCreateProject}) => {

  const[deletion , setDeletion] = useState(false);
  const[deleteId , setDeleteId] = useState();
  const navigate = useNavigate();
  const { htmlCode,  cssCode,  jsCode } = useCode();  //custom hook
 

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
      
      
      
    return (
      <> 
      <div  onClick={()=>navigate('/editor' , {state: {items:items}})} className={` flex items-center justify-between w-full my-5 p-[20px] shadow-lg  hover:shadow-gray-600 rounded-lg  ${theme ? 'bg-gray-200 hover:bg-gray-300' :'bg-[#141414] hover:bg-[#202020]'}`}>


      <div className='flex gap-3 '>
        <FaCode className='md:text-6xl text-5xl bg-violet-500 rounded  p-[6px]'/>   
        <div className='flex flex-col gap-2'>
              <h2 className={`text-2xl font-semibold ${theme?'text-gray-600':'text-white'}`}>{items.title}</h2>
              <p className='text-gray-500 text-sm'>{formattedDate}</p>
        </div>   
      </div>

      <div>
        <MdDeleteForever onClick={(e)=>{e.stopPropagation(); setDeletion(true); setDeleteId(items._id)}} className='text-4xl text-red-400 hover:cursor-pointer'/>
      </div>
      
    </div>


    </>




      )
      
      })

    }

    <div className={`flex flex-col gap-2 shadow-lg  hover:shadow-gray-600 rounded-lg items-center justify-center w-full my-5 md:text-3xl text-xl font-bold p-[20px]   ${theme ? 'bg-gray-200 hover:bg-gray-300' :'bg-[#141414] hover:bg-[#202020]'}`}>

      <h1 className={`${theme? 'text-gray-600':'text-white'}`}>Add Project</h1>
      <button onClick={()=>setCreateProject(true)} className='bg-sky-400 rounded-md w-12 text-3xl pb-2'>+</button>

    </div>
        
    {
      deletion &&
      <div className=' fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-screen flex items-center justify-center'>

      <div className='w-[400px] h-[250px] bg-[#0e0d0d] rounded-lg p-[20px] py-[30px] flex flex-col justify-between'>
        
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

export default ListCard