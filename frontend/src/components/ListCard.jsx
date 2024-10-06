import React, { useState } from 'react'
import { FaCode } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ListCard = () => {

  const[deletion , setDeletion] = useState(false);

  return (
    <>

        <div className='flex items-center justify-between w-full my-5 p-[20px]  bg-[#141414] hover:bg-[#202020]'>

         <div className='flex gap-3'>
            <FaCode className='md:text-6xl text-5xl bg-violet-500 rounded  p-[6px]'/>   
            <div className='flex flex-col gap-2'>
                 <h2 className='text-2xl font-semibold'>Project 1</h2>
                 <p className='text-gray-500 text-sm'>Created at 12 dec 2008</p>
            </div>   
         </div>

         <div>
           <MdDeleteForever onClick={()=>setDeletion(true)} className='text-4xl text-red-400 hover:cursor-pointer'/>
         </div>
          
        </div>
 
        {/* Deletion div */}
       {
          deletion &&
         <div className=' fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-screen flex items-center justify-center'>

          <div className='w-[400px] h-[250px] bg-[#141414] rounded-lg p-[20px] py-[30px] flex flex-col justify-between'>
           
           <h1 className='text-3xl font-semibold'>Do you want to delete this project ?</h1>
           <div className='flex justify-between items-center'>
             <button className='bg-red-400 px-14 py-2 rounded text-xl '>Delete</button>
             <button onClick={()=>setDeletion(false)} className='bg-gray-800 px-14 py-2 rounded text-xl'>Cancel</button>
           </div>
       
          </div>

         </div>

        }
       
    </>
  )
}

export default ListCard