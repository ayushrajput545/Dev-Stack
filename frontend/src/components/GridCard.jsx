import React from 'react'
import { FaCode } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const GridCard = () => {
  return (
    <div className='w-[270px] h-[200px] bg-[#141414] rounded-lg hover:bg-[#202020] flex flex-wrap p-[10px] '>

        <div>
        <FaCode className='md:text-6xl text-5xl bg-violet-500 rounded-lg  p-[6px]'/>  
        </div>

        <div className='flex items-center justify-between gap-5'>

            <div className='flex flex-col gap-3'>
                <h2 className='font-semibold text-3xl'>Project 1</h2>
                <p className='text-gray-500 text-sm'>Created at 9:00pm , Monday</p>

            </div>

            <MdDeleteForever className='text-4xl text-red-400 hover:cursor-pointer'/>

        </div>

    </div>
  )
}

export default GridCard