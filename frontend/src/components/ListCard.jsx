import React from 'react'
import { FaCode } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ListCard = () => {
  return (
    <div>

        <div className='flex items-center justify-between w-full my-5 p-[20px]  bg-[#141414] hover:bg-[#202020]'>

         <div className='flex gap-3'>
            <FaCode className='md:text-6xl text-5xl bg-violet-500 rounded  p-[6px]'/>   
            <div className='flex flex-col gap-2'>
                 <h2 className='text-2xl font-semibold'>Project 1</h2>
                 <p className='text-gray-500 text-sm'>Created at 12 dec 2008</p>
            </div>   
         </div>

         <div>
           <MdDeleteForever className='text-4xl text-red-400 hover:cursor-pointer'/>
         </div>
          
      


        </div>
    </div>
  )
}

export default ListCard